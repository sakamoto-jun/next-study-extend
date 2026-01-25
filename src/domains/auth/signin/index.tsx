import Button from '@/components/Button';
import Input from '@/components/Input';
import { FormEvent, useState } from 'react';

const SigninMain = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !email) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // mutate({ name, password, email });
  };

  return (
    <main>
      <section className="px-[16px] py-[24px]">
        <h1 className="mb-[24px] text-[24px] font-bold">로그인</h1>
        <form className="flex flex-col gap-[12px]" onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            placeholder="이메일"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button type="submit">로그인</Button>
        </form>
      </section>
    </main>
  );
};

export { SigninMain };
