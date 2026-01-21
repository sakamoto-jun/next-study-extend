import dayjs from 'dayjs';
import { GetStaticProps } from 'next';

interface Props {
  test: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log(`getStaticProps 실행`);

  return {
    props: {
      test: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
  };
};

const SsrPage = (props: Props) => {
  return (
    <main>
      {props.test}
      <p>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</p>
    </main>
  );
};

export default SsrPage;
