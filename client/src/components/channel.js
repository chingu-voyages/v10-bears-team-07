import React from 'react';

function Channel({ channel }) {
  return (
    <div>
      <h2>name: {channel.name}</h2>
      <p>_id: {channel._id}</p>
      <p>description: {channel.description}</p>
      <p>description: {channel.description}</p>
      <p>tags</p>
      <ul>
        {channel.tags.map(tag => (
          <li key={tag}>
            <p>{tag}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Channel;
