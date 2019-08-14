import React from 'react';
import io from 'socket.io-client';

function ChatPage({ user, routeParams }) {
  // const socket = io('http://localhost:8810');
  const socket = io('http://localhost:8810/channels');
  const id = routeParams.match.params.id;
  console.log(routeParams.match.params.id);
  const room = id;
  socket.on('connect', () => {
    socket.emit('join', { room });
  });

  socket.on('wellcome', message => {
    console.log(message);
  });

  socket.on('message', message => {
    const messagePlace = document.getElementById('messages');
    messagePlace.innerHTML = `<p style="background-color: blue; color: white;">${message}</p>`;
  });

  function sendMessage() {
    console.log('merci');
    const message = document.getElementById('chat_message').value;
    console.log('message est : ', message);
    socket.emit('message', { message, room });
  }

  return (
    <div>
      <h2>Bonjour {user.username}</h2>
      <div id="messages"></div>
      <input className="form-control" type="text" id="chat_message" />
      <button className="btn btn-primary" onClick={sendMessage}>
        send
      </button>
    </div>
  );
}

export default ChatPage;
