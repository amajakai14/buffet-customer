import type { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { prisma } from "../../server/db";

const Slug = ({ menus }: { menus: Menu[] }) => {
  console.log("what we got here", menus);
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  return (
    <>
      <h1>Slug</h1>
      <p>Test Router</p>
    </>
  );
};
export default Slug;

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const corporationId = slug[0];
  const courseId = Number(slug[1]);
  if (isNaN(courseId)) throw new Error("Invalid course id");
  const menus = await prisma.menu.findMany({
    where: {
      corporation_id: corporationId,
      CourseOnMenu: {
        some: {
          course_id: courseId,
        },
      },
    },
  });

  return {
    props: {
      menus,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const channels = await prisma.channel.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      course_id: true,
      Desk: {
        select: {
          corporation_id: true,
        },
      },
    },
  });
  const params = channels.map((channel) => {
    const { course_id, id } = channel;
    const { corporation_id } = channel.Desk;
    return {
      params: {
        slug: [corporation_id, String(course_id), String(id)],
      },
    };
  });
  return {
    paths: params,
    fallback: "blocking",
  };
}
