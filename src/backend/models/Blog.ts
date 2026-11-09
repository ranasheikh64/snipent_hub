import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: "" },
    coverImage: { type: String },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    author: { type: String, default: "Rana Sheikh" },
    readTime: { type: String, default: "5 min read" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

