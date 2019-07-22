var omit = require('lodash.omit');
var authController = require('./auth');
var UserModelMock = require('../models/user');

jest.mock('../models/user.js', () => {
  return { findOne: jest.fn() };
});

describe('login', () => {
  test('will 400 on missing credentials', async () => {
    var { req, res } = setup();
    req.body = {};

    await authController.login(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('returns an error message on incorrect email', async () => {
    var { req, res } = setup();
    req.body = { email: 'incorrect-email', password: 'does-not-matter' };
    UserModelMock.findOne.mockResolvedValueOnce(undefined);

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'invalid credentials' });
  });

  test('returns an error message on incorrect password', async () => {
    var { req, res } = setup();
    var fakeUser = getFakeUser();
    req.body = { email: fakeUser.email, password: 'incorrect-password' };
    UserModelMock.findOne.mockResolvedValueOnce(fakeUser);
    fakeUser.comparePassword = jest.fn(() => Promise.resolve(false));

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'invalid credentials' });
  });

  test('returns the user with an auth token on success', async () => {
    var { req, res } = setup();
    var fakeUser = getFakeUser();
    req.body = { email: fakeUser.email, password: fakeUser.password };
    UserModelMock.findOne.mockResolvedValueOnce(fakeUser);
    fakeUser.comparePassword = jest.fn(() => Promise.resolve(true));
    fakeUser.toObject = jest.fn(() => fakeUser);

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    var { user } = res.json.mock.calls[0][0];
    expect(user).toEqual({
      ...omit(fakeUser, 'password'),
      token: expect.any(String)
    });
  });
});

// Helpers **************************
function setup() {
  var res = {
    json: jest.fn(),
    send: jest.fn(),
    status: jest.fn(() => res)
  };

  return {
    req: {},
    res
  };
}

function getFakeUser() {
  return {
    id: 'user-id',
    email: 'user-email',
    username: 'user-username',
    password: 'user-password'
  };
}
