import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { useIntl } from 'react-intl';

import { withRequiredAuthentication } from '../higher-orders/withRequiredAuthentication';

/**
 * Home Page
 */
const HomePage: NextPage = () => {
  // I18n
  const { formatMessage } = useIntl();

  // Render
  return (
    <Fragment>
      <Head>
        <title>{formatMessage({ id: 'dash.index.page.title' })}</title>
      </Head>
    </Fragment>
  );
};

export default withRequiredAuthentication(HomePage);
