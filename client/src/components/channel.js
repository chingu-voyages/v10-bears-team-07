import React, { useState, useEffect } from 'react';
import './channel.css';
import { FaPaperPlane } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import io from 'socket.io-client';
import { channels } from '../services/api';
// A sample of messages
{
  /*const messages = [
  {
    author: 'username1',
    formattedDate: 'Yesterday - 1:00AM',
    body:
      'Message1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat lacus ut risus semper convallis. Vestibulum feugiat placerat sapien, in bibendum nunc valputate in. Aliquam erat volutpat.'
  },
  {
    author: 'username1',
    formattedDate: 'Date again',
    body: 'Message2 n+1th lorem ipsum...'
  },
  {
    author: 'username2',
    formattedDate: 'Yesterday - 1:00AM',
    body:
      'Message1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat lacus ut risus semper convallis. Vestibulum feugiat placerat sapien, in bibendum nunc valputate in. Aliquam erat volutpat.'
  },
  {
    author: 'username2',
    formattedDate: 'Date again',
    body: 'Message2 n+1th lorem ipsum...'
  },
  {
    author: 'username1',
    formattedDate: 'Date again',
    body: 'Message2 n+1th lorem ipsum...'
  }
]; */
}

function Channel({ routeParams, user }) {
  // const [message, setMessage] = useState('');
  const id = routeParams.match.params.id;
  const room = id;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    channels.getMessages(id).then(data => {
      setMessages(data.messages);
    });
  }, [id]);

  const socket = io('http://localhost:3010');
  socket.on('connect', () => {
    socket.emit('join', { room });
  });

  socket.on('message', message => {
    setMessages(message);
  });

  function onSubmit(e) {
    e.preventDefault();
    var messg = {
      authorId: user.id,
      text: document.getElementById('chat_message').value
    };
    channels.updateChannelMessages(id, messg).then(data => {
      const message = data.channel.messages;
      socket.emit('message', { room, message });
      document.getElementById('chat_message').value = '';
    });
  }

  return (
    <div className="channelPage">
      <div className="messages">
        {/* <MessageBlock messages={messages} /> */}
        <Messages messages={messages} />
      </div>
      <form className="controls" onSubmit={onSubmit}>
        <textarea
          className="inputArea"
          id="chat_message"
          // onChange={e => setMessage(e.target.value)}
          // value={message}
          type="text"
        />
        <button className="formButton">
          <IconContext.Provider value={{ color: 'white', size: '1.5em' }}>
            <div>
              <FaPaperPlane />
            </div>
          </IconContext.Provider>
        </button>
      </form>
    </div>
  );
}

export default Channel;

{
  /*function MessageBlock({ messages }) {
  var messageBatches = [];
  var batchStartIdx = 0;
  for (var i = 0; i < messages.length; i++) {
    if (!messages[i + 1] || messages[i].author !== messages[i + 1].author) {
      messageBatches.push({
        author: messages[batchStartIdx].author,
        formattedDate: messages[batchStartIdx].formattedDate,
        messageBodies: messages
          .slice(batchStartIdx, i + 1)
          .map(message => message.body)
      });
      batchStartIdx = i + 1;
    }
  }

  return messageBatches.map(({ author, formattedDate, messageBodies }) => (
    <div className="messageMedia">
      <div className="media-top">
        <img
          className="media-picture"
          src="https://via.placeholder.com/200"
          alt="user"
        />
        <h2 className="media-info">
          {author}
          <time>{formattedDate}</time>
        </h2>
      </div>

      <div className="media-body">
        {messageBodies.map(body => (
          <p>{body}</p>
        ))}
      </div>
    </div>
  ));
}*/
}

function Messages({ messages }) {
  return (
    <div>
      <ul>
        {messages
          ? messages.map(message => (
              <li key={message._id}>
                <div className="messages">
                  <p>{message.authorId}</p>
                  <p>{message.text}</p>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
