"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

import ProjectActions from "@/components/projects/project-actions";
import type { ProjectCategory, ProjectItem, ProjectLanguage } from "@/types/portfolio";

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
    <div className="space-y-2">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-text/60">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function ProjectInfoPanel({
  project,
}: {
  project: ProjectItem;
}) {
  return (
    <div className="flex flex-col gap-5 w-full max-w-xl">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-primary-text border border-white/20">
            {getProjectTypeLabel(project.category)}
          </span>
          {project.createdAt && (
            <span className="inline-flex items-center rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-primary/80 border border-white/10">
              {project.createdAt}
            </span>
          )}
          {project.status && (
            <span className="inline-flex items-center rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-primary-text/70 border border-white/10">
              {project.status}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-primary-text font-bold text-2xl md:text-3xl">
            {project.name}
          </h3>
          {project.summary && (
            <p className="text-primary-text/85 text-base leading-relaxed">
              {project.summary}
            </p>
          )}
          <p className="text-primary-text/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {project.description || "No description available."}
          </p>
        </div>
      </div>

      {(project.role || project.context || project.status) && (
        <DetailGroup title="Project Details">
          <div className="space-y-2 text-sm text-primary-text/75">
            {project.role && (
              <p>
                <span className="font-medium text-primary-text">Role:</span>{" "}
                {project.role}
              </p>
            )}
            {project.context && (
              <p>
                <span className="font-medium text-primary-text">Context:</span>{" "}
                {project.context}
              </p>
            )}
          </div>
        </DetailGroup>
      )}

      {project.features && project.features.length > 0 && (
        <DetailGroup title="Highlights">
          <ul className="space-y-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="text-primary-text/70 flex text-sm md:text-base"
              >
                <span className="shrink-0 w-2 h-2 bg-accent rounded-full mt-2 mr-3" />
                <span className="flex-1 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </DetailGroup>
      )}

      <DetailGroup title="Technologies">
        <div className="flex flex-wrap gap-2">
          {project.languages.map((lang: ProjectLanguage) => (
            <span
              key={lang.name}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white text-xs font-medium text-[#231942]"
            >
              <Icon icon={lang.iconifyClass} className="w-4 h-4" />
              {lang.name}
            </span>
          ))}
        </div>
      </DetailGroup>

      <DetailGroup title="Links">
        <ProjectActions project={project} />
      </DetailGroup>
    </div>
  );
}
