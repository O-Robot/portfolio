"use client";

import { X } from "lucide-react";

import ProjectInfoPanel from "@/components/projects/project-info-panel";
import ProjectMediaPanel from "@/components/projects/project-media-panel";
import AccessibleDialog from "@/components/ui/accessible-dialog";
import type { ProjectItem } from "@/types/portfolio";

export default function ProjectDetailModal({
  onClose,
  project,
}: {
  onClose: () => void;
  project: ProjectItem;
}) {
  return (
    <AccessibleDialog
      labelledBy={`project-dialog-title-${project.id}`}
      describedBy={`project-dialog-description-${project.id}`}
      onClose={onClose}
      panelClassName="w-full max-w-6xl max-h-[95vh] overflow-y-auto"
    >
      <div className="flex justify-between items-center p-4 md:p-5 border-b border-white/10 sticky top-0 bg-background/70 backdrop-blur-sm z-10">
        <div>
          <h2
            id={`project-dialog-title-${project.id}`}
            className="text-lg font-semibold text-primary-text"
          >
            {project.name}
          </h2>
          <p
            id={`project-dialog-description-${project.id}`}
            className="sr-only"
          >
            Project details, media, technologies, and links for {project.name}.
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label={`Close ${project.name} details`}
          className="p-2 rounded-full hover:bg-link-active hover:text-white text-primary-text cursor-pointer transition"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="p-4 md:p-6 lg:p-8 bg-background/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] gap-8 lg:gap-10 items-start">
          <ProjectMediaPanel project={project} />
          <ProjectInfoPanel project={project} />
        </div>
      </div>
    </AccessibleDialog>
  );
}
