import { fetchUserList } from '@/api/user/client';
import { Suspense } from '@/components/Suspense';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const userListQuery = queryOptions({
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
    <Suspense>
      <SuspenseTestMain />
    </Suspense>
  );
};

export { SuspenseTestMainWithSuspense as SuspenseTestMain };
