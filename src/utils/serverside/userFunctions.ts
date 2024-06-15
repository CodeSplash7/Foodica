"use server";

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { type ProfilePicture, type User } from "../allSides/usersFunctions";
import { hashPassword } from "./passwordFunctions";
import { backendClient } from "@/lib/edgestore-server";

const filePath = path.join(process.cwd(), "db", "users.json");

let cachedUsers: User[] = [];
let usersInitialized = false;

const initializeUsers = async () => {
  if (!usersInitialized) {
    try {
      const fileContents = await fs.promises.readFile(filePath, "utf-8");
      cachedUsers = JSON.parse(fileContents);
      usersInitialized = true;
    } catch (error) {
      console.error("Failed to load users from file:", error);
      cachedUsers = [];
      usersInitialized = false;
    }
  }
};

const ensureUsersInitialized = async () => {
  if (!usersInitialized) {
    await initializeUsers();
  }
};
// Function to load users from file
async function loadUsersFromFile() {
  let cachedUsers = [];
  try {
    const fileContents = await fs.promises.readFile(filePath, "utf-8"); // Use await to handle the promise

    cachedUsers = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load users from file:", error);
  }
  return cachedUsers;
}
// Initialize the cache on server start
loadUsersFromFile();

function setCache(data: User[]) {
  cachedUsers = data;
}

export async function updateDb(data: User[]): Promise<void> {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    setCache(data);
  } catch (error) {
    console.error("Failed to update the database:", error);
  }
}

export const getUserByEmail = async (
  email: string | undefined | null
): Promise<User | null> => {
  await ensureUsersInitialized();
  if (!email) return null;
  return cachedUsers.find((u) => u.account.email === email) || null;
};

export const getUserByUsername = async (
  username: string | undefined | null
): Promise<User | null> => {
  if (!username) return null;
  return cachedUsers.find((u) => u.profile.username === username) || null;
};

export const getUserById = async (
  id: string | undefined | null
): Promise<User | null> => {
  if (!id) return null;
  return cachedUsers.find((u) => u.id === id) || null;
};

export const getUsers = async (): Promise<User[]> => {
  return cachedUsers;
};

export default async function registerUser(
  data: string,
  options?: { update: boolean; id: string }
): Promise<User | { error: string }> {
  let parsedData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    return { error: "Invalid data format" };
  }

  if (!options?.update) {
    const newUser = createUser(parsedData);
    if (await getUserByUsername(newUser.profile.username)) {
      return { error: "Username already in use! Try another username" };
    }
    if (await getUserByEmail(newUser.account.email)) {
      return { error: "Email already in use! Try another email" };
    }
    await updateDb([...cachedUsers, newUser]);
    return newUser;
  }
  if (options.update) {
    const user = await getUserById(options.id);
    if (!user) return { error: "User not found" };

    const existingUserByUsername = await getUserByUsername(parsedData.username);
    const existingUserByEmail = await getUserByEmail(parsedData.email);

    if (existingUserByUsername && existingUserByUsername.id !== user.id) {
      return { error: "Username already in use! Try another username" };
    }
    if (existingUserByEmail && existingUserByEmail.id !== user.id) {
      return { error: "Email already in use! Try another email" };
    }

    user.account.email = parsedData.email;
    user.profile.username = parsedData.username;
    user.profile.profilePicture = parsedData.profilePicture;
    await updateDb([...cachedUsers]);
    return user;
  }
  return { error: "Unexpected error" };
}

export const createUser = (newUserInfo: {
  password: string;
  username: string;
  email: string;
  profilePicture: ProfilePicture | null;
}): User => {
  const { username, email, password, profilePicture } = newUserInfo;
  const { salt, hash } = hashPassword(password);
  const id = crypto.randomBytes(16).toString("hex");

  return {
    id,
    account: {
      email,
      password: { salt, hash }
    },
    profile: {
      username,
      profilePicture,
      comments: []
    },
    blogs: []
  };
};

export async function deleteBucketImage(url: string) {
  if (!url) return;
  await backendClient.publicImages.deleteFile({
    url
  });
}
