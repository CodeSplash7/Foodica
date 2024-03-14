import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

import { type Blog } from "@/app/HighlightedBlog";

let cachedData: Blog;

export async function GET() {
  try {
    if (!cachedData) {
      const filePath = path.join(process.cwd(), "db", "db.json");
      const fileContents = fs.readFileSync(filePath, "utf-8");
      let blogs = JSON.parse(fileContents).blogs;
      const randomBlog = blogs[Math.floor(Math.random() * blogs.length)];
      cachedData = randomBlog;
    }
    return NextResponse.json(cachedData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
