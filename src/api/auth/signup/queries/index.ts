import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function isUserExist(email: string) {
  const result = await sql`SELECT id FROM user WHERE email=${email}`;

  return result.length > 0;
}

export async function signupUser(name: string, password: string, email: string) {
  const result =
    await sql`INSERT INTO users (name, password, email) VALUES (${name}, ${password}, ${email})`;

  return { is_success: result.length > 0 };
}
