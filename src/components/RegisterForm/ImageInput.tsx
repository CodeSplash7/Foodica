import { Picture } from "@/types/user-types";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { deleteBucketImage } from "@/server-utils/userFunctions";
import InputField from "../../general-utils/inputField";
import { useRender } from "./CustomInput";

export default function ImageInput({
  formRerender,
  inputField
}: {
  inputField: InputField<File, Picture>;
  formRerender?: () => void;
}) {
  const rerender = useRender(formRerender);
  const options = {
    dropzoneOptions: { maxSize: inputField.maxImageSize },
    width: 96,
    height: 96,
    value: inputField.value || inputField.initialValue?.url,
    onChange: (file: File | undefined) => {
      if (file) inputField.setValue(file);
      if (file === undefined && inputField.value) inputField.setValue(null);
      if (file === undefined && !inputField.value && inputField.initialValue) {
        deleteBucketImage(inputField?.initialValue?.url);
        inputField.setInitialValue(null);
      }
      rerender();
    }
  };

  return (
    <div className={`w-full flex flex-col gap-[4px]`}>
      <div className={`text-[18px] text-slate-700 font-bold`}>
        {inputField.label}
      </div>
      <SingleImageDropzone {...options} />
      <div className="text-red-600">{inputField.errorMessage}</div>
    </div>
  );
}
