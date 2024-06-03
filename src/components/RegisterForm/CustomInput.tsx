import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({
  weight: ["600", "400"],
  subsets: ["latin"]
});

interface InputProps {
  type: string;
  label: string;
  state: {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  };
  required: boolean;
  error: string;
  placeholder?: string;
}

export default function CustomInput({
  placeholder,
  type,
  label,
  state,
  required,
  error
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const { value, setValue } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        inputRef.current.blur();
        setFocus(false);
      } else {
        setFocus(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-fit">
      <label
        className={`${inter.className} flex flex-wrap gap-x-[8px] items-center text-slate-700 text-[18px] font-bold`}
        htmlFor={`${label.toLowerCase()}-input`}
      >
        {label}
        {required && <span className="text-red-500 text-[26px]">*</span>}
        {error && !focus && value.length > 0 && (
          <span className="text-[14px] text-red-600">{error}</span>
        )}
      </label>
      <input
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        ref={inputRef}
        id={`${label.toLowerCase()}-input`}
        className={`w-full outline-none border border-1 transition duration-150 ${
          focus ? "border-slate-800" : "border-slate-300"
        } w-full h-[48px] text-[18px] text-slate-800 rounded-sm border border-slate-400 px-[8px] py-[8px]`}
        type={type}
      />
    </div>
  );
}
