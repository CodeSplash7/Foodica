import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { getUserByEmail } from "@/utils/serverside/userFunctions";

import { getServerSession } from "next-auth/next";

export default async function RegisterPage({
  searchParams
}: {
  searchParams: { actionType: string };
}) {
  const session = await getServerSession();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <RegisterForm user={user} actionType={searchParams.actionType} />
    </div>
  );
}
