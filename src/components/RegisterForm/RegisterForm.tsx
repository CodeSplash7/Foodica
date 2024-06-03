"use client";
import Joi from "joi";
import { useEffect, useState } from "react";
import ProfileImageInput from "./ProfileImageInput";
import registerUser, { getUserByEmail } from "@/utils/serverside/userFunctions";
import SubmitAccountButton from "./SubmitAccountButton";
import CustomInput from "./CustomInput";
import { useEdgeStore } from "@/lib/edgestore";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ProfilePicture } from "@/utils/allSides/usersFunctions";
import { Session } from "next-auth";

const emailSchema = Joi.string()
  .email({ tlds: false })
  .required()
  .label("email");
const usernameSchema = Joi.string()
  .pattern(/^[a-zA-Z0-9 ]*$/)
  .max(30)
  .min(4)
  .required()
  .label("username");
const passwordSchema = Joi.string()
  .alphanum()
  .max(30)
  .min(4)
  .required()
  .label("password");

export default function RegisterForm() {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const { update, data: session, status } = useSession();
  const searchParams = useSearchParams();
  const toUpdate = searchParams.get("for") === "update";
  const [userId, setUserId] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState<File>();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pictureError, setPictureError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const [modifiedPicture, setModifiedPicture] = useState<boolean>(false);
  const [initialPicture, setInitialPicture] = useState<ProfilePicture>();
  const [initialEmail, setInitialEmail] = useState("");
  const [emailWarning, setEmailWarning] = useState("");

  useEffect(() => {
    async function getUserInfo() {
      if (status !== "authenticated") return;
      const user = await getUserByEmail(session?.user?.email);
      if (!user) return;
      setUsername(user?.profile.username);
      setInitialEmail(user?.account.email);
      setEmail(user?.account.email);
      const profilePicture = user?.profile.profilePicture;
      setUserId(user.id);

      if (!profilePicture) return;
      setInitialPicture(user.profile.profilePicture);
    }
    getUserInfo();
  }, [session, status]);

  useEffect(() => {
    const { error: usernameError } = usernameSchema.validate(username);
    if (!!usernameError) setUsernameError(usernameError.message);
    else setUsernameError("");
  }, [username]);

  useEffect(() => {
    const { error: emailError } = emailSchema.validate(email);
    if (!!emailError) setEmailError(emailError.message);
    else setEmailError("");
    if (email !== initialEmail) {
      setEmailWarning("You have to log in after email update!");
    } else {
      setEmailWarning("");
    }
  }, [email]);

  useEffect(() => {
    if (session) return;
    const { error: passwordError } = passwordSchema.validate(password);
    if (!!passwordError) setPasswordError(passwordError.message);
    else setPasswordError("");
  }, [password]);

  useEffect(() => {
    if (picture?.size && picture?.size > 500000) {
      setPictureError("The image is too big!");
    } else {
      setPictureError("");
    }
    if (picture) {
      setModifiedPicture(true);
    }
  }, [picture]);

  return (
    <>
      <div className={`w-full text-center relative text-[30px]`}>
        {toUpdate ? "Change Account Information" : "Create Account"}
        {toUpdate && status === "loading" && (
          <div className="absolute text-[14px]">Loading...</div>
        )}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (
            usernameError ||
            emailError ||
            pictureError ||
            (status === "authenticated" ? false : passwordError)
          ) {
            setRegistrationError("Solve the input problems first!");
            return;
          }
          let profilePicture;
          if (modifiedPicture) profilePicture = await uploadProfileImage();
          if (!modifiedPicture) profilePicture = initialPicture;
          const stringJsonData = JSON.stringify({
            password,
            username,
            email,
            profilePicture
          });
          const newUser = await registerUser(stringJsonData, {
            update: status === "authenticated" ? true : false,
            id: userId
          });
          if ("error" in newUser) {
            setRegistrationError(newUser.error);
            return;
          }
          //TODO see why is SOMETIMES error from changing the username

          if (emailWarning) return router.replace("/api/auth/signin");
          router.replace("/blogs?p=1");
        }}
        className={`w-full lg:w-1/3 sm:w-2/3 h-fit items-center flex flex-col gap-[16px]`}
      >
        <CustomInput
          type="text"
          label="Username"
          state={{ value: username, setValue: setUsername }}
          required={true}
          error={usernameError}
        />
        <CustomInput
          type="email"
          label="Email"
          state={{ value: email, setValue: setEmail }}
          required={true}
          error={emailError}
        />
        {!toUpdate && (
          <CustomInput
            type={"password"}
            label="Password"
            state={{
              value: password,
              setValue: setPassword
            }}
            required={true}
            error={passwordError}
          />
        )}
        {emailWarning && <div>{emailWarning}</div>}
        <ProfileImageInput
          error={pictureError}
          state={{ picture, setPicture }}
          initialPicture={initialPicture}
        />
        <div className={`self-start text-red-600`}>{registrationError}</div>
        <SubmitAccountButton toUpdate={toUpdate} />
      </form>
    </>
  );

  async function uploadProfileImage() {
    if (!modifiedPicture) return null;
    if (modifiedPicture && picture && initialPicture) {
      edgestore.publicImages.delete({
        url: initialPicture.url
      });
    }
    if (modifiedPicture && picture) {
      const res = await edgestore.publicImages.upload({
        file: picture,
        onProgressChange: (progress) => {
          // 3.log(progress);
        }
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      const result = { ...res, filename: picture.name, type: picture.type };
      return result;
    }
    return null;
  }
}

// {`
//   "id": 1,
//   "account": {
//     "email": "raresmarian701@gmail.com"
//   },
//   "profile": {
//     "username": "Rosca Rares",
//     "imageName": "guest-user.png",
//     "comments": [0, 0, 0, 0]
//   },
//   "blogs": [0, 0, 0, 0]
// }
