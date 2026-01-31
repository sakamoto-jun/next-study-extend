import Button from '@/components/Button';
import Input from '@/components/Input';
import { NoSsr } from '@/components/NoSsr';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';

const LazyLoadedcomponent = dynamic(
  () => import('./SomeComponent').then((module) => module.SomeComponent),
  { ssr: true, loading: () => <p>Loading...</p> },
);

const DynamicMain = () => {
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState('');

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const dayjs = (await import('dayjs')).default;
    const date = dayjs(e.target.value).format('YYYY-MM-DD HH:mm:ss');

    setValue(date);
  };

  return (
    <main className="p-10">
      <section className="mb-10">
        <h1 className="text-2xl mb-3">Default</h1>
        <p>Main Contents</p>
      </section>
      <section className="mb-10">
        <h1 className="text-2xl mb-3">Lazy Loaded Component</h1>
        <Button onClick={() => setVisible(!visible)}>토글</Button>
        {visible && <LazyLoadedcomponent />}
      </section>
      <section className="mb-10">
        <h1 className="text-2xl mb-3">Lazy Load Lib</h1>
        <Input type="date" onChange={handleChange} />
        <br />
        <p>FOMMATTED: {value}</p>
      </section>
      <section className="mb-10">
        <h1 className="text-2xl mb-3">No SSR</h1>
        <NoSsr>ABCDEF</NoSsr>
      </section>
    </main>
  );
};

export { DynamicMain };
