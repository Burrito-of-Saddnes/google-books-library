import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { RootStore } from './stores/RootStore';

import './CSS/index.css';
import App from './Components/App';

declare global {
  interface Window { rootState: any; }
}

const ROOT_STORE_INSTANCE = window.rootState = new RootStore()

ReactDOM.render(
  <Provider {...ROOT_STORE_INSTANCE}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
