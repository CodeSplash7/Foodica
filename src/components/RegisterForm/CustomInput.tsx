import { useState } from "react";
import InputField from "./inputField";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["600", "400"],
  subsets: ["latin"]
});

export function useRender(callback?: () => void) {
  function rerender() {
    setRender((prev) => !prev);
    callback?.();
  }
  const [, setRender] = useState(false);
  return rerender;
}

export default function CustomInput({
  formRerender = () => {},
  inputField,
  mini,
  showError = true,
  showLabel = true
}: {
  formRerender?: () => void;
  inputField: InputField<any, any>;
  mini?: boolean;
  showError?: boolean;
  showLabel?: boolean;
}) {
  let { label, errorMessage, type, warningMessage, options } = inputField;
  const rerender = useRender(formRerender);
  const inputComponentProps = { rerender, inputField, showError };

  return (
    <div className="w-full h-fit relative">
      <label
        className={`
          ${inter.className} flex flex-wrap items-center 
          text-slate-700 
          ${
            mini
              ? "gap-x-[4px] text-[14px]"
              : "gap-x-[8px] text-[18px] font-bold"
          }
`}
        htmlFor={`${label.toLowerCase()}-input`}
      >
        {showLabel && label}
        {errorMessage && showError && (
          <span className="text-[14px] text-red-600">{errorMessage}</span>
        )}
      </label>
      {type === "keyword-list" && options ? (
        <KeywordInput {...inputComponentProps} />
      ) : type === "textarea" ? (
        <Textarea {...inputComponentProps} />
      ) : type === "number" ? (
        <NumberInput mini={mini} {...inputComponentProps} />
      ) : options ? (
        <SelectInput mini={mini} {...inputComponentProps} />
      ) : (
        <TextInput mini={mini} {...inputComponentProps} />
      )}
      {warningMessage && <div>{warningMessage}</div>}
    </div>
  );
}

function Textarea({
  inputField,
  onChange,
  rerender,
  showError
}: {
  inputField: InputField<string, string>;
  onChange?: () => void;
  rerender: () => void;
  showError: boolean;
}) {
  const { setValue, label, max, getCorrectValue, errorMessage, disabled } =
    inputField;
  let value = getCorrectValue();

  return (
    <>
      <div
        className={`absolute bottom-0 translate-y-[100%] right-[8px] text-slate-400`}
      >
        {value.length}/{max}
      </div>
      <textarea
        disabled={disabled}
        onChange={(e) => {
          onChange?.();
          setValue(e.target.value.slice(0, max));
          rerender();
        }}
        value={value}
        id={`${label.toLowerCase()}-input`}
        className={`
          w-full
          outline-none
          border
          border-1
          transition
          duration-150
          text-[18px]
          text-slate-800
          rounded-sm
          px-[8px]
          py-[8px]
          ${errorMessage && showError ? "border-red-600" : "border-slate-300"}
          focus-within:border-slate-800
          `}
        rows={3}
      />
    </>
  );
}

function NumberInput({
  rerender,
  inputField,
  mini
}: {
  inputField: InputField<number, number>;
  rerender: () => void;
  mini?: boolean;
}) {
  const { setValue, label, step, getCorrectValue, errorMessage, min } =
    inputField;
  let value = getCorrectValue();

  return (
    <input
      onChange={(e) => {
        const newValue = Number(e.target.value);
        if (min && newValue > min) setValue(newValue);
        rerender();
      }}
      step={step}
      value={value}
      id={`${label.toLowerCase()}-input`}
      className={`
          border border-1 ${
            errorMessage ? "border-red-600" : "border-slate-300"
          } focus-within:border-slate-800
          w-full outline-none 
          transition duration-150 
          text-slate-800 
          rounded-sm 
          px-[8px] py-[8px] 
          ${mini ? "h-[32px] text-[14px]" : "h-[48px] text-[18px]"}
`}
      type="number"
    />
  );
}

function SelectInput({
  inputField,
  rerender,
  mini
}: {
  inputField: InputField<string, string>;
  rerender: () => void;
  mini?: boolean;
}) {
  const {
    setValue,
    label,
    options,
    getCorrectValue,
    errorMessage,
    initialValue
  } = inputField;
  return (
    <select
      value={getCorrectValue()}
      onChange={(e) => {
        setValue(e.target.value);
        rerender();
      }}
      id={`${label.toLowerCase()}-input`}
      className={`
        w-full outline-none 
        border border-1  ${
          errorMessage ? "border-red-600" : "border-slate-300"
        } focus-within:border-slate-800
        transition duration-150 
        text-slate-800 
        rounded-sm 
        px-[8px] py-[8px] 
        ${mini ? "h-[32px] text-[14px]" : "h-[48px] text-[18px]"}
`}
    >
      {options?.map((option: string, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function TextInput({
  inputField,
  rerender,
  mini
}: {
  rerender: () => void;
  inputField: InputField<string, string>;
  mini?: boolean;
}) {
  const { setValue, label, getCorrectValue, errorMessage } = inputField;
  let value = getCorrectValue();
  return (
    <input
      autoComplete="off"
      onChange={(e) => {
        setValue(e.target.value);
        rerender();
      }}
      value={value}
      id={`${label.toLowerCase()}-input`}
      className={`
          w-full outline-none 
          border border-1  ${
            errorMessage ? "border-red-600" : "border-slate-300"
          } focus-within:border-slate-800 
          transition duration-150 
          text-slate-800 
          rounded-sm 
          px-[8px] py-[8px] 
          ${mini ? "h-[32px] text-[14px]" : "h-[48px] text-[18px]"}
`}
      type={"text"}
    />
  );
}

import { useEffect, useRef } from "react";

const KeywordInput = ({
  inputField,
  rerender
}: {
  inputField: InputField<string[], string[]>;
  rerender: () => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue) {
      const filteredSuggestions = inputField.options?.filter(
        (keyword) =>
          keyword.toLowerCase().startsWith(inputValue.toLowerCase()) &&
          !inputField.value?.includes(keyword)
      );
      if (!filteredSuggestions) return;
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, inputField.options]);

  const handleSuggestionClick = (keyword: string) => {
    inputField.setValue([...inputField.value, keyword]);
    setInputValue("");
    setSuggestions([]);
    if (inputRef.current) inputRef.current.focus();
    rerender();
  };

  const handleRemoveKeyword = (keyword: string) => {
    inputField.setValue(inputField.value?.filter((k) => k !== keyword));
    rerender();
  };
  return (
    <div className="relative w-full h-fit">
      <div
        className={`flex flex-wrap gap-2 items-center border border-1 transition duration-150  ${
          inputField.errorMessage ? "border-red-600" : "border-slate-300"
        } focus-within:border-slate-800 rounded-sm p-2`}
      >
        {Array.isArray(inputField.getCorrectValue()) &&
          inputField.getCorrectValue()?.map((keyword) => (
            <span
              key={keyword}
              className="bg-slate-200 text-slate-800 px-2 py-1 rounded-sm flex items-center gap-1"
            >
              {keyword}
              <div
                onClick={() => handleRemoveKeyword(keyword)}
                className="text-red-600"
              >
                x
              </div>
            </span>
          ))}
        <input
          autoComplete="off"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          ref={inputRef}
          className={`
            w-full 
            outline-none 
            border-none 
            text-[18px] 
            text-slate-800
        `}
          type="text"
          placeholder="Type a keyword..."
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 border border-slate-400 bg-white rounded-sm max-h-48 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 hover:bg-slate-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
