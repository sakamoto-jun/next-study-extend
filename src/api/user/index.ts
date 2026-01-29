import { User, UserApiRequest, UserApiResponse, UserResponse } from './types';
import { auth_options } from '../auth/signin';
import { getServerSession } from 'next-auth';

async function fetchUserList(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return data;
}

async function handler(req: UserApiRequest, res: UserApiResponse) {
  if (req.method !== 'GET') {
    res.status(400).json({ ok: false, message: 'Bad request' });
    return;
  }

  const session = await getServerSession(req, res, auth_options);

  if (!session) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }

  const user_list = await fetchUserList();
  res.status(201).json({ ok: true, list: user_list });
}

export { handler as userHandler };
