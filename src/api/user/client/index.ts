import { User } from '@/api/user/types';

export async function fetchUserList(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!res.ok) throw new Error('FETCH_FAILED');

  const data = (await res.json()) as User[];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}
