import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; 
import store from './Redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root') as  HTMLElement) ;

root.render(
  <GoogleOAuthProvider clientId='401399344804-3qug1afprmp6gja27805dkjdh9nsgk91.apps.googleusercontent.com'>
  <React.StrictMode>
    <Provider store={store} >
    <App />
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);

