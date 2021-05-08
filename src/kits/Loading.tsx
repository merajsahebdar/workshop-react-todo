import {
  CircularProgress as MuiCircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import { FC, ReactNode, useMemo } from 'react';

// Loading Size
type LoadingSize = 'small' | 'medium' | 'large';

// Loading Props
type LoadingProps = {
  size?: LoadingSize;
  children?: ReactNode;
};

/**
 * Calculate Size
 *
 * @param {LoadingSize} size
 * @returns
 */
function calculateSize(size: LoadingSize) {
  switch (size) {
    case 'small':
      return 20;
    case 'medium':
      return 24;
    case 'large':
      return 28;
  }
}

/**
 * Circular Progress
 *
 * @returns
 */
const CircularProgress = withStyles(() =>
  createStyles({
    circle: {
      strokeLinecap: 'round',
    },
  })
)(MuiCircularProgress);

/**
 * Loading Styles
 *
 * @returns
 */
export const useLoadingStyles = makeStyles(theme => {
  const darkMode = theme.palette.type === 'dark';

  return createStyles({
    root: {
      width: 'auto',
    },
    iconWrap: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomIcon: {
      color: darkMode ? theme.palette.grey[700] : theme.palette.grey[200],
    },
    topIcon: {
      position: 'absolute',
      left: theme.spacing(0.5),
      color: darkMode ? theme.palette.primary.light : theme.palette.primary.dark,
    },
    textWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      margin: 0,
      color: darkMode ? theme.palette.grey[100] : theme.palette.grey[900],
      fontWeight: theme.typography.fontWeightBold,
    },
  });
});

/**
 * Loading
 *
 * @type {FC<LoadingProps>}
 */
export const Loading: FC<LoadingProps> = (
  { size = 'medium', children }: LoadingProps = { size: 'medium' }
) => {
  const sizeInPx = useMemo(() => calculateSize(size), [size]);

  const classes = useLoadingStyles();

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item className={classes.iconWrap}>
        <CircularProgress
          variant="determinate"
          className={classes.bottomIcon}
          size={sizeInPx}
          thickness={1}
          value={100}
        />
        <CircularProgress size={sizeInPx} thickness={4} className={classes.topIcon} />
      </Grid>
      {children && (
        <Grid item className={classes.textWrap}>
          <Typography variant="caption" className={classes.text}>
            {children}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
