import { NextResponse } from "next/server";
import { BlogService } from "@/backend/services/blogService";

export async function GET() {
  try {
    const blogs = await BlogService.getAllBlogs();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

