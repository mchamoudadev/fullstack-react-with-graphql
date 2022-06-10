import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from "react-router-dom";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import App from './App';
import { GlobalStyle } from './GlobalStyles';


const httpsLink = new HttpLink({
  uri: process.env.REACT_APP_HASURA_LINK,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET
  }
});

const client = new ApolloClient({
  link: httpsLink,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

