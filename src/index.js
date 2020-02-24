import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import Routes from './routes';

ReactDOM.render(
  <FirebaseContext.Provider value={ new Firebase() }>
    <Routes />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();