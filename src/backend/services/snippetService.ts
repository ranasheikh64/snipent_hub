import { SnippetRepository } from "@/backend/repositories/snippetRepository";
import { CommunityModel } from "@/backend/models/Community";
import { connectToDatabase } from "@/backend/config/db";
import { SnippetItem, TopicFilter } from "@/frontend/types/snippet";

export class SnippetService {
  static async getFilteredSnippets(
    topic: TopicFilter = "ALL",
    level?: string,
    search?: string,
    userEmail?: string
  ): Promise<SnippetItem[]> {
    const all = await SnippetRepository.getAll();

    let joinedTags: string[] = [];
    if (userEmail) {
      await connectToDatabase().catch(() => null);
      const joined = await CommunityModel.find({ members: userEmail }).lean().catch(() => []);
      joinedTags = joined.map((c: any) => c.hashtag || `#${c.slug}`);
    }

    const filtered = all.filter((s) => {
      const matchTopic =
        topic === "ALL" ||
        (topic === "FAVORITES"
          ? (s.starsCount || 0) > 0
          : s.technology.toUpperCase() === topic ||
            s.category.toUpperCase().includes(topic) ||
            s.tags.some((t) => t.toUpperCase() === topic));

      const matchLevel = !level || s.level?.toUpperCase() === level.toUpperCase();

      const q = search?.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.technology.toLowerCase().includes(q) ||
        s.files.some((f) => f.filename.toLowerCase().includes(q) || f.code.toLowerCase().includes(q));

      return matchTopic && matchLevel && matchSearch;
    });

    if (joinedTags.length > 0) {
      filtered.sort((a, b) => {
        const aBoost = a.tags.some((t) => joinedTags.includes(t)) ? 1 : 0;
        const bBoost = b.tags.some((t) => joinedTags.includes(t)) ? 1 : 0;
        return bBoost - aBoost;
      });
    }

    return filtered;
  }

  static async createSnippet(data: {
    title: string;
    description: string;
    category: string;
    technology: string;
    level?: "Beginner" | "Intermediate" | "Advanced";
    tags: string[];
    files: { filename: string; language: string; code: string }[];
    author?: string;
    isPublic?: boolean;
  }): Promise<SnippetItem> {
    return SnippetRepository.create({
      title: data.title,
      description: data.description,
      category: data.category,
      technology: data.technology,
      level: data.level || "Beginner",
      tags: data.tags,
      files: data.files,
      author: data.author || "Rana Sheikh",
      isPublic: data.isPublic ?? true,
    });
  }

  static async copySnippet(id: string): Promise<void> {
    await SnippetRepository.incrementCopy(id);
  }

  static async starSnippet(id: string): Promise<number> {
    return SnippetRepository.incrementStar(id);
  }

  static async forkSnippet(id: string, authorName: string): Promise<SnippetItem | null> {
    return SnippetRepository.fork(id, authorName);
  }
}
