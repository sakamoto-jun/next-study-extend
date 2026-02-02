import { NoSsr } from '@/components/NoSsr';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import type { SuspenseProps } from 'react';
import { Fragment, Suspense as ReactSuspense } from 'react';

interface Props extends SuspenseProps {
  suspenseQueryKey?: QueryKey[];
}

const Suspense = ({ children, suspenseQueryKey, ...rest }: Props) => {
  const queryClient = useQueryClient();
  const notPrefetched = suspenseQueryKey?.some((key) => {
    const state = queryClient.getQueryState(key);
    return (state?.dataUpdatedAt ?? 0) === 0;
  });
  const Wrapper = notPrefetched ? NoSsr : Fragment;

  return (
    <ReactSuspense {...rest}>
      <Wrapper>{children}</Wrapper>
    </ReactSuspense>
  );
};

export { Suspense };
