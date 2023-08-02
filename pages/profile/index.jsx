import LayoutProfile from "@/components/profile/layout";
import ProfileComponent from "@/components/profile/layout";
import { getSession } from "next-auth/react";

export default function ProfilePage({ user, tab }) {
  return (
    <div>
      <LayoutProfile session={user.user} tab={tab}>
        index
      </LayoutProfile>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  return {
    props: {
      user: session,
      tab,
    },
  };
}
