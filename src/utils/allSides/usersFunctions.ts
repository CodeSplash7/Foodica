export type User = {
  id: string;
  account: {
    email: string;
    password: Password;
  };
  profile: {
    username: string;
    profilePicture: ProfilePicture;
    comments: never[];
  };
  blogs: never[];
};

export type ProfilePicture =
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

export function profilePictureToFile(pfp: ProfilePicture) {}
export function FileToProfilePicture(file: File) {}
