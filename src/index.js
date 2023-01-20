import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// Contexts Providers
import { AuthContextProvider } from './contexts/AuthContext';
import { AlagamentosContextProvider } from './contexts/AlagamentosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlagamentosContextProvider>
        <SnackbarProvider maxSnack={2}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </AlagamentosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
