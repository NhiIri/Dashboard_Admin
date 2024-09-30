import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; //Đo lường hiệu suất
import { Provider } from 'react-redux' //Cung cấp store redux 
import { persistor, store } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; //truy vấn
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
          {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GG_CLIENT_ID}> */}
            <App />
          {/* </GoogleOAuthProvider>           */}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
);

reportWebVitals();
