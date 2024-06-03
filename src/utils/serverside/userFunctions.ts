"use server";
import "server-only";

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { type ProfilePicture, type User } from "../allSides/usersFunctions";

const filePath = path.join(process.cwd(), "db", "users.json");

let cachedUsers: User[];
function cacheUsers() {
  if (!cachedUsers) {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    cachedUsers = JSON.parse(fileContents);
  }
}

export const getUserByEmail: (
  email: string | undefined | null
) => User | null = (email) => {
  if (!email) return null;
  cacheUsers();
  const user = cachedUsers.find((u) => u.account.email === email);
  if (!user) return null;
  return user;
};

export const getUserByUsername: (
  username: string | undefined | null
) => User | null = (username) => {
  if (!username) return null;
  cacheUsers();
  const user = cachedUsers.find((u) => u.profile.username === username);
  if (!user) return null;
  return user;
};

export const getUserById: (id: string | undefined | null) => User | null = (
  id
) => {
  if (!id) return null;
  cacheUsers();
  const user = cachedUsers.find((u) => u.id === id);
  if (!user) return null;
  return user;
};

export const getUsers: () => User[] = () => {
  cacheUsers();
  return cachedUsers;
};

export default async function registerUser(
  data: string,
  options?: { update: boolean; id: string }
) {
  cacheUsers();
  const parsedData: {
    password: string;
    username: string;
    email: string;
    profilePicture: ProfilePicture | null;
  } = JSON.parse(data);
  if (!options?.update) {
    const newUser = createUser(parsedData);
    try {
      if (!!getUserByUsername(newUser.profile.username))
        throw new Error("Username already in use! Try another username");
      if (!!getUserByEmail(newUser.account.email))
        throw new Error("Email already in use! Try another email");
      cachedUsers.push(newUser);
      fs.writeFileSync(filePath, JSON.stringify(cachedUsers));
      return newUser;
    } catch (err) {
      if (err instanceof Error) return { error: err.message };
      return { error: "Unexpected error" };
    }
  }
  if (options.update) {
    const user = getUserById(options.id);
    try {
      if (!user) throw new Error("User not found");
      user.account.email = parsedData.email;
      user.profile.username = parsedData.username;
      user.profile.profilePicture = parsedData.profilePicture;
      fs.writeFileSync(filePath, JSON.stringify(cachedUsers));
      return user;
    } catch (err) {
      if (err instanceof Error) return { error: err.message };
      return { error: "Unexpected error" };
    }
  }
  return { error: "Unexpected error" };
}

export const createUser: (newUserInfo: {
  password: string;
  username: string;
  email: string;
  profilePicture: ProfilePicture | null;
}) => User = (newUserInfo) => {
  const { username, email, password, profilePicture } = newUserInfo;
  let hashedPassword = hashPassword(password);
  const id = crypto.randomBytes(16).toString("hex");
  const newUser = {
    id,
    account: {
      email,
      password: hashedPassword
    },
    profile: {
      username,
      profilePicture,
      comments: []
    },
    blogs: []
  };
  return newUser;
};

// Function to hash a password
function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: hash
  };
}

// Function to verify a password
export async function verifyPassword(
  password: string,
  salt: string,
  hash: string
) {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === hashedPassword;
}

function deletelAfterUserFunctionThatShallNotExist() {
  cacheUsers();
  cachedUsers.forEach((u) => {
    u.account.password = hashPassword("1234");
  });
}

deletelAfterUserFunctionThatShallNotExist();
