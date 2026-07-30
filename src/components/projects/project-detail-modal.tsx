"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import ProjectInfoPanel from "@/components/projects/project-info-panel";
import ProjectMediaPanel from "@/components/projects/project-media-panel";
import AccessibleDialog from "@/components/ui/accessible-dialog";
import type { ProjectItem } from "@/types/portfolio";

export default function ProjectDetailModal({
  canGoNext,
  canGoPrevious,
  onGoNext,
  onGoPrevious,
  onClose,
  project,
}: {
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  onGoNext?: () => void;
  onGoPrevious?: () => void;
  onClose: () => void;
  project: ProjectItem;
}) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    titleRef.current?.focus({ preventScroll: true });
  }, [project.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "ArrowLeft" && canGoPrevious && onGoPrevious) {
        event.preventDefault();
        onGoPrevious();
      }

      if (event.key === "ArrowRight" && canGoNext && onGoNext) {
        event.preventDefault();
        onGoNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canGoNext, canGoPrevious, onGoNext, onGoPrevious]);

  return (
    <AccessibleDialog
      labelledBy={`project-dialog-title-${project.id}`}
      describedBy={`project-dialog-description-${project.id}`}
      onClose={onClose}
      panelClassName="relative flex w-full max-w-6xl max-h-[95vh] flex-col overflow-hidden border border-white/10"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden md:block">
        <button
          type="button"
          onClick={onGoPrevious}
          disabled={!canGoPrevious}
          aria-label="Show previous project"
          className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-primary-text/80 shadow-lg shadow-black/10 backdrop-blur-md transition duration-200 hover:scale-[1.03] hover:bg-white/14 hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onGoNext}
          disabled={!canGoNext}
          aria-label="Show next project"
          className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-primary-text/80 shadow-lg shadow-black/10 backdrop-blur-md transition duration-200 hover:scale-[1.03] hover:bg-white/14 hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex justify-between items-center p-4 md:px-6 md:py-4 border-b border-white/10 sticky top-0 bg-background/85 backdrop-blur-md z-10">
        <div className="min-w-0">
          <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.18em] text-primary-text/45">
            Project Details
          </p>
          <h2
            id={`project-dialog-title-${project.id}`}
            ref={titleRef}
            tabIndex={-1}
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

      <div
        ref={scrollAreaRef}
        className="overflow-y-auto p-4 md:p-6 lg:px-8 lg:py-7 bg-background/80 backdrop-blur-sm"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] gap-8 md:gap-10 lg:gap-12 items-start"
          >
            <div className="lg:sticky lg:top-14 lg:self-start">
              <ProjectMediaPanel project={project} />
            </div>
            <ProjectInfoPanel project={project} />
          </motion.div>
        </AnimatePresence>
      </div>
    </AccessibleDialog>
  );
}
