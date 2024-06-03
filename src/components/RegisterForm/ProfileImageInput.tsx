import { ProfilePicture } from "@/utils/allSides/usersFunctions";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from "react";

export default function ProfileImageInput({
  state,
  error,
  initialPicture
}: {
  error: string;
  state: {
    picture: File | undefined;
    setPicture: Dispatch<SetStateAction<File | undefined>>;
  };
  initialPicture?: ProfilePicture;
}) {
  const { picture: file, setPicture: setFile } = state;
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      return;
    }
    (async () => {
      if (initialPicture) setImageUrl(initialPicture.url);
    })();
  }, [file, initialPicture]);

  return (
    <div className={`w-full flex flex-col gap-[4px]`}>
      <div className={`text-[18px] text-slate-700 font-bold`}>
        Profile photo
      </div>
      <Image
        className={`h-[96px] w-[96px] [object-fit:cover]`}
        width={100}
        height={100}
        alt=""
        src={imageUrl || "/images/userImages/guest-user.png"}
        // src={file?.url || initialPicture?.url || "/images/userImages/guest-user.png"}
      />

      <div className={`flex flex-wrap gap-x-[16px] gap-y-[4px] items-center`}>
        <label
          className={`bg-blue-500 rounded-sm text-white px-[16px] py-[4px] text-[16px] w-fit`}
          htmlFor="image-input"
        >
          {file ? "Change file" : "Add file"}
        </label>

        {file && (
          <p>
            <span className={`underline`}>{file.name}</span> selected
          </p>
        )}

        {file?.size! >= 500000 && (
          <span className={`text-red-600 text-[14px]`}>{error}</span>
        )}
      </div>

      <p className={`text-[14px] text-slate-600`}>
        Only .jpg, jpeg, png, wepb files. 500kb max file size
      </p>

      <input
        className={`hidden`}
        id="image-input"
        accept="image/png, image/jpeg, image/webp, image/jpg"
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
          handleFileChange(e);
        }}
      />
    </div>
  );
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  }
}

async function urlToFile(url: string, filename: string, mimeType: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}
