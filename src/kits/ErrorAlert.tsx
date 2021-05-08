import { ApolloError } from '@apollo/client';
import { Typography, TypographyProps } from '@material-ui/core';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import { forwardRef, memo } from 'react';
import { useIntl } from 'react-intl';

/**
 * Error Parser Hook
 *
 * @param {ApolloError|Error} error
 * @param {string} ns
 * @returns
 */
export function useErrorParser(error: ApolloError | Error) {
  // I18n
  const { formatMessage } = useIntl();

  if (error instanceof ApolloError) {
    if (error.networkError) {
      return formatMessage({
        id: 'app.networkError',
      });
    }

    if (error.graphQLErrors) {
      const messages: string[] = [];
      for (const graphQLError of error.graphQLErrors) {
        messages.push(graphQLError.message);
      }

      return messages;
    }
  }

  return error.message;
}

/**
 * Error Alert
 */
export const ErrorAlert = memo(
  forwardRef<HTMLDivElement, AlertProps & { error: ApolloError | Error }>(
    ({ error, ...otherProps }, reference) => {
      // I18n
      const messageOrMessages = useErrorParser(error);

      // Render
      const typographyProps: TypographyProps<'p'> = {
        variant: 'body2',
      };

      return (
        <Alert ref={reference} severity="error" {...otherProps}>
          {typeof messageOrMessages === 'string' ? (
            <Typography component="p" {...typographyProps}>
              {messageOrMessages}
            </Typography>
          ) : (
            messageOrMessages.map((message, indexMessage) => (
              <Typography key={indexMessage} component="p" {...typographyProps}>
                {message}
              </Typography>
            ))
          )}
        </Alert>
      );
    }
  )
);

ErrorAlert.displayName = 'ErrorAlert';
