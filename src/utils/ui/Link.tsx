import {
  Link as MuiLink,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  LinkProps as MuiLinkProps,
} from '@material-ui/core';
import NextLink from 'next/link';
import { forwardRef } from 'react';

/**
 * Link
 */
export const Link = forwardRef<HTMLAnchorElement, MuiLinkProps>(({ href, ...props }, ref) => {
  return (
    <NextLink passHref href={href as string}>
      <MuiLink ref={ref} href={href} {...props} />
    </NextLink>
  );
});

/**
 * Link Button
 */
export const LinkButton = forwardRef<HTMLButtonElement, MuiButtonProps>(
  ({ href, ...props }, ref) => {
    return (
      <NextLink passHref href={href as string}>
        <MuiButton ref={ref} href={href} {...props} />
      </NextLink>
    );
  },
);
