export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'twitter' | 'youtube' | 'email' | 'website';
  url: string;
  label: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: 'social' | 'project' | 'blog' | 'work' | 'contact' | 'etc';
  badge?: string;
  clicks: number;
  iconName?: string;
  pinned?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  role?: string;
  period?: string;
  link?: string;
  githubUrl?: string;
  highlight?: boolean;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'career' | 'award' | 'activity';
}

export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  avatarColor: string;
}

export type ProfileTheme = 'modern' | 'sunset' | 'emerald' | 'violet' | 'dark' | 'clean';

export interface ProfileData {
  name: string;
  englishName: string;
  handle: string;
  headline: string;
  bio: string;
  organization: string;
  department: string;
  location: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  statusMessage?: string;
  isAvailableForHire: boolean;
  theme: ProfileTheme;
  skills: string[];
  socialLinks: SocialLink[];
  links: LinkItem[];
  projects: ProjectItem[];
  timeline: TimelineItem[];
}
