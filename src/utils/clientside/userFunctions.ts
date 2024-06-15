"use client";

import { ProfilePicture } from "@/utils/allSides/usersFunctions";
type ProfilePictureKeys = NonNullable<ProfilePicture>;

export function transformFileToProfilePicture(
  file: File,
  options?: { [K in keyof ProfilePictureKeys]?: any }
): ProfilePicture {
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

