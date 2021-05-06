import { FC, Fragment } from 'react';

/**
 * Meta Component
 *
 * NOTO: This component only must use in `_document.tsx`.
 *
 * @returns
 */
export const MetaComponent: FC = () => {
  return (
    <Fragment>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="//fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
    </Fragment>
  );
};
