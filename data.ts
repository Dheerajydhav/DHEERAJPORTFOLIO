import { Project, CaseStudy, BlogPost, Highlight, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'sony-bravia',
    title: 'Sony Bravia – AI Commercial',
    category: 'AI MOTION / COMMERCIAL',
    // Using the robust lh3 direct-link format for the specific Google Drive ID provided (1gI_SsqLOZpXgTc-RYw0y9NHB6QFg6LTf)
    thumbnail: 'https://lh3.googleusercontent.com/d/1gI_SsqLOZpXgTc-RYw0y9NHB6QFg6LTf',
    videoEmbed: 'https://streamable.com/e/3s5t42'
  },
  {
    id: 'huddle-global',
    title: 'Huddle Global – AI Inaugural Film',
    category: 'Generative AI / Event Visuals',
    thumbnail: 'https://picsum.photos/seed/huddle/800/600',
  },
  {
    id: 'oxygen-digital',
    title: 'Oxygen Digital Expert – Brand Campaign',
    category: 'Brand Motion / Ads',
    thumbnail: 'https://picsum.photos/seed/oxygen/800/600',
  },
  {
    id: 'landmark-builders',
    title: 'Landmark Builders – Visualization',
    category: '3D Archviz / Motion',
    thumbnail: 'https://picsum.photos/seed/landmark/800/600',
  },
  {
    id: 'led-visuals',
    title: 'Live Event LED Visuals',
    category: 'Stage Motion / Immersive',
    thumbnail: 'https://picsum.photos/seed/led/800/600',
  },
  {
    id: 'ai-experimental',
    title: 'Experimental AI Motion Short',
    category: 'Concept Art / AI',
    thumbnail: 'https://picsum.photos/seed/experimental/800/600',
  },
];

export const HIGHLIGHTS: Highlight[] = [
  { id: '1', stat: '20M+', label: 'Views on Sony Bravia AI Commercial' },
  { id: '2', stat: '100%', label: 'AI-Generated Film for Huddle Global' },
  { id: '3', stat: '40%', label: 'Production Turnaround Reduction' },
  { id: '4', stat: '8+', label: 'Major Campaigns for Oxygen Digital' },
];

export const SERVICES: Service[] = [
  { id: '1', title: 'Motion Graphics & Animation', description: 'Dynamic visual storytelling using premium animation principles.', icon: 'Film' },
  { id: '2', title: 'AI-Powered Video Production', description: 'Integrating Generative AI to push the boundaries of creative speed.', icon: 'Cpu' },
  { id: '3', title: 'Brand Identity Motion', description: 'Crafting motion languages that define modern brand identities.', icon: 'Zap' },
  { id: '4', title: 'Event & LED Screen Visuals', description: 'Large-scale immersive visuals for global events and stages.', icon: 'Monitor' },
  { id: '5', title: 'Creative Direction', description: 'Guiding visual narratives from initial concept to final render.', icon: 'Compass' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sony-bravia-cs',
    title: 'Sony Bravia',
    // Using the new provided image ID: 1eTKRqYm3JF6lR20in6oA91lxwZNi8LtR
    image: 'https://lh3.googleusercontent.com/d/1eTKRqYm3JF6lR20in6oA91lxwZNi8LtR',
    brief: 'Create a visually arresting commercial showcasing color depth and AI integration.',
    concept: 'A journey through hyper-realistic spectral landscapes.',
    workflow: 'Combination of Stable Diffusion for texture synthesis and After Effects for compositing.',
    output: '60-second high-fidelity commercial delivered in 4K.',
    impact: 'Reached 20M+ organic views across platforms, boosting brand engagement by 35%.',
  },
  {
    id: 'huddle-cs',
    title: 'Huddle Global',
    image: 'https://picsum.photos/seed/huddle-cs/800/600',
    brief: 'Inaugural video for one of Asia\'s largest startup festivals.',
    concept: 'Evolution of humanity through the lens of artificial intelligence.',
    workflow: 'Full Gen-2 and Midjourney pipeline with custom trained LoRAs.',
    output: 'A cinematic 2-minute journey from past to future.',
    impact: 'Lauded by industry leaders as a milestone in AI film production.',
  },
  {
    id: 'oxygen-cs',
    title: 'Oxygen Digital Expert',
    image: 'https://picsum.photos/seed/oxygen-cs/800/600',
    brief: 'Standardize brand motion across all retail touchpoints.',
    concept: 'Minimalist tech elegance focusing on speed and reliability.',
    workflow: 'Template-driven Lottie animations for web and high-end 3D for stores.',
    output: '8 major seasonal campaigns and a unified motion design system.',
    impact: 'Unified the brand voice across 50+ retail locations.',
  },
  {
    id: 'pcl-cs',
    title: 'PCL Cricket League',
    image: 'https://picsum.photos/seed/pcl-cs/800/600',
    brief: 'High-energy broadcast package for a regional cricket league.',
    concept: 'Grit, sweat, and glory represented through chrome and smoke.',
    workflow: 'C4D for dynamics and X-Particles for stadium atmosphere.',
    output: 'Intro sequence, lower thirds, and transition stings.',
    impact: 'Increased broadcast production value to match international standards.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How I Directed a 20M+ View AI Commercial',
    date: 'Oct 12, 2024',
    excerpt: 'A deep dive into the creative decisions and technical hurdles of the Sony Bravia campaign.',
  },
  {
    id: '2',
    title: 'AI in Motion Design: My Real Workflow',
    date: 'Sep 28, 2024',
    excerpt: 'Step-by-step breakdown of how I use ComfyUI and After Effects together.',
  },
  {
    id: '3',
    title: 'Speed vs Quality: Using AI Without Killing Creativity',
    date: 'Aug 15, 2024',
    excerpt: 'Why the artist remains central even when tools automate the heavy lifting.',
  },
];