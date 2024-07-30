import RegisterForm from "@/components/RegisterForm/RegisterForm";

import { getServerSession } from "next-auth/next";

export default async function RegisterPage() {
  const session = await getServerSession();
  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <RegisterForm session={session} />
    </div>
  );
}
