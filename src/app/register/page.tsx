import Header from "@/components/Header/Header";

import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <Navbar />
      <Header showSearchBar={false} />
      <RegisterForm />
    </div>
  );
}
