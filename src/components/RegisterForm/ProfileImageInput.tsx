import { ProfilePicture } from "@/utils/allSides/usersFunctions";
import { useState } from "react";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { deleteBucketImage } from "@/utils/serverside/userFunctions";
import InputField from "./inputField";

export default function ProfileImageInput({
  inputField
}: {
  inputField: InputField<File, ProfilePicture>;
}) {
  function rerender() {
    setRender((prev) => !prev);
  }

  const options = {
    dropzoneOptions: { maxSize: 500000 },
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

  const [, setRender] = useState(false);
  return (
    <div className={`w-full flex flex-col gap-[4px]`}>
      <div className={`text-[18px] text-slate-700 font-bold`}>
        Profile photo
      </div>
      <SingleImageDropzone {...options} />
    </div>
  );
}
