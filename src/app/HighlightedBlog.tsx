import Link from "next/link";
import { StaticImageData } from "next/image";

type RecipeDifficulty = "easy" | "medium" | "hard";
type IngredientUnit =
  | "tsp"
  | "Tbsp"
  | "fl oz"
  | "c"
  | "pt"
  | "qt"
  | "gal"
  | "ml"
  | "L"
  | "oz"
  | "lb"
  | "g"
  | "kg"
  | "ea"
  | "dz"
  | "in"
  | "cm"
  // informal
  | "dash"
  | "smidgen"
  | "handful"
  | "sprig"
  | "bunch"
  | "clove"
  | "slice"
  | "pinch";

type Ingredient = {
  id: number;
  unit?: IngredientUnit;
  quantity: number;
  name: string;
  details?: string;
};

export type Blog = {
  id: number;
  image: StaticImageData;
  title: string;
  author: string;
  creationDate: string;
  tag: string;
  description: string;
  difficulty: RecipeDifficulty;
  servings: number;
  prepTime: number;
  cookTime: number;
  calories: number;
  ingredients: Ingredient[];
  directions: string[];
  conclusion: string;
  comments: [{ userId: number; message: string }];
};

type HighlightedBlogProps = {
  blog: Blog;
};

export default function HighlightedBlog({ blog }: HighlightedBlogProps) {
  return (
    <>
      <div className="w-full flex justify-end h-fit relative mt-[64px]">
        <OverlayImage />
        <BackgroundImage src={blog.image.src} />
        <BlogIntroduction blog={blog} />
      </div>
    </>
  );
}

function formatCreationDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function BlogIntroduction({ blog }: { blog: Blog }) {
  return (
    <div className="py-[96px] px-[24px] h-fit z-20 relative w-full md:w-1/2 flex flex-col items-center justify-center gap-[24px]">
      <Link
        href=""
        className="text-white md:text-[#9297A4] hover:text-[#aeb4be] transition duraiton-150 text-[16px] [font-family:'Roboto_Condensed',sans-serif]"
      >
        {blog.tag}
      </Link>
      <div className="border-t border-[#00000024] w-[48px]"></div>
      <Link
        href=""
        className="text-center text-white md:text-[#363940] hover:text-[#e3e3e3] md:hover:text-[#8b909c] transition duraiton-150 text-[40px] font-bold"
      >
        {blog.title}
      </Link>
      <div className="text-white md:text-[#9297a4] flex gap-[16px] items-center">
        <div>{formatCreationDate(blog.creationDate)}</div>
        <div className="border-2 border-[#d2d7d9] w-[2px] h-[2px] rounded-full"></div>
        <div>{blog.comments.length} comments</div>
      </div>
      <div
        style={{ letterSpacing: "2px" }}
        className="[font-family:'Roboto_Condensed',sans-serif] text-[#363940] hover:text-white md:text-white text-[14px] font-bold bg-white md:bg-[#363940] hover:bg-[#363940] md:hover:bg-[#818592] transition duraiton-150 px-[32px] py-[12px] rounded-sm"
      >
        READ MORE
      </div>
    </div>
  );
}

function BackgroundImage({ src }: { src: string }) {
  return (
    <div
      style={{
        backgroundImage: `url('${src}')`,
        objectFit: "contain"
      }}
      className="z-0 absolute w-full md:w-3/5 h-full inset-0 bg-cover bg-center"
    ></div>
  );
}

function OverlayImage() {
  return (
    <div className="z-10 absolute w-full h-full bg-black opacity-[.3] md:opacity-[1] md:bg-transparent md:[backgroundImage:linear-gradient(to_right,_transparent_20%,_#eff4f7_60%)]"></div>
  );
}
