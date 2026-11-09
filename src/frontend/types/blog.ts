export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  isPublished: boolean;
  createdAt: string;
}

