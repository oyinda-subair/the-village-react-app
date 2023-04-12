import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@redux/store';

import '@assets/styles/index.css';
import '@assets/styles/tailwind.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
