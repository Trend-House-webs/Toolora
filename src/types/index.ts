export type ToolCategory = 'image' | 'pdf' | 'student' | 'utility' | 'student-utility';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  detailedDescription: string;
  icon: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  badge?: string;
  features?: string[];
  howToUse?: HowToStep[];
  whyUse?: string[];
  tips?: string[];
  metaTitle?: string;
  metaDescription?: string;
  faq: FAQItem[];
  relatedSlugs: string[];
}

export interface CategoryInfo {
  id: ToolCategory;
  slug: string;
  title: string;
  description: string;
  icon: string;
  count: number;
}
