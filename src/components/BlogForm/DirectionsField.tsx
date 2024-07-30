import React, { useState } from "react";
import InputField from "../RegisterForm/inputField"; // Adjust import path as needed
import CustomInput, { useRender } from "../RegisterForm/CustomInput";
import { directionSchema } from "./schemas";
import { Inter } from "next/font/google";
import { Roboto_Condensed } from "next/font/google";
const inter = Inter({
  weight: ["600", "400"],
  subsets: ["latin"]
});
const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

const DirectionsField = ({
  inputField,
  formRerender = () => {}
}: {
  formRerender?: () => void;
  inputField: InputField<string[], string[]>;
}) => {
  const rerender = useRender(formRerender);
  let { setValue, label, errorMessage, getCorrectValue } = inputField;
  let value = getCorrectValue();

  const addDirection = () => {
    const newValue = "";
    setValue([...value, newValue]);
    rerender();
  };

  const removeDirection = (index: number) => {
    const newValues = [...value];
    newValues.splice(index, 1);
    setValue(newValues);
    rerender();
  };

  return (
    <>
      <label
        className="flex flex-wrap gap-x-8 items-center text-slate-700 text-18px font-bold"
        htmlFor={`${label.toLowerCase()}-input`}
      >
        {label}
        {errorMessage && (
          <span className="text-[14px] text-red-600">{errorMessage}</span>
        )}
      </label>
      <div className="w-full flex flex-col h-fit gap-[8px]">
        {value.map((direction, index) => {
          return (
            <div className="relative flex items-end gap-[8px]" key={index}>
              <div className={"absolute w-fit right-[103%] top-[30%]"}>
                {index + 1}.
              </div>
              <DirectionField
                direction={direction}
                rerender={rerender}
                setListValue={(value) => {
                  inputField.value[index] = value;
                  setValue(inputField.value);
                }}
              />
              <div
                onClick={() => removeDirection(index)}
                className={`mt-[8px] w-fit ${inter.className} rounded-sm px-[16px] py-[8px] text-white bg-gray-800 text-[14px]`}
              >
                Remove
              </div>
            </div>
          );
        })}
      </div>
      <div
        onClick={addDirection}
        className={`mt-[8px] self-start w-fit ${roboto_condensed.className} rounded-sm px-[16px] py-[8px] text-white bg-gray-800 text-[14px]`}
      >
        Add Direction
      </div>
    </>
  );
};

function DirectionField({
  direction,
  rerender,
  setListValue
}: {
  direction: string;
  rerender: () => void;
  setListValue: (value: string) => void;
}) {
  const [directionInput] = useState(
    new InputField<string>({
      initialValue: direction,
      schema: directionSchema,
      label: "Direction",
      type: "text",
      onSet: (newValue) => {
        rerender();
        direction = newValue;
        setListValue(direction);
      }
    })
  );
  return (
    <div className={`flex gap-[16px] `}>
      <CustomInput
        showError={false}
        showLabel={false}
        inputField={directionInput}
      />
    </div>
  );
}

export default DirectionsField;
