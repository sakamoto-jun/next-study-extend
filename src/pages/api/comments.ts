import { neon } from '@neondatabase/serverless';
import { NextApiRequest, NextApiResponse } from 'next';

const sql = neon(`${process.env.DATABASE_URL}`);

type SuccessResponse = { ok: true };
type ErrorResponse = { ok: false; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  try {
    const { comment } = req.body as { comment?: string };

    if (!comment || typeof comment !== 'string') {
      return res.status(400).json({ ok: false, message: 'comment is required' });
    }

    await sql`INSERT INTO comments (comment) VALUES (${comment})`;

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[comments API error]', error);
    return res.status(500).json({ ok: false, message: 'Failed to insert comment' });
  }
}
