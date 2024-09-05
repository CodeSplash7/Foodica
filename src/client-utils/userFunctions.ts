"use client";

import { Picture } from "@/types/user-types";

type ProfilePictureKeys = NonNullable<Picture>;

export function transformFileToProfilePicture(
  file: File,
  options?: { [K in keyof ProfilePictureKeys]?: any }
): Picture {
  return {
    ...file,
    arrayBuffer: file.arrayBuffer,
    filename: file.name,
    type: file.type,
    size: file.size,
    url: URL.createObjectURL(file),
    thumbnailUrl: "",
    uploadedAt: new Date(),
    metadata: {},
    path: {},
    pathOrder: [],
    ...options
  };
}
