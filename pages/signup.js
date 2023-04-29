import DotLoading from "@/components/loader/dotloader/dotloader";
import SignUp from "@/components/signup/signup";
import { useLoading } from "@/contexts/loadingContext";

function SignUpPage() {
  const { loading } = useLoading();

  return (
    <>
      {loading && <DotLoading />}
      <SignUp />
    </>
  );
}
export default SignUpPage;
