import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { CssBaseline } from '@material-ui/core';
import NextApp, { AppProps as NextAppProps } from 'next/app';
import { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

import { withApollo } from '../higher-orders';
import { AppCssBaseline } from '../kits';
import enUS from '../locales/enUS.json';
import { ThemeProvider } from '../providers';

// Dash App Props
type DashAppProps = NextAppProps & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

/**
 * Dash App
 */
export class DashApp extends NextApp<DashAppProps> {
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
      <Fragment>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <ApolloProvider client={apolloClient}>
          <IntlProvider key="en-US" locale="en-US" messages={enUS} textComponent={Fragment}>
            <ThemeProvider>
              <CssBaseline />
              <AppCssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </IntlProvider>
        </ApolloProvider>
      </Fragment>
    );
  }
}

// DEFAULT EXPORT
export default withApollo()(DashApp);
