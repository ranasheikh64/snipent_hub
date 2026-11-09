import { connectToDatabase } from "@/backend/config/db";
import { BlogModel } from "@/backend/models/Blog";
import { initialBlogs } from "@/backend/data/initialBlogs";
import { BlogPost } from "@/frontend/types/blog";

export class BlogRepository {
  private static inMemoryBlogs: BlogPost[] = [...initialBlogs];

  static async getAll(): Promise<BlogPost[]> {
    const conn = await connectToDatabase().catch(() => null);
    if (!conn) {
      return this.inMemoryBlogs;
    }

    try {
      const docs = await BlogModel.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
      if (!docs || docs.length === 0) {
        return this.inMemoryBlogs;
      }
      return docs.map((doc: any) => ({
        id: doc._id.toString(),
        title: doc.title,
        slug: doc.slug,
        content: doc.content,
        excerpt: doc.excerpt || "",
        category: doc.category || "General",
        tags: doc.tags || [],
        author: doc.author || "Rana Sheikh",
        readTime: doc.readTime || "5 min read",
        isPublished: doc.isPublished ?? true,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      }));
    } catch {
      return this.inMemoryBlogs;
    }
  }

  static async getBySlug(slug: string): Promise<BlogPost | null> {
    const all = await this.getAll();
    return all.find((b) => b.slug === slug) || null;
  }
}

