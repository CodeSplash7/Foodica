"use client";

import { useCallback, useEffect, useState } from "react";
import InputField from "../RegisterForm/inputField";
import { Ingredient, blogTags } from "@/utils/allSides/blogsFunctions";
import { Picture } from "@/utils/allSides/usersFunctions";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { createBlog, deleteBlogPost } from "@/utils/serverside/blogsFunctions";
import { Session } from "next-auth";
import CustomInput, { useRender } from "../RegisterForm/CustomInput";
import ImageInput from "../RegisterForm/ProfileImageInput";
import { deleteBucketImage } from "@/utils/serverside/userFunctions";
import { SubmitBlogButton, DeleteBlogButton } from "./SubmitBlogButton";
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
import { findBlogFromHash } from "@/utils/serverside/blogIdHashing";
import { LoadingIcon } from "../Icons";

export default function BlogForm({
  session,
  hashId,
  forPurpose
}: {
  session: Session | null;
  hashId?: string;
  forPurpose: string;
}) {
  const author = session?.user?.name;
  if (!author)
    return <div>You can't create blogs unless so log in into an account!</div>;
  //* Input fields init@ialization
  const [titleField] = useState(
    () =>
      new InputField<string>({
        schema: titleSchema,
        type: "text",
        label: "Title"
      })
  );
  const [mainTagField] = useState(
    () =>
      new InputField<string>({
        schema: mainTagSchema,
        type: "select",
        options: blogTags,
        label: "Main Tag"
      })
  );
  const [secondaryTagsField] = useState(
    () =>
      new InputField<string[]>({
        initialValue: [],
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
        max: 1000
      })
  );
  const [servingsField] = useState(
    () =>
      new InputField<number>({
        schema: servingsSchema,
        initialValue: 1,
        type: "number",
        step: 1,
        label: "Servings"
      })
  );
  const [ingredientsField] = useState(
    () =>
      new InputField<Ingredient[], Ingredient[]>({
        initialValue: [],
        schema: ingredientsSchema,
        type: "ingredient-list",
        label: "Ingredients"
      })
  );
  const [directionsField] = useState(
    () =>
      new InputField<string[], string[]>({
        initialValue: [],
        schema: directionsSchema,
        type: "directions-list",
        label: "Directions"
      })
  );
  const [conclusionField] = useState(
    () =>
      new InputField<string>({
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
        label: "Difficulty"
      })
  );

  const [cookTimeField] = useState(
    () =>
      new InputField<number>({
        initialValue: 1,
        schema: cookTimeSchema,
        type: "number",
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBlogSent, setIsBlogSent] = useState<boolean>(false);
  const toUpdate = forPurpose === "update" && !!hashId;
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
    if (hashId) {
      const blog = await findBlogFromHash(hashId);
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
    }
  }, [hashId]);
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
    return result;
  };

  const handleDeletePost = async () => {
    if (blogId) deleteBlogPost(blogId);
    router.push("/blogs?p=1");
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
    if (recipePicture instanceof Error) {
      blogPictureField.setErrorMessage(recipePicture.message);
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

    const blogDate = new Date(newBlog.creationDate);
    const href = `/blogs/${blogDate.getFullYear()}/${
      blogDate.getMonth() + 1
    }/${blogDate.getDate()}/${urlTitle}`;
    router.push(href);
  };

  return (
    <>
      <div className={`w-full text-center relative text-[30px]`}>
        {toUpdate ? "Modify Blog" : "Create Blog"}
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={`w-full sm:w-2/3 h-fit items-start flex flex-col gap-[16px]`}
      >
        <div className={`w-full flex gap-[16px]`}>
          <div className="w-1/2">
            <CustomInput formRerender={rerender} inputField={titleField} />
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className={`w-full flex gap-[16px] items-end`}>
          <div className="w-1/2 h-fit">
            <CustomInput formRerender={rerender} inputField={mainTagField} />
          </div>
          <div className="w-1/2 h-fit">
            <CustomInput
              formRerender={rerender}
              inputField={secondaryTagsField}
            />
          </div>
        </div>
        <div className={`w-full flex gap-[16px]`}>
          <CustomInput formRerender={rerender} inputField={descField} />
        </div>
        <div className={`w-full flex gap-[16px]`}>
          <div className="w-1/2">
            <CustomInput formRerender={rerender} inputField={difficultyField} />
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className={`w-full flex gap-[16px] items-end`}>
          <div className="w-1/2 h-fit">
            <CustomInput formRerender={rerender} inputField={prepTimeField} />
          </div>
          <div className="w-1/2 h-fit">
            <CustomInput formRerender={rerender} inputField={cookTimeField} />
          </div>
        </div>
        <div className={`w-full flex gap-[16px]`}>
          <div className="w-1/2">
            <CustomInput formRerender={rerender} inputField={caloriesField} />
          </div>
          <div className="w-1/2">
            <CustomInput formRerender={rerender} inputField={servingsField} />
          </div>
        </div>
        <div className={`w-full flex gap-[16px]`}>
          <IngredientsField
            formRerender={rerender}
            inputField={ingredientsField}
          />
        </div>
        <div className={`w-full flex gap-[16px]`}>
          <DirectionsField
            formRerender={rerender}
            inputField={directionsField}
          />
        </div>
        <div className={`w-full flex gap-[16px]`}>
          <CustomInput formRerender={rerender} inputField={conclusionField} />
        </div>
        <ImageInput formRerender={rerender} inputField={blogPictureField} />
        <div className={`self-start text-red-600`}>{postError}</div>
        {isLoading && (
          <div className="flex text-black gap-[16px]">
            Creating Your Blog...
            <LoadingIcon w={24} />
          </div>
        )}
        <div className={`w-full flex justify-between`}>
          <SubmitBlogButton toUpdate={toUpdate} />
          <DeleteBlogButton toUpdate={toUpdate} deletePost={handleDeletePost} />
        </div>
      </form>
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
