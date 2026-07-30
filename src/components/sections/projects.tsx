"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Circle, Link2 } from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

import { event } from "@/utils/gtag";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import Filter, { FilterOption } from "../filter";

import ProjectDetailModal from "@/components/projects/project-detail-modal";
import type {
  ProjectCategory,
  ProjectItem,
  ProjectLanguage,
} from "@/types/portfolio";
import { TruncateText } from "@/utils/constants";
import { getProjectStatusColorClass } from "@/utils/project-status";

function EmptyState({ filter }: { filter: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center"
    >
      <div className="w-16 h-16 rounded-full glass-morphism flex items-center justify-center">
        <Icon
          icon="mdi:folder-open-outline"
          className="w-8 h-8 text-primary-text/40"
        />
      </div>
      <p className="text-primary-text font-semibold text-lg">
        No projects here yet
      </p>
      <p className="text-primary-text/50 text-sm max-w-xs">
        No {filter === "all" ? "" : filter} projects to show at the moment.
        Check back soon!
      </p>
    </motion.div>
  );
}

function getProjectTypeLabel(category: ProjectCategory) {
  return category === "mobile" ? "Mobile" : "Web";
}

function getProjectSortValue(project: ProjectItem) {
  return Number.parseInt(project.createdAt ?? "0", 10);
}

export default function Projects({
  projectsData,
}: {
  projectsData: ProjectItem[];
}) {
  const [enableTilt, setEnableTilt] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProjectItem["id"] | null>(
    null,
  );

  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>(
    "all",
  );

  const PROJECT_FILTERS: FilterOption[] = [
    { id: "all", label: "All", icon: "✦" },
    { id: "web", label: "Web", icon: "🌐" },
    { id: "mobile", label: "Mobile", icon: "📱" },
  ];

  const filtered = [
    ...(activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter)),
  ].sort((a, b) => getProjectSortValue(b) - getProjectSortValue(a));

  const selectedProject = projectsData.find(
    (project) => project.id === selectedItem,
  );
  const selectedProjectIndex = filtered.findIndex(
    (project) => project.id === selectedItem,
  );

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  useEffect(() => {
    const updateTiltPreference = () => {
      const supportsTiltInteraction =
        window.innerWidth >= 1024 &&
        window.matchMedia("(pointer: fine)").matches &&
        window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

      setEnableTilt(supportsTiltInteraction);
    };

    updateTiltPreference();
    window.addEventListener("resize", updateTiltPreference, {
      passive: true,
    });

    return () => window.removeEventListener("resize", updateTiltPreference);
  }, []);

  const openProject = (project: ProjectItem) => {
    setSelectedItem(selectedItem === project.id ? null : project.id);
    event({
      action: "click",
      category: "Project Frame Clicked",
      label: project.name,
    });
  };

  return (
    <div className="relative space-y-8">
      {/* Filter Bar */}
      <Filter
        filters={PROJECT_FILTERS}
        selectedFilter={activeFilter}
        onFilterChange={(f) => {
          setActiveFilter(f as "all" | ProjectCategory);
          setSelectedItem(null);
        }}
      />
      <div
        className="grid gap-7 w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <EmptyState filter={activeFilter} />
          ) : (
            filtered.map((project, index: number) => (
              <motion.div
                key={project.id + index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${project.name} project details`}
                  onClick={() => openProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject(project);
                    }
                  }}
                  className="group bg-background/30 shadow shadow-skill-text/40 p-5 rounded-xl h-full flex flex-col overflow-hidden cursor-pointer border border-white/10 transition-[border-color,box-shadow,transform] duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-skill-text/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
                >
                  <Tilt
                    tiltEnable={enableTilt}
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    scale={1}
                    transitionSpeed={450}
                    className="h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative w-full h-57.5">
                      <Image
                        src={project?.image || "/images/logo.png"}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover object-left-center rounded-xl z-10"
                        width={1300}
                        height={50}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      {(project.url || project.repoUrl) && (
                        <div className="absolute inset-0 flex justify-end m-3 pointer-events-none">
                          <a
                            href={project.url || project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              event({
                                action: "click",
                                category: "Project Link Clicked",
                                label: project.name,
                              });
                            }}
                            aria-label={`Open ${project.name} in a new tab`}
                            className="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto rotate-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
                          >
                            <Link2 aria-hidden="true" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="mt-5 flex flex-col flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary-text border border-white/20">
                          {getProjectTypeLabel(project.category)}
                        </span>
                        {project.status && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[11px] font-medium text-primary-text/60">
                            <Circle
                              className={`h-2.5 w-2.5 fill-current stroke-none ${getProjectStatusColorClass(project.status)}`}
                            />
                            {project.status}
                          </span>
                        )}
                      </div>
                      <h3 className="text-primary-text font-bold text-[20px]">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-primary-text/70 text-[14px]">
                        {TruncateText(project.description, 200) ||
                          "No description available."}
                      </p>
                      {project.createdAt && (
                        <p className="mt-1 text-xs text-primary/80">
                          {project.createdAt}
                        </p>
                      )}
                    </div>

                    {/* Languages */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.languages.map(
                        (lang: ProjectLanguage, i: number) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-white text-xs text-[#231942]"
                          >
                            <Icon
                              icon={lang.iconifyClass}
                              className="w-4 h-4"
                            />
                            {lang.name}
                          </span>
                        ),
                      )}
                    </div>
                  </Tilt>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {selectedItem && selectedProject && (
          <ProjectDetailModal
            canGoNext={
              selectedProjectIndex > -1 &&
              selectedProjectIndex < filtered.length - 1
            }
            canGoPrevious={selectedProjectIndex > 0}
            onGoNext={() => {
              if (
                selectedProjectIndex > -1 &&
                selectedProjectIndex < filtered.length - 1
              ) {
                setSelectedItem(filtered[selectedProjectIndex + 1].id);
              }
            }}
            onGoPrevious={() => {
              if (selectedProjectIndex > 0) {
                setSelectedItem(filtered[selectedProjectIndex - 1].id);
              }
            }}
            project={selectedProject}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
