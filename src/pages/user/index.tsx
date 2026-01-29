import { auth_options } from '@/api/auth/signin';
import { UserMain } from '@/domains/user';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, auth_options);

  /** 페이지 접속 컨트롤 */
  // if (!session) {
  //   return {
  //     // notFound: true,
  //     redirect: {
  //       destination: '/auth/signin',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};

const UserPage = () => {
  return <UserMain />;
};

export default UserPage;
