import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

import { type Blog } from "@/store/blogsSlice";

let cachedData: Blog;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!cachedData) {
      const filePath = path.join(process.cwd(), "db", "db.json");
      const fileContents = fs.readFileSync(filePath, "utf-8");
      let blogs = JSON.parse(fileContents).blogs;
      let blog = blogs.find((blog: Blog) => blog.id === Number(params.id));
      if (!blog)
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      cachedData = blog;
    }
    return NextResponse.json(cachedData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
