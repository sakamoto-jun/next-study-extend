import { isUserExist, signupUser } from '@/api/auth/signup/queries';
import { SignupRequest, SignupResponse } from '@/api/auth/signup/types';

async function handler(req: SignupRequest, res: SignupResponse) {
  // 메소드 제한
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  // req.body 값 가져오기
  const { name, password, email } = req.body;

  // req.body 값 예외 처리
  const isValidString = (value: unknown): value is string => {
    return typeof value === 'string' && value.trim() !== '';
  };
  if (!isValidString(name) || !isValidString(password) || !isValidString(email)) {
    return res.status(400).json({ ok: false, message: 'Invalid input' });
  }

  // email 값으로 유저 존재 유무 확인
  const is_exist = await isUserExist(email);

  // 존재 할 경우, 에러 처리
  if (is_exist) {
    return res.status(400).json({ ok: false, message: 'User already exist' });
  }

  // 존재 하지 않을 경우, 회원 가입
  const { is_success } = await signupUser(name, password, email);

  // 성공 시, 성공 return
  if (is_success) {
    return res.status(201).json({ ok: true });
  }

  // 실패 시, 에러 return
  return res.status(500).json({ ok: false, message: 'Failed to signup' });
}

export { handler as signupHandler };
