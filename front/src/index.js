import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './router/Login';
import Register from './router/Register';

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

 const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
}); 

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }

])

root.render(
  <StrictMode>
    <ColorModeScript />
    <ApolloProvider client={client}>
    <RouterProvider router={router}/>
    </ApolloProvider>
  </StrictMode>
);