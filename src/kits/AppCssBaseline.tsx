import { createStyles, makeStyles } from '@material-ui/core';
import { FC, Fragment } from 'react';

/**
 * App Styles
 *
 * @returns
 */
export const useAppStyles = makeStyles(() =>
  createStyles({
    '@global': {
      'html, body': {
        height: '100%',
      },
      '#__next': {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  })
);

/**
 * App Css Baseline
 */
export const AppCssBaseline: FC = () => {
  // Stylesheet
  useAppStyles();

  return <Fragment />;
};
