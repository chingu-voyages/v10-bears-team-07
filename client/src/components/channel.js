import React, { useState, useEffect } from 'react';
import './channel.css';
import { FaPaperPlane } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import io from 'socket.io-client';
import { channels } from '../services/api';
import * as moment from 'moment';

function Channel({ routeParams, user, notify, setTitle }) {
  const id = routeParams.match.params.id;
  const title = routeParams.location.state.title;
  const room = id;
  const username = user.username;
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState(undefined);

  setTitle(title);
  useEffect(() => {
    channels.getMessages(id).then(data => {
      setMessages(data.messages);
    });
  }, [id]);

  const socket = io('http://localhost:3010');
  socket.on('connect', () => {
    socket.emit('join', { room, username });
  });
  socket.on('message', ({ author, message }) => {
    setMessages(message);
    setAuthor(author);
  });

  function onSubmit(e) {
    e.preventDefault();
    var messg = {
      authorId: user.id,
      text: document.getElementById('chat_message').value
    };
    channels.updateChannelMessages(id, messg).then(data => {
      const message = data.messages;
      socket.emit('message', { room, message });
      document.getElementById('chat_message').value = '';
    });
  }

  return (
    <div className="channelPage">
      <div>
        {/* <MessageBlock messages={messages} /> */}
        <MessageBlock messages={messages} />
      </div>
      <form className="controls" onSubmit={onSubmit}>
        <textarea className="inputArea" id="chat_message" type="text" />
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

function MessageBlock({ messages }) {
  var messageBatches = [];
  var batchStartIdx = 0;
  for (var i = 0; i < messages.length; i++) {
    if (!messages[i + 1] || messages[i].author !== messages[i + 1].author) {
      messageBatches.push({
        index: i,
        author: messages[batchStartIdx].author,
        formattedDate: moment(messages[batchStartIdx].date).fromNow(),
        messageBodies: messages
          .slice(batchStartIdx, i + 1)
          .map(message => message.body)
      });
      batchStartIdx = i + 1;
    }
  }

  return messageBatches.map(
    ({ index, author, formattedDate, messageBodies }) => (
      <div className="messageMedia" key={index}>
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
            <p key={messages.length + index + 1}>{body}</p>
          ))}
        </div>
      </div>
    )
  );
}
