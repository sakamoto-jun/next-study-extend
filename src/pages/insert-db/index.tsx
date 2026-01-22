import { FormEvent, useState } from 'react';

type ApiSuccess = { ok: true };
type ApiError = { ok: false; message: string };
type ApiResponse = ApiSuccess | ApiError;

const InsertDbPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setDone(false);

    const form = e.currentTarget;
    const comment = (form.elements.namedItem('comment') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.ok ? 'Unknown error' : data.message);
      }

      setDone(true);
      form.reset();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>

      {done && <p>✅ 저장 완료</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </form>
  );
};

export default InsertDbPage;
