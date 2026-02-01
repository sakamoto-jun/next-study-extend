import { NoSsr } from '@/components/NoSsr';
import type { SuspenseProps } from 'react';
import { Suspense as ReactSuspense } from 'react';

interface Props extends SuspenseProps {}

const Suspense = ({ children, ...rest }: Props) => {
  return (
    <ReactSuspense {...rest}>
      <NoSsr>{children}</NoSsr>
    </ReactSuspense>
  );
};

export { Suspense };
