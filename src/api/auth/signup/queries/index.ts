import { neon } from '@neondatabase/serverless';
import argon2 from 'argon2';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function isUserExist(email: string) {
  const result = await sql`SELECT id FROM users WHERE email=${email}`;

  return result.length > 0;
}

export async function signupUser(name: string, password: string, email: string) {
  // argon2를 사용하여 해시 처리
  const password_hash = await argon2.hash(password);

  const [user] =
    await sql`INSERT INTO users (name, password_hash, email) VALUES (${name}, ${password_hash}, ${email}) RETURNING id`;

  return { is_success: !!user };
}
