import { neon } from '@neondatabase/serverless';

interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
}

const sql = neon(`${process.env.DATABASE_URL}`);

export async function getUserByEmail(email: string): Promise<UserRow | null> {
  const rows =
    (await sql`SELECT id, name, email, password_hash FROM users WHERE email=${email} LIMIT 1`) as UserRow[];
  const user = rows.at(0);

  return user ?? null;
}
