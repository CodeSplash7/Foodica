import {
  CaloriesIcon,
  CookTimeIcon,
  PrepTimeIcon,
  ServeIcon
} from "@/components/Icons";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { Skeleton } from "@mui/material";

type RecipeDetail = {
  icon: JSX.Element;
  detailName: string;
  detailValue: React.ReactNode;
  detailUnit: string;
};

export default function RecipeDetails({ blog }: { blog: Blog | "loading" }) {
  const isLoading = blog === "loading";
  const recipeDetails: RecipeDetail[][] = [
    [
      {
        icon: <ServeIcon w={24} />,
        detailName: "Servings",
        detailValue: isLoading ? "" : blog.servings,
        detailUnit: "servings"
      },
      {
        icon: <PrepTimeIcon w={24} />,
        detailName: "Prep time",
        detailValue: isLoading ? "" : blog.prepTime,
        detailUnit: "minutes"
      }
    ],
    [
      {
        icon: <CookTimeIcon w={32} h={24} />,
        detailName: "Cooking time",
        detailValue: isLoading ? "" : blog.cookTime,
        detailUnit: "minutes"
      },
      {
        icon: <CaloriesIcon w={24} />,
        detailName: "Calories",
        detailValue: isLoading ? "" : blog.calories,
        detailUnit: "kcal"
      }
    ]
  ];

  return (
    <div
      className={`flex sm:flex-row flex-col w-full border border-gray-400 border-dashed`}
    >
      {recipeDetails.map((detailsRow, index) => (
        <div
          key={index}
          className={`flex flex-row w-full 
                first:border-b first:sm:border-b-0 sm:first:border-r border-gray-400 border-dashed`}
        >
          {detailsRow.map((detail) => (
            <RecipeDetail detail={detail} isLoading={isLoading} />
          ))}
        </div>
      ))}
    </div>
  );
}

const RecipeDetail = ({
  detail: { detailName, detailUnit, detailValue, icon },
  isLoading
}: {
  detail: RecipeDetail;
  isLoading: boolean;
}) => {
  return (
    <div
      key={detailName}
      className={`flex flex-col items-center gap-[8px] py-[16px] w-full first:border-r border-gray-400 border-dashed`}
    >
      <div className={`flex justify-center`}>{icon}</div>
      <div className={`text-[14px] font-bold w-fit`}>{detailName}</div>
      <div className={`text-[14px]`}>
        {isLoading ? (
          <Skeleton variant="text" width={80} sx={{ fontSize: "14px" }} />
        ) : (
          <>
            <span className={`text-slate-900`}>{detailValue}</span>{" "}
            <span className={`text-slate-600`}>{detailUnit}</span>
          </>
        )}
      </div>
    </div>
  );
};
