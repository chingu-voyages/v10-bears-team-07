import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { channels } from '../services/api';
import './chatPage.css';
import Messages from './messages.js';

function ChatPage({ user, routeParams }) {
  const id = routeParams.match.params.id;
  const room = id;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    channels.getMessages(id).then(data => {
      setMessages(data.messages);
    });
  }, [id]);

  const socket = io('http://localhost:8810');
  socket.on('connect', () => {
    socket.emit('join', { room });
  });

  socket.on('message', message => {
    console.log(message);
    setMessages(message);
  });

  function onSubmit() {
    const messg = {
      authorId: user.id,
      text: document.getElementById('chat_message').value
    };
    console.log(messg);
    channels.updateChannelMessages(id, messg).then(data => {
      console.log(data.channel);
      const message = data.channel.messages;
      socket.emit('message', { room, message });
    });
  }

  return (
    <div>
      <Messages messages={messages} />
      <div id="chat_form" className="row">
        <input className="form-control col-11" type="text" id="chat_message" />
        <button className="btn btn-primary col-1" onClick={onSubmit}>
          send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
