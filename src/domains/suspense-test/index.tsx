import { fetchUserList } from '@/api/user/client';
import { Suspense } from '@/components/Suspense';
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const userListQuery = queryOptions({
  queryKey: ['user-list'],
  queryFn: () => fetchUserList(),
});

const SuspenseTestMain = () => {
  const { data } = useSuspenseQuery(userListQuery);

  return (
    <main>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
};

const SuspenseTestMainWithSuspense = () => {
  return (
    <Suspense
      fallback={<p>Loading...</p>}
      suspenseQueryKey={[userListQuery.queryKey]}
    >
      <SuspenseTestMain />
    </Suspense>
  );
};

export { SuspenseTestMainWithSuspense as SuspenseTestMain };
