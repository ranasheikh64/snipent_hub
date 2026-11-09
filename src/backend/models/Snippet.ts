import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISnippetFile {
  filename: string;
  language: string;
  code: string;
}

export interface ISnippet extends Document {
  title: string;
  description: string;
  category: string;
  technology: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  files: ISnippetFile[];
  author: string;
  isPublic: boolean;
  copyCount: number;
  starsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const SnippetFileSchema = new Schema<ISnippetFile>({
  filename: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
});

const SnippetSchema = new Schema<ISnippet>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, required: true, index: true },
    technology: { type: String, required: true, index: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    tags: [{ type: String, trim: true }],
    files: [SnippetFileSchema],
    author: { type: String, default: "Rana Sheikh" },
    isPublic: { type: Boolean, default: true },
    copyCount: { type: Number, default: 0 },
    starsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SnippetModel: Model<ISnippet> =
  mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", SnippetSchema);

