import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "db", "db.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    let blogs = JSON.parse(fileContents).blogs;
    const randomBlog = blogs[Math.floor(Math.random() * blogs.length)];
    return NextResponse.json(randomBlog, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
