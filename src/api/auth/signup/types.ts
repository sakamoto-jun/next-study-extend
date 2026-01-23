import { ErrorResponse } from '@/api/types';
import { NextApiRequest, NextApiResponse } from 'next';

interface SignupInput {
  name: string;
  password: string;
  email: string;
}

type SuccessResponse = { ok: true };

interface SignupRequest extends NextApiRequest {
  body: Partial<SignupInput>;
}

type SignupResponse = NextApiResponse<SuccessResponse | ErrorResponse>;

export type { SignupInput, SignupRequest, SignupResponse };
