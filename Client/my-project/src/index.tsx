import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; 
import store from './Redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {PersistGate} from 'redux-persist/es/integration/react'
import {persistStore} from 'redux-persist'

const root = ReactDOM.createRoot(document.getElementById('root') as  HTMLElement) ;
let persistor=persistStore(store)
root.render(
  <GoogleOAuthProvider clientId='401399344804-3qug1afprmp6gja27805dkjdh9nsgk91.apps.googleusercontent.com'>
  <React.StrictMode>
    <Provider store={store} >
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);

