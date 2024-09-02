"use client";
// hooks
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
import { Picture, User } from "@/utils/allSides/usersFunctions";
// schemas
import {
  emailSchema,
  usernameSchema,
  passwordSchema,
  pictureSchema
} from "./schemas";
import InputField from "./inputField";
import { useCallback, useEffect, useState } from "react";

interface InputFields {
  usernameField: InputField<string, string | Picture>;
  emailField: InputField<string, string | Picture>;
  passwordField: InputField<string, string | Picture>;
  imageField: InputField<File, Picture>;
}

export default function RegisterForm({
  user,
  actionType
}: {
  user: User | null;
  actionType: string | undefined;
}) {
  const toUpdate = actionType === "update" && !!user;
  const toRegister = !toUpdate;
  //* Input fields initialization
  const usernameField = useUsernameInput(user);
  const emailField = useEmailInput(user);
  const passwordField = usePasswordInput();
  const imageField = useImageInput(user);
  const inputFields: InputFields = {
    usernameField,
    emailField,
    passwordField,
    imageField
  };

  const getImage = useGetPicture(imageField);

  //* hooks initialization
  const router = useRouter();
  const signinNewAccount = useSigninNewAccount(inputFields);

  //* state initialization
  const { isRegistrationError, registrationError, setRegistrationError } =
    useRegistrationError(inputFields, toUpdate);

  const stringifyForm = useStringifyForm(inputFields);

  //* form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistrationError()) return;

    const profilePicture = await getImage();
    const stringJsonData = stringifyForm(profilePicture);
    const newUser = await registerUser(stringJsonData, {
      update: toUpdate,
      id: user?.id
    });
    if ("error" in newUser) return setRegistrationError(newUser.error);
    if (toRegister) return await signinNewAccount();
    if (emailField.modifiedValue) return router.replace("/api/auth/signin");

    setTimeout(() => {
      router.refresh();
    }, 0);
    router.push("/blogs?page=1");
  };

  return (
    <>
      <div className={`w-full text-center relative text-[30px]`}>
        {toUpdate ? "Change Account Information" : "Create Account"}
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={`w-full lg:w-1/3 sm:w-2/3 h-fit items-start flex flex-col gap-[16px]`}
      >
        <CustomInput inputField={usernameField} />
        <CustomInput inputField={emailField} />
        {toRegister && <CustomInput inputField={passwordField} />}
        <ImageInput inputField={imageField} />
        <div className={`self-start text-red-600`}>{registrationError}</div>
        <SubmitAccountButton submitAccount={handleSubmit} toUpdate={toUpdate} />
      </form>
    </>
  );
}

function useUsernameInput(user: User | null) {
  return useState(
    () =>
      new InputField<string, string>({
        initialValue: user ? user.profile.username : "",
        schema: usernameSchema,
        type: "text",
        label: "Username"
      })
  )[0];
}

function useEmailInput(user: User | null) {
  return useState(
    () =>
      new InputField<string, string>({
        initialValue: user ? user.account.email : "",
        schema: emailSchema,
        type: "email",
        label: "Email"
      })
  )[0];
}

function usePasswordInput() {
  return useState(
    () =>
      new InputField<string, string>({
        schema: passwordSchema,
        type: "password",
        label: "Password"
      })
  )[0];
}

function useImageInput(user: User | null) {
  return useState(
    () =>
      new InputField<File, Picture>({
        initialValue: user ? user.profile.profilePicture : undefined,
        schema: pictureSchema,
        type: "image",
        label: "Profile Photo"
      })
  )[0];
}

function useGetPicture(imageField: InputField<File, Picture>) {
  const { edgestore } = useEdgeStore();

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

  return getPfp;
}

function useRegistrationError(inputFields: InputFields, toUpdate: boolean) {
  const { usernameField, emailField, imageField, passwordField } = inputFields;
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

  useEffect(() => {
    const error = isRegistrationError();
    if (error) {
      setRegistrationError(error);
    }
  }, [isRegistrationError]);

  return { isRegistrationError, registrationError, setRegistrationError };
}

function useStringifyForm(inputFields: InputFields) {
  const { passwordField, usernameField, emailField } = inputFields;
  const stringifyFormInformation = (
    profilePicture: null | {
      url: string;
      thumbnailUrl: string | null;
      size: number;
      uploadedAt: Date;
      metadata: Record<string, never>;
      path: Record<string, never>;
      pathOrder: string[];
    }
  ) => {
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
  return stringifyFormInformation;
}

function useSigninNewAccount(inputFields: InputFields) {
  const { usernameField, emailField, passwordField } = inputFields;
  return () =>
    signIn("credentials", {
      username: usernameField.value,
      email: emailField.value,
      password: passwordField.value
    });
}
