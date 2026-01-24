import { SignupApiResponse, SignupInput } from '@/api/auth/signup/types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

const SignupMain = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { mutate } = useMutation(signupMutationOptions());

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !password || !email) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    mutate({ name, password, email });
  };

  return (
    <main>
      <section className="px-[16px] py-[24px]">
        <h1 className="mb-[24px] text-[24px] font-bold">회원가입</h1>
        <form className="flex flex-col gap-[12px]" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="이름"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Input
            type="text"
            name="email"
            placeholder="이메일"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Button type="submit">회원가입</Button>
        </form>
      </section>
    </main>
  );
};

export { SignupMain };

function signupMutationOptions(): UseMutationOptions<
  SignupApiResponse,
  Error,
  SignupInput
> {
  return {
    mutationFn: async (input) => {
      const body = JSON.stringify(input);
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.ok ? 'Unknown error' : data.message);
      }

      return data;
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
    },
    onError: (error) => {
      alert(error.message);
    },
  };
}
