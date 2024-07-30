import {
  Ingredient,
  IngredientUnit,
  ingredientUnits
} from "@/utils/allSides/blogsFunctions";
import InputField from "../RegisterForm/inputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Roboto_Condensed } from "next/font/google";
import {
  ingDetailsSchema,
  ingNameSchema,
  ingQuanitySchema,
  ingUnitSchema
} from "./schemas";
import CustomInput from "../RegisterForm/CustomInput";
import { useRender } from "../RegisterForm/CustomInput";

const inter = Inter({
  weight: ["600", "400"],
  subsets: ["latin"]
});

const roboto_condensed = Roboto_Condensed({
  weight: ["600"],
  subsets: ["latin"]
});

export default function IngredientsField({
  formRerender = () => {},
  inputField
}: {
  formRerender?: () => void;
  inputField: InputField<Ingredient[], Ingredient[]>;
}) {
  const rerender = useRender(formRerender);
  let { setValue, label, getCorrectValue, errorMessage } = inputField;
  let value = getCorrectValue();
  return (
    <>
      <label
        className={`${inter.className} flex flex-wrap gap-x-[8px] items-center text-slate-700 text-[18px] font-bold`}
        htmlFor={`${label.toLowerCase()}-input`}
      >
        {label}
        {errorMessage && (
          <span className="text-[14px] text-red-600">{errorMessage}</span>
        )}
      </label>
      <div className={`w-full h-fit `}>
        {value.map((ing, index) => (
          <div className={`relative flex items-end gap-[8px]`} key={index}>
            <div className={"absolute w-fit right-[103%] top-[45%]"}>
              {index + 1}.
            </div>
            <IngredientField
              setListValue={(value) => {
                const newListValue = inputField.getCorrectValue();
                newListValue[index] = value;
                setValue(newListValue);
                rerender();
              }}
              rerender={rerender}
              ing={ing}
              index={index}
            />
            <div
              onClick={() => removeIngredient(index)}
              className={`mt-[8px] w-fit ${inter.className} rounded-sm px-[16px] py-[8px] text-white bg-gray-800 text-[14px]`}
            >
              Remove
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={addIngredient}
        className={`mt-[8px] self-start w-fit ${roboto_condensed.className} rounded-sm px-[16px] py-[8px] text-white bg-gray-800 text-[14px]`}
      >
        Add Ingredient
      </div>
    </>
  );
  function addIngredient() {
    const unit = "whole";
    const quantity = 0;
    const name = "";
    const details = "";
    const newIngredient: Ingredient = { unit, quantity, name, details };
    setValue([...(inputField.value || inputField.initialValue), newIngredient]);
    rerender();
  }
  function removeIngredient(index: number) {
    const newValues = [...value];
    newValues.splice(index, 1);
    setValue(newValues);
    rerender();
  }
}

function IngredientField({
  ing,
  rerender,
  setListValue,
  index
}: {
  ing: Ingredient;
  index: number;
  rerender: () => void;
  setListValue: (value: Ingredient) => void;
}) {
  const [ingredientNameInput] = useState(
    new InputField<string, string>({
      initialValue: ing.name,
      type: "text",
      label: "Name",
      schema: ingNameSchema,
      onSet: (value) => {
        ing.name = value;
        setListValue(ing);
      }
    })
  );
  const [ingredientQuantityInput] = useState(
    new InputField<number>({
      initialValue: ing.quantity,
      type: "number",
      label: "Quanity",
      schema: ingQuanitySchema,
      onSet: (value) => {
        ing.quantity = value;
        setListValue(ing);
      }
    })
  );
  const [ingredientUnitInput] = useState(
    new InputField<string>({
      initialValue: ing.unit,
      type: "select",
      options: ingredientUnits,
      label: "Unit",
      schema: ingUnitSchema,
      onSet: (value) => {
        ing.unit = value as IngredientUnit;
        setListValue(ing);
      }
    })
  );
  const [ingredientDetailsInput] = useState(
    new InputField<string>({
      initialValue: ing.details,
      type: "text",
      label: "Details",
      schema: ingDetailsSchema,
      onSet: (value) => {
        ing.details = value;
        setListValue(ing);
      }
    })
  );
  const inputFields = [
    ingredientDetailsInput,
    ingredientNameInput,
    ingredientQuantityInput,
    ingredientUnitInput
  ];
  useEffect(() => {
    inputFields.forEach((f) => f.validate());
  }, [
    ingredientDetailsInput.value,
    ingredientNameInput.value,
    ingredientQuantityInput.value,
    ingredientUnitInput.value,
    index
  ]);
  return (
    <div className={`flex gap-[16px] `}>
      <CustomInput showError={false} mini inputField={ingredientNameInput} />
      <CustomInput
        showError={false}
        mini
        inputField={ingredientQuantityInput}
      />
      <CustomInput showError={false} mini inputField={ingredientUnitInput} />
      <CustomInput showError={false} mini inputField={ingredientDetailsInput} />
    </div>
  );
}

function generateRandomId() {
  return Math.floor(Math.random() * 1000000); // Generates a number between 0 and 999999
}
