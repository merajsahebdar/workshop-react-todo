import { grey } from '@material-ui/core/colors';
import {
  createMuiTheme,
  darken,
  lighten,
  ThemeProvider as BaseThemeProvider,
} from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import createSpacing from '@material-ui/core/styles/createSpacing';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { Shape } from '@material-ui/core/styles/shape';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReactNode, useMemo } from 'react';

import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from '../assets';

// Theme Provider Props
type ThemeProviderProps = {
  children?: ReactNode;
};

/**
 * Theme Provider
 *
 * @returns
 */
export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  // Browser Theme Mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Theme
  const theme = useMemo(() => {
    // Palette
    const palette = createPalette({
      primary: {
        main: '#555B53',
      },
      secondary: {
        main: '#BDBBAD',
      },
      error: {
        main: '#FFC09F',
      },
      warning: {
        main: '#FFEE93',
      },
      success: {
        main: '#ADF7B6',
      },
      info: {
        main: '#79ADDC',
      },
      background: {
        default: prefersDarkMode ? grey[900] : grey[100],
        paper: prefersDarkMode ? grey[800] : '#FFFFFF',
      },
      type: prefersDarkMode ? 'dark' : 'light',
    });

    // Spacing
    const spacing = createSpacing(8);

    // Shape
    const shape: Shape = {
      borderRadius: 8,
    };

    // Typography
    const typography: TypographyOptions = {
      fontFamily: [
        '"Source Sans Pro"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Roboto"',
        '"Oxygen"',
        '"Ubuntu"',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif',
      ].join(', '),
      fontSize: 13,
      fontWeightLight: 400,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 600,
    };

    // Theme
    return createMuiTheme({
      palette,
      spacing,
      shape,
      props: {
        MuiAlert: {
          iconMapping: {
            error: <AlertCircleIcon />,
            info: <InfoIcon />,
            success: <CheckCircleIcon />,
            warning: <AlertTriangleIcon />,
          },
        },
        MuiButton: {
          color: prefersDarkMode ? 'secondary' : 'primary',
          disableElevation: true,
        },
        MuiFilledInput: {
          disableUnderline: true,
        },
        MuiLink: {
          color: prefersDarkMode ? 'secondary' : 'primary',
        },
        MuiTextField: {
          margin: 'dense',
          color: prefersDarkMode ? 'secondary' : 'primary',
        },
      },
      overrides: {
        MuiAppBar: {
          colorPrimary: {
            backgroundColor: prefersDarkMode ? palette.grey[900] : palette.grey[100],
            borderBottomColor: prefersDarkMode ? darken(palette.grey[900], 0.5) : palette.grey[200],
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
          },
        },
        MuiButton: {
          label: {
            textTransform: 'none',
          },
          containedPrimary: {
            backgroundColor: `${prefersDarkMode ? palette.primary.light : palette.primary.main}`,
          },
        },
        MuiCardActions: {
          root: {
            padding: spacing(2),
          },
        },
        MuiFilledInput: {
          root: {
            borderRadius: shape.borderRadius,
            backgroundColor: prefersDarkMode
              ? lighten(palette.grey[900], 0.125)
              : lighten(palette.grey[100], 0.75),
            borderColor: prefersDarkMode ? lighten(palette.grey[900], 0.0625) : palette.grey[200],
            borderWidth: 1,
            borderStyle: 'solid',
            '&$focused, &:hover': {
              backgroundColor: prefersDarkMode
                ? lighten(palette.grey[900], 0.125)
                : lighten(palette.grey[100], 0.75),
            },
            '&$disabled, &$disabled:hover': {
              backgroundColor: prefersDarkMode
                ? lighten(palette.grey[900], 0.25)
                : lighten(palette.grey[300], 0.5),
              borderColor: prefersDarkMode ? lighten(palette.grey[900], 0.125) : palette.grey[300],
            },
          },
        },
        MuiLink: {
          root: {
            display: 'inline-flex',
            alignItems: 'center',
            fontWeight: typography.fontWeightBold,
            '& > svg:last-child': {
              marginLeft: spacing(0.5),
              width: 16,
              height: 16,
            },
          },
        },
        MuiTypography: {
          paragraph: {
            marginBottom: spacing(1),
          },
        },
      },
      typography: {
        ...typography,
        h1: {
          fontWeight: typography.fontWeightBold,
        },
        h2: {
          fontWeight: typography.fontWeightBold,
        },
        h3: {
          fontWeight: typography.fontWeightBold,
        },
        h4: {
          fontWeight: typography.fontWeightBold,
        },
        h5: {
          fontWeight: typography.fontWeightBold,
        },
        h6: {
          fontWeight: typography.fontWeightBold,
        },
      },
    });
  }, [prefersDarkMode]);

  // Render
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;
}
