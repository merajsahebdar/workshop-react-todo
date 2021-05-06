import { CssBaseline } from '@material-ui/core';
import { FC, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '../providers';
import { useAppStyles } from '../styles';
import enUS from '../locales/enUS.json';

/**
 * App Component
 *
 * @returns
 */
export const AppComponent: FC = ({ children }) => {
  // Stylesheet
  useAppStyles();

  // Render
  return (
    <IntlProvider key="en-US" locale="en-US" messages={enUS} textComponent={Fragment}>
      <ThemeProvider>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </IntlProvider>
  );
};
