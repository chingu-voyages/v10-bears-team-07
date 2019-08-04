import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { init } from './services/api';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

init();

ReactDOM.render(<App />, document.getElementById('root'));
