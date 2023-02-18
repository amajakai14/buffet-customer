import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { photoId } = router.query;

  return (
    <>
      <Head>
        <title>Menu selection</title>
      </Head>
      <main className="mx-auto p-4">
        <div>Image Id {photoId}</div>
      </main>
    </>
  );
};

export default Home;
