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
      panelClassName="w-full max-w-6xl max-h-[95vh] overflow-y-auto border border-white/10"
    >
      <div className="flex justify-between items-center p-4 md:px-6 md:py-4 border-b border-white/10 sticky top-0 bg-background/85 backdrop-blur-md z-10">
        <div className="min-w-0">
          <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.18em] text-primary-text/45">
            Project Details
          </p>
          <h2
            id={`project-dialog-title-${project.id}`}
            className="sr-only"
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
          className="p-2 rounded-full hover:bg-white/10 hover:text-primary-text text-primary-text/70 cursor-pointer transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="p-4 md:p-6 lg:px-8 lg:py-7 bg-background/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] gap-8 md:gap-10 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProjectMediaPanel project={project} />
          </div>
          <ProjectInfoPanel project={project} />
        </div>
      </div>
    </AccessibleDialog>
  );
}
