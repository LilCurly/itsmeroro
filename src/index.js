import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistedStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistedStore}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);