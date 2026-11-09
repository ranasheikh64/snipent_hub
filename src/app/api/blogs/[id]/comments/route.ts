import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { BlogModel } from "@/backend/models/Blog";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const blog = await BlogModel.findById(id).select("comments");
  if (!blog) return NextResponse.json({ success: false }, { status: 404 });
  return NextResponse.json({ success: true, data: blog.comments });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const blog = await BlogModel.findById(id);
  if (!blog) return NextResponse.json({ success: false }, { status: 404 });

  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ success: false, message: "Content required" }, { status: 400 });

  const comment = { author: user.name, authorId: user.id, content: content.trim(), createdAt: new Date() };
  blog.comments.push(comment);
  await blog.save();

  return NextResponse.json({ success: true, data: blog.comments[blog.comments.length - 1] }, { status: 201 });
}
