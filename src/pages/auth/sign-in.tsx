import Head from 'next/head';
import Router from 'next/router';
import { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { DASH_URL } from '../../constants';
import { SignInComponent } from '../../features/auth';
import { AppPage } from '../../interfaces';
import { accessTokenVar } from '../../variables';

/**
 * Sign In
 */
const SignInPage: AppPage = () => {
  // I18n
  const { formatMessage } = useIntl();

  // Render
  return (
    <Fragment>
      <Head>
        <title>{formatMessage({ id: 'auth.signIn.page.title' })}</title>
      </Head>
      <SignInComponent />
    </Fragment>
  );
};

SignInPage.getInitialProps = async (context) => {
  const accessToken = typeof window === 'undefined' ? context.serverAccessToken : accessTokenVar();

  if (accessToken) {
    if (context.res) {
      context.res.writeHead(303, { Location: DASH_URL });
      context.res.end();
    } else {
      await Router.replace(DASH_URL);
    }

    return {
      isLoggedIn: true,
    };
  }

  return {
    isLoggedIn: false,
  };
};

// DEFAULT EXPORT
export default SignInPage;
