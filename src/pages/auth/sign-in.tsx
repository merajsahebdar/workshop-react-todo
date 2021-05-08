import Head from 'next/head';
import Router from 'next/router';
import { Fragment } from 'react';
import { useIntl } from 'react-intl';

import { DASH_URL } from '../../constants';
import { SignIn } from '../../features/auth';
import { AppPage } from '../../interfaces';
import { isServerSide } from '../../utils';
import { getAccessToken } from '../../variables';

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
      <SignIn />
    </Fragment>
  );
};

/**
 * Get Initial Props
 *
 * @param context
 * @returns
 */
SignInPage.getInitialProps = async context => {
  const accessToken = isServerSide() ? context.serverAccessToken : getAccessToken();

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
