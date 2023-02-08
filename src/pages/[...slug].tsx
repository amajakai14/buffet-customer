import { GetServerSidePropsContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { api } from "../utils/api";

const Test = ({
  corporation_id,
  channel_id,
  logged_in,
}: {
  corporation_id: string;
  channel_id: string;
  logged_in: boolean;
}) => {
  if (!logged_in)
    return (
      <div>
        <button onClick={() => void signIn()}>Login</button>
      </div>
    );
  if (corporation_id === "" || channel_id === "") return <div>Not Found</div>;
  console.log(corporation_id, channel_id);
  const fetchData = api.menu.get.useQuery({ corporation_id, channel_id });
  console.log(fetchData.data);
  return <div>test</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const empty = {
    corporation_id: "",
    channel_id: "",
    logged_in: false,
  };
  if (!session) return { props: empty };
  const { slug } = context.query;
  if (!Array.isArray(slug) || slug.length !== 2)
    return { props: { ...empty, logged_in: true } };

  return {
    props: {
      corporation_id: slug[1],
      channel_id: slug[0],
      logged_in: true,
    },
  };
}

export default Test;
