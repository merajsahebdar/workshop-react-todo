import {ApolloProvider} from '@apollo/react-hooks';
import {ThemeProvider} from 'styled-components';
import {Todos} from '../features/Todo';
import apolloClient from './env/apolloClient';
import theme from './styles/theme';

/**
 * App
 *
 * @returns {React.ReactElement}
 */
function App(): React.ReactElement {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <header></header>
        <Todos />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
