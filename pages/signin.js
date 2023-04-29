import DotLoading from "@/components/loader/dotloader/dotloader";
import SignIn from "@/components/signin/signin";
import { useLoading } from "@/contexts/loadingContext";
import { getProviders, useSession } from "next-auth/react";

function SigninPage({ providers }) {
  const { loading } = useLoading();
  const { data: session } = useSession();

  if (session?.user) {
    if (window !== undefined) {
      window.location.replace("/");
    }
    return null;
  }

  return (
    <>
      {loading && <DotLoading />}
      <SignIn providers={providers} />
    </>
  );
}
export default SigninPage;

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
