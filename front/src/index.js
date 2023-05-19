import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import FunctionContextProvider from './context/functionContext';

 const client = new ApolloClient({
  uri: '/graphql',
  credentials: 'include',
  request: async (operation) => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      },
    });
  },
  cache: new InMemoryCache()
}); 

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <FunctionContextProvider>
            <App client={client}/>
          </FunctionContextProvider>
        </ApolloProvider>
      </ChakraProvider>
  </StrictMode>
);