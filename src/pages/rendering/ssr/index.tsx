import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';

interface Props {
  test: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  console.log(`getServerSideProps 실행`);

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
