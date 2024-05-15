"use client";

import { setCheckList, checkIngredient } from "@/store/blogIngredientsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Blog, Ingredient } from "@/utils/allSides/blogsFunctions";
import { useEffect } from "react";

export default function RecipeIngredients({ blog }: { blog: Blog }) {
  const dispatch = useAppDispatch();
  const checkList = useAppSelector((state) => state.blogIngredients.checkList);
  useEffect(() => {
    dispatch(setCheckList(blog.ingredients.length));
  }, [dispatch, blog.ingredients.length]);
  if (checkList.length > 0)
    return (
      <div
        className={`bg-[#fbf9e7] p-[32px] rounded-md flex flex-col gap-[16px] `}
      >
        <h1 className={`text-gray-900 font-bold text-[22px]`}>Ingredients</h1>
        <div className={`flex flex-col`}>
          {checkList.map((checkedState, index) => {
            const ingredientInfo = blog.ingredients.at(index)!;
            return (
              <div
                key={index}
                className={`border-t first:border-none text-slate-600 py-[16px] flex items-center gap-[16px]`}
                onClick={() => {
                  dispatch(checkIngredient(index));
                }}
              >
                <IngredientCheckButton checked={checkedState} />
                <IngredientText
                  checked={checkedState}
                  ingredientInfo={ingredientInfo}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
}

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

function IngredientText({
  ingredientInfo,
  checked
}: {
  ingredientInfo: Ingredient;
  checked: boolean;
}) {
  const { quantity, unit, name, details } = ingredientInfo;
  return (
    <div className={checked ? "line-through" : ""}>
      {decimalToFraction(quantity)} {unit}
      {quantity > 1 && unit && "s"} {unit && `of`} {name}
      {!unit && quantity > 1 && "s"}
      {details && `, ${details}`}
    </div>
  );
}

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
