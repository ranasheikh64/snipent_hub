export interface CommunityItem {
  id: string;
  name: string;
  slug: string;
  hashtag: string;
  description: string;
  icon: string;
  creatorName: string;
  membersCount: number;
  members?: string[];
  snippetsCount: number;
}

