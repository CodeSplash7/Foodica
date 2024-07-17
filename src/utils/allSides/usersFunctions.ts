export type User = {
  id: string;
  account: {
    email: string;
    password: Password;
  };
  profile: {
    username: string;
    profilePicture: Picture;
    comments: string[];
  };
  blogs: string[];
};

export type Picture =
  | (File & {
      filename: string;
      type: string;
      url: string;
      thumbnailUrl: string | null;
      size: number;
      uploadedAt: Date;
      metadata: Record<string, never>;
      path: Record<string, never>;
      pathOrder: string[];
    })
  | null;

export type Password = {
  hash: string;
  salt: string;
};

export function profilePictureToFile(pfp: Picture) {}
export function FileToProfilePicture(file: File) {}
