import DotLoading from "@/components/loader/dotloader/dotloader";
import SignIn from "@/components/signin/signin";
import { useLoadingStore } from "@/zustand/loadingStore";
import { getProviders } from "next-auth/react";

function SigninPage({ providers }) {
  const { isLoading } = useLoadingStore();

  return (
    <>
      {isLoading && <DotLoading />}
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
