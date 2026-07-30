"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Check, Circle } from "lucide-react";

import ProjectActions, {
  hasProjectActions,
} from "@/components/projects/project-actions";
import type {
  ProjectCategory,
  ProjectItem,
  ProjectLanguage,
} from "@/types/portfolio";
import { getProjectStatusColorClass } from "@/utils/project-status";

function getProjectTypeLabel(category: ProjectCategory) {
  return category === "mobile" ? "Mobile Project" : "Web Project";
}

function DetailGroup({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-text/50">
        {title}
      </h3>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/6 px-2.5 py-1 text-[11px] font-medium text-primary-text/65 shadow-sm backdrop-blur-sm">
      <Circle
        className={`h-2.5 w-2.5 fill-current stroke-none ${getProjectStatusColorClass(status)}`}
      />
      {status}
    </span>
  );
}

export default function ProjectInfoPanel({
  project,
}: {
  project: ProjectItem;
}) {
  return (
    <div className="flex flex-col gap-7 w-full max-w-xl">
      <div className="space-y-5">
        <div className="space-y-3">
          <h3 className="text-primary-text font-semibold text-3xl md:text-4xl leading-tight tracking-tight">
            {project.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-primary-text/55">
            {project.createdAt && <span>{project.createdAt}</span>}
            {project.createdAt && (
              <span aria-hidden="true" className="text-primary-text/30">
                •
              </span>
            )}
            <span>{getProjectTypeLabel(project.category)}</span>
            {project.status && (
              <>
                <span aria-hidden="true" className="text-primary-text/30">
                  •
                </span>
                <StatusBadge status={project.status} />
              </>
            )}
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          {project.summary && (
            <p className="text-primary-text/88 text-lg md:text-xl leading-relaxed tracking-tight">
              {project.summary}
            </p>
          )}
          <DetailGroup title="Overview">
            <p className="text-primary-text/72 text-sm md:text-[15px] leading-7 whitespace-pre-line max-w-prose">
              {project.description || "No description available."}
            </p>
          </DetailGroup>
        </div>
      </div>

      {project.context && (
        <DetailGroup title="Context">
          <p className="text-primary-text/72 text-sm md:text-[15px] leading-7 max-w-prose">
            {project.context}
          </p>
        </DetailGroup>
      )}

      {project.features && project.features.length > 0 && (
        <DetailGroup title="Features">
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="text-primary-text/72 flex items-start gap-3 text-sm md:text-[15px] leading-6"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-primary-text/60">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="flex-1 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </DetailGroup>
      )}

      {project.role && (
        <DetailGroup title="Role">
          <p className="text-primary-text/72 text-sm md:text-[15px] leading-7">
            {project.role}
          </p>
        </DetailGroup>
      )}

      <DetailGroup title="Technologies">
        <div className="flex flex-wrap gap-2.5">
          {project.languages.map((lang: ProjectLanguage) => (
            <span
              key={lang.name}
              className="inline-flex items-center gap-1.5 min-h-9 px-3 py-2 rounded-lg bg-white/95 text-xs font-medium text-[#231942] shadow-sm"
            >
              <Icon icon={lang.iconifyClass} className="w-4 h-4" />
              {lang.name}
            </span>
          ))}
        </div>
      </DetailGroup>

      {hasProjectActions(project) && (
        <DetailGroup title="Links">
          <ProjectActions project={project} />
        </DetailGroup>
      )}
    </div>
  );
}
