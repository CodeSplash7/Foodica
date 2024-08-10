"use client";
// hooks
import { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useEdgeStore } from "@/lib/edgestore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
// components
import ImageInput from "./ImageInput";
import SubmitAccountButton from "./SubmitAccountButton";
import CustomInput, { useRender } from "./CustomInput";
// functions
import { registerUser, getUserByEmail } from "@/utils/serverside/userFunctions";
import { deleteBucketImage } from "@/utils/serverside/userFunctions";
// types
import { Session } from "next-auth";
import { Picture } from "@/utils/allSides/usersFunctions";
// schemas
import {
  emailSchema,
  usernameSchema,
  passwordSchema,
  pictureSchema
} from "./schemas";
import InputField from "./inputField";

export default function RegisterForm({ session }: { session: Session | null }) {
  //* Input fields initialization
  const [usernameField] = useState(
    () =>
      new InputField<string>({
        schema: usernameSchema,
        type: "text",
        label: "Username"
      })
  );
  const [emailField] = useState(
    () =>
      new InputField<string>({
        schema: emailSchema,
        type: "email",
        label: "Email"
      })
  );
  const [passwordField] = useState(
    () =>
      new InputField<string>({
        schema: passwordSchema,
        type: "password",
        label: "Password"
      })
  );

  const [imageField] = useState(
    () =>
      new InputField<File, Picture>({
        schema: pictureSchema,
        type: "image",
        label: "Profile Photo"
      })
  );
  //* hooks initialization
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const searchParams = useSearchParams();
  const rerender = useRender();

  //* state initialization
  const toUpdate = searchParams.get("for") === "update" && !!session;
  const toRegister = !toUpdate;
  const [userId, setUserId] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  //* helper functions
  const isRegistrationError = useCallback(
    () =>
      usernameField.errorMessage ||
      emailField.errorMessage ||
      imageField.errorMessage ||
      (toUpdate ? false : passwordField.errorMessage),
    [usernameField, emailField, imageField, passwordField, toUpdate]
  );

  const getUserInfo = useCallback(async () => {
    if (session) {
      const user = await getUserByEmail(session?.user?.email);
      if (!user) return;
      usernameField.setInitialValue(user.profile.username);
      emailField.setInitialValue(user.account.email);
      imageField.setInitialValue(user.profile.profilePicture);
      setUserId(user.id);
    }
  }, [session]);
  const stringifyFormInformation = (profilePicture: any) => {
    return JSON.stringify({
      password: passwordField.value,
      username: usernameField.modifiedValue
        ? usernameField.value
        : usernameField.initialValue,
      email: emailField.modifiedValue
        ? emailField.value
        : emailField.initialValue,
      profilePicture
    });
  };
  const getPfp = async () => {
    if (!imageField.modifiedValue) {
      return imageField.initialValue;
    }
    const result = await uploadProfileImage();
    if (result instanceof Error) {
      imageField.setErrorMessage(result.message);
      return null;
    }
    return result;
  };

  useEffect(() => {
    if (toUpdate) getUserInfo();
  }, [session]);

  //* form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistrationError()) return;

    const profilePicture = await getPfp();
    const stringJsonData = stringifyFormInformation(profilePicture);
    const newUser = await registerUser(stringJsonData, {
      update: toUpdate,
      id: userId
    });
    if ("error" in newUser) return setRegistrationError(newUser.error);
    if (toRegister) {
      return signIn("credentials", {
        username: usernameField.value,
        email: emailField.value,
        password: passwordField.value
      });
    }
    if (emailField.modifiedValue) {
      return router.replace("/api/auth/signin");
    }
    setTimeout(() => {
      router.refresh();
    }, 0);
    router.push("/blogs?p=1");
  };

  return (
    <>
      <div className={`w-full text-center relative text-[30px]`}>
        {toUpdate ? "Change Account Information" : "Create Account"}
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={`w-full lg:w-1/3 sm:w-2/3 h-fit items-center flex flex-col gap-[16px]`}
      >
        <CustomInput inputField={usernameField} />
        <CustomInput inputField={emailField} />
        {toRegister && <CustomInput inputField={passwordField} />}
        <ImageInput inputField={imageField} />
        <div className={`self-start text-red-600`}>{registrationError}</div>
        <SubmitAccountButton toUpdate={toUpdate} />
      </form>
    </>
  );

  async function uploadProfileImage() {
    if (imageField.value && imageField.initialValue) {
      deleteBucketImage(imageField.initialValue.url);
    }
    if (imageField.value) {
      try {
        const res = await edgestore.publicImages.upload({
          file: imageField.value
        });
        return res;
      } catch (err) {
        if (err instanceof Error) return err;
      }
    }
    return null;
  }
}
