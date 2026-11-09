import { SnippetItem, TopicFilter } from "@/frontend/types/snippet";

export function getTopicCounts(all: SnippetItem[]): Record<string, number> {
  const c: Record<string, number> = {
    ALL: all.length, FLUTTER: 0, BACKEND: 0, REACT: 0, FULLSTACK: 0, FAVORITES: 0,
  };
  all.forEach((s) => {
    const tech = (s.technology || "").toUpperCase();
    const cat = (s.category || "").toUpperCase();
    const tags = (s.tags || []).map((t) => t.toUpperCase());

    if (tech === "FLUTTER" || tags.includes("FLUTTER")) c.FLUTTER++;
    if (tech === "BACKEND" || tech === "NODE.JS" || tech === "PYTHON" || tech === "GO" || cat.includes("BACKEND") || tags.includes("BACKEND") || tags.includes("NODE.JS")) c.BACKEND++;
    if (tech === "REACT" || tech === "NEXT.JS" || tags.includes("REACT") || tags.includes("NEXT.JS")) c.REACT++;
    if (tech === "FULLSTACK" || cat.includes("FULLSTACK") || tags.includes("FULLSTACK")) c.FULLSTACK++;
    if ((s.starsCount || 0) > 0) c.FAVORITES++;
  });
  return c;
}

export function filterSnippets(
  all: SnippetItem[], topic: TopicFilter, level: string, search: string
): SnippetItem[] {
  return all.filter((s) => {
    const sTech = (s.technology || "").toUpperCase();
    const sCat = (s.category || "").toUpperCase();
    const sTags = (s.tags || []).map((t) => t.toUpperCase());

    let matchTopic = true;
    if (topic === "ALL") matchTopic = true;
    else if (topic === "FAVORITES") matchTopic = (s.starsCount || 0) > 0;
    else if (topic === "FLUTTER") matchTopic = sTech === "FLUTTER" || sTags.includes("FLUTTER");
    else if (topic === "BACKEND") matchTopic = sTech === "BACKEND" || sTech === "NODE.JS" || sTech === "PYTHON" || sTech === "GO" || sCat.includes("BACKEND") || sTags.includes("BACKEND") || sTags.includes("NODE.JS");
    else if (topic === "REACT") matchTopic = sTech === "REACT" || sTech === "NEXT.JS" || sTags.includes("REACT") || sTags.includes("NEXT.JS");
    else if (topic === "FULLSTACK") matchTopic = sTech === "FULLSTACK" || sCat.includes("FULLSTACK") || sTags.includes("FULLSTACK");
    else matchTopic = sTech === topic || sCat.includes(topic) || sTags.includes(topic);

    const matchLevel = !level || (s.level || "BEGINNER").toUpperCase() === level.toUpperCase();
    const q = search.toLowerCase().trim();
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.technology.toLowerCase().includes(q) || s.files.some((f) => f.filename.toLowerCase().includes(q) || f.code.toLowerCase().includes(q));

    return matchTopic && matchLevel && matchSearch;
  });
}
