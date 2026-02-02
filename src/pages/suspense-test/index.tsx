import { SuspenseTestMain, userListQuery } from '@/domains/suspense-test';
import { queryClientConfig } from '@/lib/reactQuery';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof SuspenseTestMain> & {
  dehydratedState: DehydratedState;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const queryClient = new QueryClient(queryClientConfig);

  await queryClient.prefetchQuery(userListQuery);

  const dehydratedState: DehydratedState = dehydrate(queryClient);
  return {
    props: {
      dehydratedState,
    },
  };
};

const SuspenseTestPage = ({ dehydratedState }: Props) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <SuspenseTestMain />
    </HydrationBoundary>
  );
};

export default SuspenseTestPage;
