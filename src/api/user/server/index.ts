import { UserApiRequest, UserApiResponse } from '../types';
import { auth_options } from '../../auth/signin';
import { getServerSession } from 'next-auth';
import { fetchUserList } from '@/api/user/client';

async function handler(req: UserApiRequest, res: UserApiResponse) {
  if (req.method !== 'GET') {
    return res.status(400).json({ ok: false, message: 'Bad request' });
  }

  const session = await getServerSession(req, res, auth_options);
  if (!session) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }

  const user_list = await fetchUserList();
  res.status(200).json({ ok: true, list: user_list });
}

export { handler as userHandler };
