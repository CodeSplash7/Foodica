import Header from "@/components/Header/Header";

import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

import { getServerSession } from "next-auth/next";

export default async function RegisterPage() {
  const session = await getServerSession();
  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <Navbar />
      <Header showSearchBar={false} />
      <RegisterForm session={session} />
    </div>
  );
}
