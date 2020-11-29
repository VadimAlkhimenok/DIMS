import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
