var authController = require('./auth');

describe('login', () => {
  test('will 400 on missing credentials', async () => {
    var req = {};
    var res = {
      send: jest.fn(),
      status: jest.fn(() => res)
    };
    req.body = {};

    await authController.login(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
