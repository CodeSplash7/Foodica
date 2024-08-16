"use client";

import { useCallback, useEffect, useState } from "react";
import InputField from "../RegisterForm/inputField";
import { Blog, Ingredient, blogTags } from "@/utils/allSides/blogsFunctions";
import { Picture } from "@/utils/allSides/usersFunctions";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { createBlog, deleteBlogPost } from "@/utils/serverside/blogsFunctions";
import { Session } from "next-auth";
import CustomInput, { useRender } from "../RegisterForm/CustomInput";
import ImageInput from "../RegisterForm/ImageInput";
import { deleteBucketImage } from "@/utils/serverside/userFunctions";
import { SubmitBlogButton, DeleteBlogButton } from "./SubmitBlogButton";
import { Roboto_Condensed } from "next/font/google";
import {
  blogPictureSchema,
  caloriesSchema,
  conclusionSchema,
  cookTimeSchema,
  descSchema,
  difficultySchema,
  directionsSchema,
  ingredientsSchema,
  mainTagSchema,
  prepTimeSchema,
  secondaryTagsSchema,
  servingsSchema,
  titleSchema
} from "./schemas";
import IngredientsField from "./IngredientsField";
import DirectionsField from "./DirectionsField";
import { LoadingDots, LoadingSpinner } from "../Icons";
import ConfirmDelete from "./ConfirmDelete";
import LoadingAnimation from "../LoadingAnimation";

const roboto_condesed = Roboto_Condensed({
  weight: "500",
  subsets: ["latin"]
});

