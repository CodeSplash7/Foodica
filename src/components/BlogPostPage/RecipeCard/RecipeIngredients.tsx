"use client";
import {
  Blog,
  Ingredient as IngredientType
} from "@/utils/allSides/blogsFunctions";
import { Skeleton } from "@mui/material";
import { useState } from "react";

export default function RecipeIngredients({
  blog
}: {
  blog: Blog | "loading";
}) {
  const ingredients: IngredientType[] | "loading" =
    blog === "loading" ? "loading" : blog.ingredients;
  const { checkList, handleCheck } = useIngredientsCheck(ingredients);
  return (
    <div
      className={`w-full bg-[#fbf9e7] p-[32px] rounded-md flex flex-col gap-[16px] `}
    >
      <h1 className={`text-gray-900 font-bold text-[22px] w-full`}>
        Ingredients
      </h1>
      <div className={`flex flex-col w-full`}>
        {ingredients === "loading"
          ? Array(5)
              .fill(0)
              .map((_, index) => (
                <Ingredient
                  key={index}
                  isChecked={false}
                  handleClick={() => {}}
                  ingredientInfo="loading"
                />
              ))
          : ingredients.map((ingredient, index) => {
              return (
                <Ingredient
                  key={index}
                  isChecked={checkList[index]}
                  handleClick={() => handleCheck(index)}
                  ingredientInfo={ingredient}
                />
              );
            })}
      </div>
    </div>
  );
}

interface IngredientProps {
  isChecked: boolean;
  handleClick: () => void;
  ingredientInfo: IngredientType | "loading";
}
const Ingredient: React.FC<IngredientProps> = ({
  isChecked,
  handleClick,
  ingredientInfo
}) => {
  return (
    <div
      className={`border-t first:border-none text-slate-600 py-[16px] flex items-center gap-[16px] w-full`}
      onClick={handleClick}
    >
      <IngredientCheckButton checked={isChecked} />
      <IngredientText checked={isChecked} ingredientInfo={ingredientInfo} />
    </div>
  );
};

function IngredientCheckButton({ checked }: { checked: boolean }) {
  return (
    <div
      className={`border-2 overflow-hidden p-[1px] ${
        checked ? "border-[#9ad093]" : "border-gray-300"
      } rounded-full min-w-[16px] h-[16px]`}
    >
      <div
        className={`w-full h-full bg-[#9ad093] rounded-full ${
          checked ? "" : "hidden"
        }`}
      ></div>
    </div>
  );
}

interface IngredientTextProps {
  ingredientInfo: IngredientType | "loading";
  checked: boolean;
}
const IngredientText: React.FC<IngredientTextProps> = ({
  ingredientInfo,
  checked
}) => {
  if (ingredientInfo === "loading")
    return <Skeleton sx={{ width: "100%" }} variant="text" />;
  const { quantity, unit, name, details } = ingredientInfo;
  return (
    <div className={checked ? "line-through" : ""}>
      {decimalToFraction(quantity)} {unit}
      {quantity > 1 && unit && "s"} {unit && `of`} {name}
      {!unit && quantity > 1 && "s"}
      {details && `, ${details}`}
    </div>
  );
};

const decimalToFraction = (decimal: number) => {
  // Function to find the greatest common divisor (GCD) of two numbers
  const gcd: (a: number, b: number) => number = (a, b) =>
    b ? gcd(b, a % b) : a;

  // Convert decimal to fraction
  const denominator = 1000; // Set a large denominator for precision
  const numerator = decimal * denominator;
  const divisor = gcd(numerator, denominator);
  const numeratorFinal = numerator / divisor;
  const denominatorFinal = denominator / divisor;

  // Return the fraction as a string
  if (denominatorFinal === 1) {
    return `${numeratorFinal}`;
  } else {
    return `${numeratorFinal}/${denominatorFinal}`;
  }
};

function useIngredientsCheck(ingredients: IngredientType[] | "loading") {
  const [checkList, setCheckList] = useState<boolean[]>(
    ingredients === "loading" ? [] : ingredients.map(() => false)
  );
  function handleIngredientCheck(index: number) {
    const oldCheckList = [...checkList];
    oldCheckList[index] = !oldCheckList[index];
    setCheckList(oldCheckList);
  }
  return { checkList, handleCheck: handleIngredientCheck };
}
