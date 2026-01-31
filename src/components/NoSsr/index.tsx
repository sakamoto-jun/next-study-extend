import dynamic from 'next/dynamic';
import { PropsWithChildren, ReactNode } from 'react';

const NoSsrWrapper = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export const NoSsr = dynamic(() => Promise.resolve(NoSsrWrapper), { ssr: false });
