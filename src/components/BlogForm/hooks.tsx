import { useCallback, useEffect, useState } from "react";
import InputField from "../RegisterForm/inputField";
import { Session } from "next-auth";
import { Blog, blogTags, Ingredient } from "@/utils/allSides/blogsFunctions";
import { createBlog, deleteBlogPost } from "@/utils/serverside/blogsFunctions";
import { useRouter } from "next/navigation";
import { Picture } from "@/utils/allSides/usersFunctions";
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
import { useEdgeStore } from "@/lib/edgestore";
import { deleteBucketImage } from "@/utils/serverside/userFunctions";
import { Form, FormHeader } from "./BlogForm";

type InputFields = {
  titleField: InputField<string, string>;
  mainTagField: InputField<string, string>;
  secondaryTagsField: InputField<string[], string[]>;
  descField: InputField<string, string>;
  servingsField: InputField<number, number>;
  ingredientsField: InputField<Ingredient[], Ingredient[]>;
  directionsField: InputField<string[], string[]>;
  conclusionField: InputField<string, string>;
  blogPictureField: InputField<File, Picture>;
  difficultyField: InputField<string, string | Picture>;
  cookTimeField: InputField<number, number>;
  prepTimeField: InputField<number, number>;
  caloriesField: InputField<number, number>;
};