export default function BlogForm({
  session,
  blog,
  forPurpose
}: {
  session: Session | null | "loading";
  blog: Blog | undefined | "loading";
  forPurpose: string | "loading";
}) {
  if (blog === "loading" || session === "loading" || forPurpose === "loading")
    return (
      <Form>
        <FormHeader toUpdate="loading" />
      </Form>
    );

  const author = session?.user?.name;
  if (!author)
    return <div>You can't create blogs unless so log in into an account!</div>;
  //* Input fields initialization
  const [titleField] = useState(
    () =>
      new InputField<string>({
        schema: titleSchema,
        type: "text",
        label: "Title",
        initialValue: blog ? blog.title : ""
      })
  );
  const [mainTagField] = useState(
    () =>
      new InputField<string>({
        schema: mainTagSchema,
        type: "select",
        options: blogTags,
        label: "Main Tag",
        initialValue: blog ? blog.mainTag : blogTags[0]
      })
  );
  const [secondaryTagsField] = useState(
    () =>
      new InputField<string[]>({
        initialValue: blog ? blog.secondaryTags : [],
        schema: secondaryTagsSchema,
        type: "keyword-list",
        options: blogTags,
        label: "Secondary Tags"
      })
  );

  const [descField] = useState(
    () =>
      new InputField<string>({
        schema: descSchema,
        type: "textarea",
        label: "Description",
        max: 1000,
        initialValue: blog ? blog.description : ""
      })
  );
  const [servingsField] = useState(
    () =>
      new InputField<number, number>({
        schema: servingsSchema,
        type: "number",
        step: 1,
        min: 1,
        label: "Servings",
        initialValue: blog ? blog.servings : 1
      })
  );
  const [ingredientsField] = useState(
    () =>
      new InputField<Ingredient[], Ingredient[]>({
        initialValue: blog ? blog.ingredients : [],
        schema: ingredientsSchema,
        type: "ingredient-list",
        label: "Ingredients"
      })
  );
  const [directionsField] = useState(
    () =>
      new InputField<string[], string[]>({
        initialValue: blog ? blog.directions : [],
        schema: directionsSchema,
        type: "directions-list",
        label: "Directions"
      })
  );
  const [conclusionField] = useState(
    () =>
      new InputField<string>({
        initialValue: blog ? blog.conclusion : "",
        schema: conclusionSchema,
        type: "textarea",
        label: "Conclusion",
        max: 1000
      })
  );
  const [blogPictureField] = useState(
    () =>
      new InputField<File, Picture>({
        schema: blogPictureSchema,
        type: "image",
        maxImageSize: 5000000,
        label: "Recipe picture"
      })
  );

  const [difficultyField] = useState(
    () =>
      new InputField<string>({
        schema: difficultySchema,
        type: "select",
        options: ["easy", "medium", "hard"],
        label: "Difficulty",
        initialValue: blog ? blog.mainTag : blogTags[0]
      })
  );

  const [cookTimeField] = useState(
    () =>
      new InputField<number>({
        initialValue: 1,
        schema: cookTimeSchema,
        type: "number",
        min: 1,
        step: 1,
        label: "Cooking Time(minutes)"
      })
  );

  const [prepTimeField] = useState(
    () =>
      new InputField<number>({
        initialValue: 1,
        schema: prepTimeSchema,
        type: "number",
        min: 1,
        step: 1,
        label: "Preparation Time(minutes)"
      })
  );

  const [caloriesField] = useState(
    () =>
      new InputField<number>({
        initialValue: 1,
        schema: caloriesSchema,
        type: "number",
        step: 1,
        min: 1,
        label: "Calories"
      })
  );

  const [allFields] = useState([
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
  ]);

  //* hooks initialization
  const rerender = useRender();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  //* state initialization
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBlogSent, setIsBlogSent] = useState<boolean>(false);
  const toUpdate = forPurpose === "update" && !!blog;
  const [postError, setPostError] = useState("");
  const [blogId, setBlogId] = useState<string>();
  const [blogDate, setBlogDate] = useState<string>(Date.now().toString());

  //* helper functions
  const isPostError = useCallback(() => {
    return !!allFields.find((f) => f.errorMessage);
  }, allFields);

  useEffect(() => {
    if (!isPostError()) setPostError("");
  });

  useEffect(() => {
    if (toUpdate) getBlogInfo();
  }, [session]);

  const getBlogInfo = useCallback(async () => {
    if (!blog) return;
    setBlogId(blog.id);
    setBlogDate(blog.creationDate);
    titleField.setInitialValue(blog.title);
    mainTagField.setInitialValue(blog.mainTag);
    secondaryTagsField.setInitialValue(blog.secondaryTags);
    descField.setInitialValue(blog.description);
    servingsField.setInitialValue(blog.servings);
    conclusionField.setInitialValue(blog.conclusion);
    blogPictureField.setInitialValue(blog.picture);
    ingredientsField.setInitialValue(blog.ingredients);
    directionsField.setInitialValue(blog.directions);
    difficultyField.setInitialValue(blog.difficulty);
    cookTimeField.setInitialValue(blog.cookTime);
    prepTimeField.setInitialValue(blog.prepTime);
    caloriesField.setInitialValue(blog.calories);
  }, [blog]);
  const stringifyFormInformation = (recipePicture: any) => {
    return JSON.stringify({
      picture: recipePicture,
      title: titleField.getCorrectValue(),
      author: session?.user?.name,
      mainTag: mainTagField.getCorrectValue(),
      secondaryTags: secondaryTagsField.getCorrectValue(),
      description: descField.getCorrectValue(),
      difficulty: difficultyField.getCorrectValue(),
      servings: servingsField.getCorrectValue(),
      prepTime: prepTimeField.getCorrectValue(),
      cookTime: cookTimeField.getCorrectValue(),
      calories: caloriesField.getCorrectValue(),
      ingredients: ingredientsField.getCorrectValue(),
      directions: directionsField.getCorrectValue(),
      conclusion: conclusionField.getCorrectValue(),
      creationDate: blogDate
    });
  };
  const getRecipePicture = async () => {
    if (!blogPictureField.modifiedValue) {
      return blogPictureField.initialValue;
    }
    const result = await uploadBlogImage();
    if (result instanceof Error) {
      blogPictureField.setErrorMessage(result.message);
      return null;
    }
    return result;
  };

  const handleDeletePost = async () => {
    if (blogId) deleteBlogPost(blogId);
    router.push("/blogs?page=1");
  };

  //* form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBlogSent) return;
    setIsBlogSent(true);
    setIsLoading(true);
    rerender();

    allFields.forEach((f) => f.validate());
    if (isPostError()) {
      setPostError("Solve the input problems first!");
      setIsBlogSent(false);
      setIsLoading(false);
      return;
    }
    const recipePicture = await getRecipePicture();
    if (!recipePicture) {
      setIsBlogSent(false);
      setIsLoading(false);
      return;
    }
    const stringJsonData = stringifyFormInformation(recipePicture);
    const newBlog = await createBlog(stringJsonData, {
      update: toUpdate,
      id: blogId,
      authorEmail: session?.user?.email
    });
    if ("error" in newBlog) {
      setPostError(newBlog.error);
      setIsBlogSent(false);
      setIsLoading(false);
      return;
    }
    const urlTitle = newBlog.title.toLowerCase().split(" ").join("-");

    await delay(1000);
    const blogDate = new Date(newBlog.creationDate);
    const href = `/blogs/${blogDate.getFullYear()}/${
      blogDate.getMonth() + 1
    }/${blogDate.getDate()}/${urlTitle}`;
    router.push(href);
  };

  return (
    <>
      <ConfirmDelete
        isModalOpen={isModalOpen}
        message={
          toUpdate
            ? "Do you really want to delete this post? This process cannot be undone"
            : "The post will be lost."
        }
        closeModal={() => setIsModalOpen(false)}
        handleDelete={handleDeletePost}
      />
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
        <FormState isLoading={isLoading} postError={postError} />
        <FormFooter
          handleSubmit={handleSubmit}
          toUpdate={toUpdate}
          handleDelete={() => setIsModalOpen(true)}
        />
      </Form>
    </>
  );

  async function uploadBlogImage() {
    if (blogPictureField.value && blogPictureField.initialValue) {
      deleteBucketImage(blogPictureField.initialValue.url);
    }
    if (blogPictureField.value) {
      try {
        const res = await edgestore.publicImages.upload({
          file: blogPictureField.value
        });
        return res;
      } catch (err) {
        if (err instanceof Error) return err;
      }
    }
    return null;
  }
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
  isLoading
}: {
  postError: string;
  isLoading: boolean;
}) {
  return (
    <>
      <div className={`self-start text-red-600`}>{postError}</div>
      {isLoading && <LoadingAnimation text="Creating Your Blog" />}
    </>
  );
}

function FormHeader({ toUpdate }: { toUpdate: boolean | "loading" }) {
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

function Form({ children }: { children: React.ReactNode }) {
  return (
    <form
      autoComplete="off"
      className={`w-full sm:w-2/3 h-fit items-start flex flex-col gap-[16px]`}
    >
      {children}
    </form>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
