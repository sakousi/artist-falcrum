import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import CurrentUserProvider from './CurrentUserContext';

 const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
}); 

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <CurrentUserProvider>
            <App client={client}/>
          </CurrentUserProvider>
        </ApolloProvider>
      </ChakraProvider>
  </StrictMode>
);