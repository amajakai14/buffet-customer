import { type NextPage } from "next";
import Head from "next/head";

import Mock from "./mock";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mock Restaurant App</title>
        <meta name="description" content="Done by Means" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Mock />
      </main>
    </>
  );
};

export default Home;
