import DotLoading from "@/components/loader/dotloader/dotloader";
import SignUp from "@/components/signup/signup";
import { useLoadingStore } from "@/zustand/loadingStore";

function SignUpPage() {
  const { isLoading } = useLoadingStore();

  return (
    <>
      {isLoading ? <DotLoading /> : null}
      <SignUp />
    </>
  );
}
export default SignUpPage;
