import React, { useState } from 'react';

import './channel.css';

// A sample of messages
const messages = [
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
];

function Channel({ channel }) {
  const [message, setMessage] = useState('');

  return (
    <div className="channelPage">
      <div className="messages">
        <MessageBlock messages={messages} />
      </div>
      <form className="controls">
        <textarea
          className="inputArea"
          onChange={e => setMessage(e.target.value)}
          value={message}
          type="text"
        />
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
}
