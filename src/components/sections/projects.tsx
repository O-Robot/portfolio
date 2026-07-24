"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Link2, X } from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { event } from "@/utils/gtag";
import Filter, { FilterOption } from "../filter";

import MobilePreview from "./mobile-projects";
import { TruncateText } from "@/utils/constants";
import AccessibleDialog from "../ui/accessible-dialog";

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

export default function Projects({ projectsData }: any) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const PROJECT_FILTERS: FilterOption[] = [
    { id: "all", label: "All", icon: "✦" },
    { id: "web", label: "Web", icon: "🌐" },
    { id: "mobile", label: "Mobile", icon: "📱" },
  ];

  const filtered = [
    ...(activeFilter === "all"
      ? projectsData
      : projectsData.filter((p: any) => p.category === activeFilter)),
  ].sort((a: any, b: any) => b.createdAt - a.createdAt);

  const selectedProject = projectsData.find((p: any) => p.id === selectedItem);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  return (
    <div className="relative space-y-8">
      {/* Filter Bar */}
      <Filter
        filters={PROJECT_FILTERS}
        selectedFilter={activeFilter}
        onFilterChange={(f) => {
          setActiveFilter(f);
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
            filtered.map((project: any, index: number) => (
              <motion.div
                key={project.id + index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full"
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1}
                  transitionSpeed={450}
                  className="bg-background/30 shadow shadow-skill-text/40 p-5 rounded-xl h-full flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative w-full h-57.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(
                          selectedItem === project.id ? null : project.id,
                        );
                        setIsLoading(true);
                        event({
                          action: "click",
                          category: "Project Frame Clicked",
                          label: project.name,
                        });
                      }}
                      className="block w-full h-full rounded-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
                      aria-label={`Preview ${project.name}`}
                    >
                      <Image
                        src={project?.image || "/images/logo.png"}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover object-left-center rounded-xl z-10"
                        width={1300}
                        height={50}
                      />
                    </button>
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
                          className="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto rotate-125"
                        >
                          <Link2 aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-5 flex flex-col flex-1">
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
                    {project.languages.map((lang: any, i: number) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-white text-xs text-[#231942]"
                      >
                        <Icon icon={lang.iconifyClass} className="w-4 h-4" />
                        {lang.name}
                      </span>
                    ))}
                  </div>
                </Tilt>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {selectedItem && selectedProject && (
          <AccessibleDialog
            labelledBy={`project-dialog-title-${selectedProject.id}`}
            describedBy={`project-dialog-description-${selectedProject.id}`}
            onClose={() => setSelectedItem(null)}
            panelClassName="w-full max-h-[95vh] pb-30 overflow-y-auto"
          >
            {/* Modal header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 sticky top-0 bg-background/60 backdrop-blur-sm z-10">
              <div>
                <h2
                  id={`project-dialog-title-${selectedProject.id}`}
                  className="text-lg font-semibold text-primary-text"
                >
                  {selectedProject.name} Preview
                </h2>
                <p
                  id={`project-dialog-description-${selectedProject.id}`}
                  className="sr-only"
                >
                  Preview and links for {selectedProject.name}.
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                aria-label={`Close ${selectedProject.name} preview`}
                className="p-2 rounded-full hover:bg-link-active hover:text-white text-primary-text cursor-pointer transition"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4 min-h-125 flex items-center justify-center  bg-background/80 backdrop-blur-sm">
              {selectedProject.category === "mobile" &&
              !selectedProject?.previewUrl.trim() ? (
                <MobilePreview project={selectedProject} />
              ) : !selectedProject.isFork ? (
                <div className="relative w-full h-[70vh]">
                  {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-background rounded-xl">
                      <p className="text-primary-text/60">
                        Loading {selectedProject.name}...
                      </p>
                    </div>
                  )}
                  <iframe
                    src={selectedProject?.previewUrl || selectedProject.url}
                    className="w-full h-full border-0 rounded-xl"
                    onLoad={() => setIsLoading(false)}
                    title={selectedProject.name}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-center p-4 gap-6">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    width={900}
                    height={500}
                    className="rounded-xl"
                  />
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 glass-morphism text-primary rounded transition"
                  >
                    View Live Site
                  </a>
                </div>
              )}
            </div>
          </AccessibleDialog>
        )}
      </AnimatePresence>
    </div>
  );
}
