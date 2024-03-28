import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

let cachedData: any;

export async function GET() {
  try {
    if (!cachedData) {
      const filePath = path.join(process.cwd(), "db", "db.json");
      const fileContents = fs.readFileSync(filePath, "utf-8");
      cachedData = JSON.parse(fileContents).blogs;
    }
    if (!cachedData) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 });
    }
    return NextResponse.json(cachedData, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
