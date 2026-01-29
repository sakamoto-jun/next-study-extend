import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from '../types';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserInput {}

interface SuccessResponse {
  ok: true;
  list: User[];
}

type UserResponse = SuccessResponse | ErrorResponse;

interface UserApiRequest extends NextApiRequest {
  body: Partial<UserInput>;
}

type UserApiResponse = NextApiResponse<UserResponse>;

export type { UserApiRequest, UserApiResponse };
export type { UserInput, UserResponse, SuccessResponse as UserSuccessResponse };
