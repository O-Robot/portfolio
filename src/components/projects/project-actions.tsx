"use client";

import { Icon } from "@iconify/react";

import { event } from "@/utils/gtag";
import type { ProjectItem } from "@/types/portfolio";

type ActionConfig = {
  analyticsLabel: string;
  href?: string;
  icon: string;
  label: string;
};

function ActionButton({
  analyticsLabel,
  href,
  icon,
  label,
  priority,
  projectName,
}: ActionConfig & { priority: "primary" | "secondary"; projectName: string }) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        event({ action: "click", category: analyticsLabel, label: projectName })
      }
      className={`inline-flex items-center justify-center gap-1.5 min-h-10 px-4 py-2 rounded-lg text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text ${
        priority === "primary"
          ? "bg-primary-text text-background hover:opacity-90 shadow-sm"
          : "glass-morphism text-primary-text/80 hover:text-primary-text border border-white/10"
      }`}
    >
      <Icon icon={icon} className="w-4 h-4" />
      {label}
    </a>
  );
}

export default function ProjectActions({
  project,
}: {
  project: ProjectItem;
}) {
  const actions: ActionConfig[] = [
    {
      href: project.url,
      icon:
        project.category === "mobile" && !project.devicePreview
          ? "mdi:github"
          : "mdi:web",
      label:
        project.category === "mobile" && !project.devicePreview
          ? "View Repo"
          : "View Live Site",
      analyticsLabel:
        project.category === "mobile" && !project.devicePreview
          ? "Repo Link Clicked"
          : "Live Site Clicked",
    },
    {
      href: project.repoUrl,
      icon: "mdi:github",
      label: "View Repo",
      analyticsLabel: "Repo Link Clicked",
    },
    {
      href: project.devicePreview,
      icon: "mdi:android",
      label: "View Application",
      analyticsLabel: "Device Preview",
    },
    {
      href: project.apkUrl,
      icon: "mdi:android",
      label: "Download APK",
      analyticsLabel: "APK Download",
    },
    {
      href: project.expoUrl,
      icon: "simple-icons:expo",
      label: "Open in Expo",
      analyticsLabel: "Expo Link Clicked",
    },
    {
      href: project.figmaUrl,
      icon: "simple-icons:figma",
      label: "View in Figma",
      analyticsLabel: "Figma Link Clicked",
    },
    {
      href: project.previewUrl,
      icon: "mdi:open-in-new",
      label: "Open Preview",
      analyticsLabel: "Preview Link Clicked",
    },
  ];

  const visibleActions = actions.filter((action) => Boolean(action.href));

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2.5 pt-1">
      {visibleActions.map((action) => (
        <ActionButton
          key={`${project.id}-${action.label}`}
          {...action}
          priority={
            action.label === "View Live Site" || action.label === "View Repo"
              ? "primary"
              : "secondary"
          }
          projectName={project.name}
        />
      ))}
    </div>
  );
}
