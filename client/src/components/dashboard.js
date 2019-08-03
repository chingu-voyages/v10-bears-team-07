import React from 'react'
import { withRouter } from 'react-router-dom'

function Dashboard({ onClick, history }) {
  return (
    <div>
      <button
        onClick={() => {
          window.localStorage.removeItem('token');
          onClick(null);
          history.push('/')
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default withRouter(Dashboard);
