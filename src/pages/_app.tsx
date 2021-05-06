import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import NextApp, { AppProps as NextAppProps } from 'next/app';
import { withApollo } from '../higher-orders';
import { AppComponent } from '../components';

// App Props
type AppProps = NextAppProps & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

/**
 * App
 */
export class App extends NextApp<AppProps> {
  /**
   * Component Did Mount
   */
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }

  /**
   * Render
   *
   * @returns
   */
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    // Render
    return (
      <ApolloProvider client={apolloClient}>
        <AppComponent>
          <Component {...pageProps} />
        </AppComponent>
      </ApolloProvider>
    );
  }
}

// DEFAULT EXPORT
export default withApollo()(App);
