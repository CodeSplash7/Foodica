import { Button1 } from "@/utils/styled-buttons";
import { SignInResponse } from "next-auth/react";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

export default function SubmitAccountButton({
  toUpdate,
  submitAccount
}: {
  toUpdate: boolean;
  submitAccount: (e: React.FormEvent) => Promise<void | SignInResponse>;
}) {
  return (
    <Button1 onClick={submitAccount}>
      {toUpdate ? "Update Account Information" : "Create Account"}
    </Button1>
  );
}
