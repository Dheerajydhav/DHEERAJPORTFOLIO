export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  videoEmbed?: string;
  description?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  brief: string;
  concept: string;
  workflow: string;
  output: string;
  impact: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

export interface Highlight {
  id: string;
  stat: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}