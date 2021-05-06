import { createStyles, makeStyles } from '@material-ui/core';

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
  }),
);
