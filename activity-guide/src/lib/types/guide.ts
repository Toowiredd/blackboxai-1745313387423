export interface Citation {
  id: string;
  url: string;
  title: string;
  checked: string; // ISO date string of when the citation was last verified
}

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  citations: Citation[];
  order: number;
}

export interface Guide {
  id: string;
  title: string;
  activityType: string;
  skillLevel: string;
  location: string;
  duration: string;
  groupSize: number;
  steps: GuideStep[];
  citations: Citation[];
  createdAt: string;
  updatedAt: string;
  metadata: {
    author?: string;
    isTemplate: boolean;
    isPremium: boolean;
    tags: string[];
  };
}

export type ActivityType = 
  | "Family Fishing - Beginners"
  | "Bushwalk & Plant-ID"
  | "Kids Science Workshop"
  | "Nature Photography"
  | "Bird Watching";

export type SkillLevel = 
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type Duration = 
  | "2 hours"
  | "half-day"
  | "full-day"
  | "weekend";

export interface WizardState {
  activityType: ActivityType | null;
  skillLevel: SkillLevel | null;
  location: string | null;
  duration: Duration | null;
  groupSize: number | null;
  currentStep: number;
}
