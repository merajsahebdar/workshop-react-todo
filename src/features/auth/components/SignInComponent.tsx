import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Logo, UserPlusIcon } from '../../../assets';
import { DASH_URL } from '../../../constants';
import { useSignInMutation } from '../../../graphqlCodes';
import { ErrorAlert, Link, LinkButton } from '../../../utils';
import { accessTokenVar } from '../../../variables';

/**
 * Sign In Styles
 */
const useSignInStyles = makeStyles(({ palette }) =>
  createStyles({
    logo: {
      display: 'block',
      verticalAlign: 'middle',
      width: 28,
      height: 28,
      color: palette.type === 'dark' ? palette.secondary.light : palette.primary.dark,
    },
  }),
);

/**
 * Sign In Component
 */
export const SignInComponent: FC = () => {
  const router = useRouter();

  // Logic
  const [signIn, { loading, error }] = useSignInMutation({
    onCompleted: async ({ signIn }) => {
      accessTokenVar(signIn);
      await router.replace(DASH_URL);
    },
  });

  const { values: input, ...formik } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email: address, password }) => {
      try {
        await signIn({
          variables: {
            input: {
              password,
              email: {
                address,
              },
            },
          },
        });
      } catch {
        // ...
      }
    },
  });

  const disabled = loading === true;

  // I18n
  const { formatMessage } = useIntl();

  // Stylesheet
  const classes = useSignInStyles();

  // Render
  return (
    <Fragment>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxWidth="xs">
          <Box marginY={4}>
            <form onSubmit={formik.handleSubmit} autoComplete="off" noValidate>
              <Card>
                <CardHeader
                  title={formatMessage({
                    id: 'auth.signIn.card.title',
                  })}
                  subheader={formatMessage({
                    id: 'auth.signIn.card.subtitle',
                  })}
                />
                {error && (
                  <CardContent>
                    <ErrorAlert error={error} />
                  </CardContent>
                )}
                <CardContent>
                  <Box marginBottom={2}>
                    <TextField
                      disabled={disabled}
                      type="email"
                      label={formatMessage({
                        id: 'auth.signIn.form.input.email',
                      })}
                      variant="filled"
                      fullWidth
                      size="small"
                      name="email"
                      value={input.email}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box>
                    <TextField
                      disabled={disabled}
                      type="password"
                      label={formatMessage({
                        id: 'auth.signIn.form.input.password',
                      })}
                      variant="filled"
                      fullWidth
                      size="small"
                      name="password"
                      value={input.password}
                      onChange={formik.handleChange}
                    />
                    <Link href="/auth/forgot/">
                      {formatMessage({
                        id: 'auth.signIn.form.forgotPassword',
                      })}
                    </Link>
                  </Box>
                </CardContent>
                <CardActions>
                  <LinkButton
                    href="/auth/register"
                    variant="outlined"
                    size="small"
                    startIcon={<UserPlusIcon />}
                  >
                    {formatMessage({
                      id: 'auth.signIn.form.createAccount',
                    })}
                  </LinkButton>
                  <Button
                    disabled={disabled || [input.email, input.password].includes('')}
                    type="submit"
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 'auto' }}
                  >
                    {loading
                      ? formatMessage({ id: 'app.loading' })
                      : formatMessage({ id: 'auth.signIn.form.submit' })}
                  </Button>
                </CardActions>
              </Card>
            </form>
            <Box
              marginY={2}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Logo className={classes.logo} />
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    <Link href="https://merajsahebdar.com">
                      <b>By Meraj Sahebdar</b>
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};
