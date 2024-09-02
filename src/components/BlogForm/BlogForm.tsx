"use client";

import { Blog } from "@/utils/allSides/blogsFunctions";
import { Session } from "next-auth";
import CustomInput, { useRender } from "../RegisterForm/CustomInput";
import ImageInput from "../RegisterForm/ImageInput";
import { SubmitBlogButton, DeleteBlogButton } from "./SubmitBlogButton";
import { Roboto_Condensed } from "next/font/google";
import IngredientsField from "./IngredientsField";
import DirectionsField from "./DirectionsField";
import { LoadingSpinner } from "../Icons";
import ConfirmDelete from "./ConfirmDelete";
import LoadingAnimation from "../LoadingAnimation";
import {
  useFormFallback,
  useInputFields,
  useModalProps,
  useNavigateToBlog,
  useSubmitBlog
} from "./hooks";

const roboto_condesed = Roboto_Condensed({
  weight: "500",
  subsets: ["latin"]
});

export default function BlogForm({
  session,
  blog,
  actionType
}: {
  session: Session | null | "loading";
  blog: Blog | undefined | "loading";
  actionType: string | "loading";
}) {
  const { res: author, fallback } = useFormFallback(session, blog, actionType);
  if (fallback || blog === "loading" || session === "loading") return fallback;

  const toUpdate = actionType === "update" && !!blog;

  //* Start hooks
  const rerender = useRender();
  const navigateToBlog = useNavigateToBlog();

  //* Create Input Fields
  const { inputFields, allFields } = useInputFields(blog);
  const {
    titleField,
    mainTagField,
    secondaryTagsField,
    descField,
    servingsField,
    ingredientsField,
    directionsField,
    conclusionField,
    blogPictureField,
    difficultyField,
    cookTimeField,
    prepTimeField,
    caloriesField
  } = inputFields;

  const modalProps = useModalProps(blog?.id, toUpdate);

  const { postError, isLoading, serverError, submitBlog } = useSubmitBlog(
    allFields,
    inputFields,
    toUpdate,
    session,
    author,
    blog
  );
  //* form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBlog = await submitBlog();
    if (!newBlog) return;

    navigateToBlog(newBlog);
  };

  return (
    <>
      <ConfirmDelete modalProps={modalProps} />
      <Form>
        <FormHeader toUpdate={toUpdate} />
        <FormRow>
          <FormRowItem>
            <CustomInput formRerender={rerender} inputField={titleField} />
          </FormRowItem>
          <FormRowItem></FormRowItem>
        </FormRow>
        <FormRow>
          <CustomInput formRerender={rerender} inputField={descField} />
        </FormRow>
        <FormRow>
          <FormRowItem>
            <IngredientsField
              formRerender={rerender}
              inputField={ingredientsField}
            />
          </FormRowItem>
        </FormRow>
        <FormRow>
          <FormRowItem>
            <DirectionsField
              formRerender={rerender}
              inputField={directionsField}
            />
          </FormRowItem>
        </FormRow>
        <FormRow>
          <FormRowItem>
            <CustomInput formRerender={rerender} inputField={mainTagField} />
          </FormRowItem>
          <FormRowItem>
            <CustomInput
              formRerender={rerender}
              inputField={secondaryTagsField}
            />
          </FormRowItem>
        </FormRow>

        <FormRow>
          <FormRowItem>
            <CustomInput formRerender={rerender} inputField={difficultyField} />
          </FormRowItem>
          <FormRowItem></FormRowItem>
        </FormRow>
        <FormRow>
          <FormRowItem>
            <CustomInput formRerender={rerender} inputField={prepTimeField} />
          </FormRowItem>
          <FormRowItem>
            <CustomInput formRerender={rerender} inputField={cookTimeField} />
          </FormRowItem>
        </FormRow>
        <FormRow>
          <FormRowItem>
            <CustomInput formRerender={rerender} inputField={caloriesField} />
          </FormRowItem>
          <FormRowItem>
            <CustomInput formRerender={rerender} inputField={servingsField} />
          </FormRowItem>
        </FormRow>

        <FormRow>
          <ImageInput formRerender={rerender} inputField={blogPictureField} />
        </FormRow>
        <FormRow>
          <CustomInput formRerender={rerender} inputField={conclusionField} />
        </FormRow>
        <FormState
          isLoading={isLoading}
          postError={postError}
          serverError={serverError}
        />
        <FormFooter
          handleSubmit={handleSubmit}
          toUpdate={toUpdate}
          handleDelete={() => modalProps.setIsOpen(true)}
        />
      </Form>
    </>
  );
}

function FormFooter({
  toUpdate,
  handleDelete,
  handleSubmit
}: {
  toUpdate: boolean;
  handleDelete: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}) {
  return (
    <div
      className={`w-full h-fit flex justify-between sm:flex-row flex-col-reverse items-center gap-[16px] sm:gap-0`}
    >
      <SubmitBlogButton toUpdate={toUpdate} submitPost={handleSubmit} />
      <DeleteBlogButton toUpdate={toUpdate} deletePost={handleDelete} />
    </div>
  );
}

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className={`w-full flex gap-[16px] items-end`}>{children}</div>;
}

function FormRowItem({ children }: { children?: React.ReactNode }) {
  return <div className="flex-1 h-fit">{children}</div>;
}

function FormState({
  postError,
  isLoading,
  serverError
}: {
  postError: string;
  isLoading: boolean;
  serverError: string;
}) {
  return (
    <>
      <div className={`self-start text-red-600`}>
        {postError || serverError}
      </div>
      {isLoading && <LoadingAnimation text="Creating Your Blog" />}
    </>
  );
}

export function FormHeader({ toUpdate }: { toUpdate: boolean | "loading" }) {
  return (
    <div className={`w-full relative text-[40px] ${roboto_condesed.className}`}>
      {toUpdate === "loading" ? (
        <>
          <LoadingSpinner />
        </>
      ) : toUpdate ? (
        "Modify Blog"
      ) : (
        "Create Blog"
      )}
    </div>
  );
}

export function Form({ children }: { children: React.ReactNode }) {
  return (
    <form
      autoComplete="off"
      className={`w-full sm:w-2/3 h-fit items-start flex flex-col gap-[16px]`}
    >
      {children}
    </form>
  );
}
