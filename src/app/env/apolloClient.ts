import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';

// Initiate Link
const link = new HttpLink({
  uri: process.env.REACT_APP_API_URI,
});

// Initiate Apollo Client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// DEFAULT EXPORT
export default apolloClient;
