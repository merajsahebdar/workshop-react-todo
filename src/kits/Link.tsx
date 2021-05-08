import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Link as MuiLink,
  LinkProps as MuiLinkProps,
} from '@material-ui/core';
import NextLink from 'next/link';
import { forwardRef } from 'react';

/**
 * Link
 */
export const Link = forwardRef<HTMLAnchorElement, MuiLinkProps>(({ href, ...props }, reference) => {
  return (
    <NextLink passHref href={href as string}>
      <MuiLink ref={reference} href={href} {...props} />
    </NextLink>
  );
});

Link.displayName = 'Link';

/**
 * Link Button
 */
export const LinkButton = forwardRef<HTMLButtonElement, MuiButtonProps>(
  ({ href, ...props }, reference) => {
    return (
      <NextLink passHref href={href as string}>
        <MuiButton ref={reference} href={href} {...props} />
      </NextLink>
    );
  }
);

LinkButton.displayName = 'LinkButton';
