import about from "@/data/about.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";

export interface ProjectLanguage {
  name: string;
  iconifyClass: string;
}

export interface MobileScreenshot {
  src: string;
  label?: string;
}

export type ProjectCategory = "web" | "mobile";

export interface ProjectItem {
  id: (typeof projects)[number]["id"];
  name: string;
  category: ProjectCategory;
  image: string;
  description: string;
  summary?: string;
  role?: string;
  context?: string;
  features?: string[];
  status?: string;
  createdAt?: string;
  url?: string;
  repoUrl?: string;
  previewUrl?: string;
  videoUrl?: string;
  devicePreview?: string;
  apkUrl?: string;
  expoUrl?: string;
  figmaUrl?: string;
  isFork?: boolean;
  screenshots?: MobileScreenshot[];
  languages: ProjectLanguage[];
}

export interface MobileProjectItem extends ProjectItem {
  category: "mobile";
}

type ExperienceDataItem = (typeof experience)[number];

export type WorkMode = "remote" | "hybrid" | "onsite";
export type EmploymentType =
  | ExperienceDataItem["type"]
  | "full-time"
  | "part-time";

export type ExperienceItem = Omit<ExperienceDataItem, "type"> & {
  type: EmploymentType;
  workMode?: WorkMode;
};

export type EducationItem = (typeof about.education)[number];
export type TimelineItem = ExperienceItem | EducationItem;
