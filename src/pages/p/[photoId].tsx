import type { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { menus, TMenu } from "../../mock/menu";

const Home = ({ currentMenu }: { currentMenu: TMenu | undefined }) => {
  const router = useRouter();
  const { photoId } = router.query;
  console.log(currentMenu);

  return (
    <>
      <Head>
        <title>Menu selection</title>
      </Head>
      <main className="mx-auto p-4">
        <div>This page number {photoId}</div>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = (context) => {
  const photoId = context.params?.photoId;
  console.log("photoId", photoId);
  const currentMenu: TMenu | undefined = menus.find(
    (menu) => menu.id === Number(photoId)
  );
  console.log(photoId);
  return {
    props: {
      currentMenu,
    },
  };
};

export function getStaticPaths() {
  const results = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  const fullPaths = results.map((result) => {
    return { params: { photoId: String(result) } };
  });

  return {
    paths: fullPaths,
    fallback: false,
  };
}
