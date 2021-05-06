/// <reference types="next" />
/// <reference types="next/types/global" />

/// <reference types="@material-ui/lab/themeAugmentation" />
/// <reference types="next-images" />

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