export function useSubmitBlog(
  allFields: InputField<any, any>[],
  inputFields: InputFields,
  toUpdate: boolean,
  session: Session | null,
  author: string,
  blog?: Blog
) {
  const getRecipePicture = useRecipePicture(inputFields.blogPictureField);

  const { blogId, blogDate, postError, checkPostError } = useBlogState(
    allFields,
    toUpdate,
    session,
    blog
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBlogSent, setIsBlogSent] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  return {
    isLoading,
    serverError,
    postError,
    submitBlog: async () => {
      const stringifyForm = useStringifyForm(author, blogDate, inputFields);
      allFields.forEach((f) => f.validate());
      if (checkPostError()) return;
      if (isBlogSent) return;
      setIsBlogSent(true);
      setIsLoading(true);

      const recipePicture = await getRecipePicture();
      if (!recipePicture) {
        setIsBlogSent(false);
        setIsLoading(false);
        return;
      }
      const stringJsonData = stringifyForm(recipePicture);
      const newBlog = await createBlog(stringJsonData, {
        update: toUpdate,
        id: blogId,
        authorEmail: session?.user?.email
      });
      if ("error" in newBlog) {
        setServerError(newBlog.error);
        setIsBlogSent(false);
        setIsLoading(false);
        return;
      }
      await delay(1000);
      return newBlog;
    }
  };
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useNavigateToBlog() {
  const router = useRouter();

  return async (newBlog: Blog) => {
    const blogDate = new Date(newBlog.creationDate);

    const urlTitle = newBlog.title.toLowerCase().split(" ").join("-");
    const href = `/blogs/${blogDate.getFullYear()}/${
      blogDate.getMonth() + 1
    }/${blogDate.getDate()}/${urlTitle}`;
    await delay(1000);
    router.push(href);
  };
}

export function useFormFallback(
  session: Session | null | "loading",
  blog: Blog | undefined | "loading",
  actionType: string | "loading"
) {
  if (blog === "loading" || session === "loading" || actionType === "loading")
    return {
      res: null,
      fallback: (
        <Form>
          <FormHeader toUpdate="loading" />
        </Form>
      )
    };
  const author = session?.user?.name;
  if (!author)
    return {
      res: null,
      fallback: (
        <div>You can't create blogs unless so log in into an account!</div>
      )
    };
  return { res: author, fallback: null };
}

export function useTitleField(blog?: Blog) {
  return useState(
    () =>
      new InputField<string, string>({
        schema: titleSchema,
        type: "text",
        label: "Title",
        initialValue: blog ? blog.title : ""
      })
  )[0];
}

export function useTagsField(blog?: Blog) {
  return {
    mainTagField: useState(
      () =>
        new InputField<string, string>({
          schema: mainTagSchema,
          type: "select",
          options: blogTags,
          label: "Main Tag",
          initialValue: blog ? blog.mainTag : blogTags[0]
        })
    )[0],
    secondaryTagsField: useState(
      () =>
        new InputField<string[], string[]>({
          initialValue: blog ? blog.secondaryTags : [],
          schema: secondaryTagsSchema,
          type: "keyword-list",
          options: blogTags,
          label: "Secondary Tags"
        })
    )[0]
  };
}

export function useDescField(blog?: Blog) {
  return useState(
    () =>
      new InputField<string, string>({
        schema: descSchema,
        type: "textarea",
        label: "Description",
        max: 1000,
        initialValue: blog ? blog.description : ""
      })
  )[0];
}

export function useServingsField(blog?: Blog) {
  return useState(
    () =>
      new InputField<number, number>({
        schema: servingsSchema,
        type: "number",
        step: 1,
        min: 1,
        label: "Servings",
        initialValue: blog ? blog.servings : 1
      })
  )[0];
}

export function useIngredientsField(blog?: Blog) {
  return useState(
    () =>
      new InputField<Ingredient[], Ingredient[]>({
        initialValue: blog ? blog.ingredients : [],
        schema: ingredientsSchema,
        type: "ingredient-list",
        label: "Ingredients"
      })
  )[0];
}

export function useDirectionsField(blog?: Blog) {
  return useState(
    () =>
      new InputField<string[], string[]>({
        initialValue: blog ? blog.directions : [],
        schema: directionsSchema,
        type: "directions-list",
        label: "Directions"
      })
  )[0];
}
export function useConclusionField(blog?: Blog) {
  return useState(
    () =>
      new InputField<string, string>({
        initialValue: blog ? blog.conclusion : "",
        schema: conclusionSchema,
        type: "textarea",
        label: "Conclusion",
        max: 1000
      })
  )[0];
}
export function useBlogPictureField(blog?: Blog) {
  return useState(
    () =>
      new InputField<File, Picture>({
        schema: blogPictureSchema,
        type: "image",
        maxImageSize: 5000000,
        label: "Recipe picture",
        initialValue: blog ? blog.picture : undefined
      })
  )[0];
}
export function useDifficultyField(blog?: Blog) {
  return useState(
    () =>
      new InputField<string>({
        schema: difficultySchema,
        type: "select",
        options: ["easy", "medium", "hard"],
        label: "Difficulty",
        initialValue: blog ? blog.mainTag : blogTags[0]
      })
  )[0];
}
export function useCookTimeField(blog?: Blog) {
  return useState(
    () =>
      new InputField<number, number>({
        initialValue: blog ? blog.cookTime : 1,
        schema: cookTimeSchema,
        type: "number",
        min: 1,
        step: 1,
        label: "Cooking Time(minutes)"
      })
  )[0];
}
export function usePrepTimeField(blog?: Blog) {
  return useState(
    () =>
      new InputField<number, number>({
        initialValue: blog ? blog.prepTime : 1,
        schema: prepTimeSchema,
        type: "number",
        min: 1,
        step: 1,
        label: "Preparation Time(minutes)",
        onSet: () => console.log("FUCK")
      })
  )[0];
}

export function useCaloriesField(blog?: Blog) {
  return useState(
    () =>
      new InputField<number, number>({
        initialValue: blog ? blog.calories : 1,
        schema: caloriesSchema,
        type: "number",
        step: 1,
        min: 1,
        label: "Calories"
      })
  )[0];
}

export function useInputFields(blog: Blog | undefined) {
  const titleField = useTitleField(blog);
  const { mainTagField, secondaryTagsField } = useTagsField(blog);
  const descField = useDescField(blog);
  const servingsField = useServingsField(blog);
  const ingredientsField = useIngredientsField(blog);
  const directionsField = useDirectionsField(blog);
  const conclusionField = useConclusionField(blog);
  const blogPictureField = useBlogPictureField(blog);
  const difficultyField = useDifficultyField(blog);
  const cookTimeField = useCookTimeField(blog);
  const prepTimeField = usePrepTimeField(blog);
  const caloriesField = useCaloriesField(blog);

  const inputFields: InputFields = {
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
  };
  const allFields = useState(Object.values(inputFields))[0];

  return { inputFields, allFields };
}

export function useStringifyForm(
  author: string,
  blogDate: string,
  inputFields: InputFields
) {
  const {
    titleField,
    mainTagField,
    secondaryTagsField,
    descField,
    servingsField,
    ingredientsField,
    directionsField,
    conclusionField,
    difficultyField,
    cookTimeField,
    prepTimeField,
    caloriesField
  } = inputFields;
  return (recipePicture: {
    url: string;
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
  }) =>
    JSON.stringify({
      picture: recipePicture,
      title: titleField.getCorrectValue(),
      author,
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
}

export function useBlogState(
  allFields: InputField<any, any>[],
  toUpdate: boolean,
  session: Session | null,
  blog?: Blog
) {
  const [blogId, setBlogId] = useState<string>();
  const [blogDate, setBlogDate] = useState<string>(Date.now().toString());
  const [postError, setPostError] = useState("");

  useEffect(() => {
    if (!!blog && toUpdate) {
      setBlogId(blog.id);
      setBlogDate(blog.creationDate);
    }
  }, [session]);

  useEffect(() => {
    checkPostError();
  });

  function checkPostError() {
    if (!isPostError()) {
      setPostError("");
      return false;
    } else {
      setPostError("Solve the input problems first!");
      return true;
    }
  }

  const isPostError = useCallback(() => {
    return !!allFields.find((f) => f.errorMessage);
  }, allFields);

  return { blogId, blogDate, postError, checkPostError };
}

export function useRecipePicture(blogPictureField: InputField<File, Picture>) {
  const { edgestore } = useEdgeStore();

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
  return getRecipePicture;
}

export function useModalProps(blogId: string | undefined, toUpdate: boolean) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDeletePost = async () => {
    if (!!blogId) deleteBlogPost(blogId);
    router.push("/blogs?page=1");
  };

  const message = toUpdate
    ? "Do you really want to delete this post? This process cannot be undone"
    : "The post will be lost.";

  return {
    isOpen: isModalOpen,
    setIsOpen: setIsModalOpen,
    deletePost: handleDeletePost,
    message
  };
}
