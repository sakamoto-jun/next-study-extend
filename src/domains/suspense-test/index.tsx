import { fetchUserList } from '@/api/user/client';
import { Suspense } from '@/components/Suspense';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const userListQuery = queryOptions({
  queryKey: ['user-list'],
  queryFn: () => fetchUserList(),
});

const SuspenseTestMain = () => {
  const { data } = useQuery(userListQuery);

  console.log(data);

  return (
    <main>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
};

const SuspenseTestMainWithSuspense = () => {
  return (
    // <Suspense>
    <SuspenseTestMain />
    // </Suspense>
  );
};

export { SuspenseTestMainWithSuspense as SuspenseTestMain };
