import React, { useState, useEffect } from 'react';
import { channels } from '../services/api';
// import axios from 'axios';

function Messages({ messages }) {
  // const [messages, setMessages] = useState([]);
  // const [connectedToChatServer, setConnexion] = useState(false);

  // useEffect(() => {
  //   channels.getMessages(id).then(data => {
  //     setMessages(data.messages);
  // axios.post('http://localhost:8810/chat', { id }).then(res => {
  //   console.log(res.data);
  //   setConnexion(res.data.connected);
  // });
  //   });
  // }, [id]);

  return (
    <div>
      <ul>
        {messages
          ? messages.map(message => (
              <li key={message._id}>
                <div className="row">
                  <p className="col-4">{message.authorId}</p>
                  <p className="col-8">{message.text}</p>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default Messages;
