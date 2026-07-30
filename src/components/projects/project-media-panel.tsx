"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import type {
  MobileProjectItem,
  MobileScreenshot,
  ProjectItem,
} from "@/types/portfolio";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-49.75 h-107 shrink-0" aria-hidden="true">
      <div className="absolute inset-0 rounded-[2.2rem] border-[6px] border-white/20 bg-[#111] shadow-xl shadow-black/40" />
      <div className="absolute -left-1.75 top-16 w-1 h-8 bg-primary-text/15 rounded-l-sm" />
      <div className="absolute -left-1.75 top-28 w-1 h-6 bg-primary-text/15 rounded-l-sm" />
      <div className="absolute -right-1.75 top-20 w-1 h-10 bg-primary-text/15 rounded-r-sm" />
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-[#111] rounded-full z-20" />
      <div className="absolute inset-1.25 rounded-[1.8rem] overflow-hidden bg-background z-10">
        {children}
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-primary-text/25 rounded-full z-20" />
    </div>
  );
}

function FadeImage({
  alt,
  className,
  priority = false,
  sizes,
  src,
}: {
  alt: string;
  className: string;
  priority?: boolean;
  sizes: string;
  src: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const hasMarkedLoadedRef = useRef(false);

  useEffect(() => {
    setLoaded(false);
    hasMarkedLoadedRef.current = false;
  }, [src]);

  const markLoaded = () => {
    if (hasMarkedLoadedRef.current) {
      return;
    }

    hasMarkedLoadedRef.current = true;
    setLoaded(true);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-white/6 transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={markLoaded}
        onLoadingComplete={markLoaded}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

function isMobileProject(project: ProjectItem): project is MobileProjectItem {
  return project.category === "mobile";
}

function ScreenshotControls({
  currentIndex,
  onSelect,
  screenshots,
}: {
  currentIndex: number;
  onSelect: (index: number) => void;
  screenshots: MobileScreenshot[];
}) {
  if (screenshots.length <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      {screenshots[currentIndex].label && (
        <span className="text-sm font-medium text-primary-text/70 text-center">
          {screenshots[currentIndex].label}
        </span>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelect(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          aria-label="Show previous screenshot"
          className="p-1.5 rounded-full glass-morphism disabled:opacity-30 cursor-pointer hover:opacity-80 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
        >
          <ChevronLeft className="w-4 h-4 text-primary-text" />
        </button>

        <div className="flex gap-1.5">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              aria-label={`Show screenshot ${index + 1}`}
              aria-current={index === currentIndex}
              type="button"
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                index === currentIndex
                  ? "bg-primary-text scale-125"
                  : "bg-primary-text/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            onSelect(Math.min(screenshots.length - 1, currentIndex + 1))
          }
          disabled={currentIndex === screenshots.length - 1}
          aria-label="Show next screenshot"
          className="p-1.5 rounded-full glass-morphism disabled:opacity-30 cursor-pointer hover:opacity-80 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
        >
          <ChevronRight className="w-4 h-4 text-primary-text" />
        </button>
      </div>
    </div>
  );
}

function VideoPreview({ className, src }: { className: string; src: string }) {
  return (
    <video
      src={src}
      className={className}
      autoPlay
      loop
      muted
      controls
      controlsList="nodownload"
      playsInline
    />
  );
}

function EmptyMediaState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="relative w-full min-h-72 overflow-hidden rounded-2xl border border-white/10 glass-morphism flex items-center justify-center text-center p-8 text-primary-text/60">
      <div className="relative z-10 max-w-sm space-y-2">
        <p className="text-sm md:text-[15px] leading-6">{message}</p>
        <p className="text-xs md:text-sm text-primary-text/45">
          Explore the live site or repository below.
        </p>
      </div>
    </div>
  );
}

function ScreenshotLightbox({
  currentIndex,
  onClose,
  onSelect,
  projectName,
  screenshots,
}: {
  currentIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
  projectName: string;
  screenshots: MobileScreenshot[];
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && currentIndex > 0) {
        event.preventDefault();
        event.stopPropagation();
        onSelect(currentIndex - 1);
      }

      if (event.key === "ArrowRight" && currentIndex < screenshots.length - 1) {
        event.preventDefault();
        event.stopPropagation();
        onSelect(currentIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [currentIndex, onClose, onSelect, screenshots.length]);

  if (typeof document === "undefined") {
    return null;
  }

  const activeShot = screenshots[currentIndex];

  return createPortal(
    <AnimatePresence>
      <motion.div
        key={`${projectName}-lightbox`}
        data-project-lightbox="open"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-background/88 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={(event) => event.stopPropagation()}
          className="relative flex w-full max-w-6xl flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-background/72 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-primary-text/78">
                {activeShot.label ||
                  `${projectName} screenshot ${currentIndex + 1}`}
              </p>
              <p className="text-xs text-primary-text/45">
                {currentIndex + 1} of {screenshots.length}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={`Close ${projectName} screenshot viewer`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-primary-text/75 transition hover:bg-white/12 hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative min-h-[50vh] overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:min-h-[70vh]">
            <FadeImage
              src={activeShot.src}
              alt={
                activeShot.label ||
                `${projectName} screenshot ${currentIndex + 1}`
              }
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>

          {screenshots.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onSelect(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                aria-label="Show previous screenshot"
                className="absolute left-6 top-1/2 mt-4 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-primary-text/80 shadow-lg shadow-black/10 backdrop-blur-md transition duration-200 hover:scale-[1.03] hover:bg-white/14 hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() =>
                  onSelect(Math.min(screenshots.length - 1, currentIndex + 1))
                }
                disabled={currentIndex === screenshots.length - 1}
                aria-label="Show next screenshot"
                className="absolute right-6 top-1/2 mt-4 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-primary-text/80 shadow-lg shadow-black/10 backdrop-blur-md transition duration-200 hover:scale-[1.03] hover:bg-white/14 hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default function ProjectMediaPanel({
  project,
}: {
  project: ProjectItem;
}) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const screenshots = project.screenshots ?? [];
  const hasScreenshots = screenshots.length > 0;
  const safeScreenshotIndex = hasScreenshots
    ? Math.min(screenshotIndex, screenshots.length - 1)
    : 0;
  const screenshot = hasScreenshots ? screenshots[safeScreenshotIndex] : null;
  const isArchived = project.status?.trim().toLowerCase() === "archived";
  const livePreviewHref = isArchived ? undefined : project.previewUrl || project.url;

  useEffect(() => {
    setScreenshotIndex((currentIndex) =>
      screenshots.length === 0
        ? 0
        : Math.min(currentIndex, screenshots.length - 1),
    );
    setLightboxIndex(null);
  }, [project.id, screenshots.length]);

  const openLightbox = () => {
    if (!project.videoUrl && hasScreenshots) {
      setLightboxIndex(safeScreenshotIndex);
    }
  };

  const handleLightboxSelect = (index: number) => {
    setScreenshotIndex(index);
    setLightboxIndex(index);
  };

  if (isMobileProject(project)) {
    return (
      <div className="flex flex-col items-center gap-5 w-full md:w-auto lg:pt-1">
        <button
          type="button"
          onClick={openLightbox}
          disabled={!hasScreenshots || Boolean(project.videoUrl)}
          aria-label={
            hasScreenshots && !project.videoUrl
              ? `Open ${project.name} screenshots`
              : `${project.name} preview`
          }
          className="group cursor-pointer disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
        >
          <PhoneFrame>
            {project.videoUrl ? (
              <VideoPreview
                src={project.videoUrl}
                className="w-full h-full object-cover"
              />
            ) : screenshot ? (
              <FadeImage
                src={screenshot.src}
                alt={screenshot.label || `${project.name} mobile preview`}
                sizes="(max-width: 768px) 70vw, 20rem"
                priority={screenshotIndex === 0}
                className="object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary-text/60 text-sm text-center p-5 leading-relaxed">
                No mobile preview available yet.
              </div>
            )}
          </PhoneFrame>
        </button>

        {!project.videoUrl && hasScreenshots && (
          <ScreenshotControls
            currentIndex={safeScreenshotIndex}
            onSelect={setScreenshotIndex}
            screenshots={screenshots}
          />
        )}

        {lightboxIndex !== null && (
          <ScreenshotLightbox
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onSelect={handleLightboxSelect}
            projectName={project.name}
            screenshots={screenshots}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <button
        type="button"
        onClick={openLightbox}
        disabled={!hasScreenshots || Boolean(project.videoUrl)}
        aria-label={
          hasScreenshots && !project.videoUrl
            ? `Open ${project.name} screenshots`
            : `${project.name} preview`
        }
        className="relative w-full h-[min(52vh,28rem)] sm:h-[min(56vh,32rem)] lg:h-[min(60vh,36rem)] overflow-hidden rounded-2xl border border-white/10 glass-morphism bg-white/5 text-left transition duration-200 hover:border-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text disabled:cursor-default"
      >
        {project.videoUrl ? (
          <VideoPreview
            src={project.videoUrl}
            className="w-full h-full object-cover"
          />
        ) : screenshot ? (
          <FadeImage
            src={screenshot.src}
            alt={screenshot.label || `${project.name} screenshot`}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={screenshotIndex === 0}
            className="object-contain p-3 md:p-4"
          />
        ) : project.image ? (
          <FadeImage
            src={project.image}
            alt={`${project.name} preview`}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-contain p-3 md:p-4"
          />
        ) : (
          <EmptyMediaState
            message="No project image is available for this project yet."
          />
        )}
      </button>

      {!project.videoUrl && hasScreenshots && (
        <ScreenshotControls
          currentIndex={safeScreenshotIndex}
          onSelect={setScreenshotIndex}
          screenshots={screenshots}
        />
      )}

      {livePreviewHref && (
        <div className="flex justify-start">
          <Button
            variant="outline"
            size="sm"
            className="glass-morphism bg-transparent text-primary-text/75 hover:text-primary-text"
            asChild
          >
            <a href={livePreviewHref} target="_blank" rel="noopener noreferrer">
              Open Live Preview
            </a>
          </Button>
        </div>
      )}

      {lightboxIndex !== null && (
        <ScreenshotLightbox
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onSelect={handleLightboxSelect}
          projectName={project.name}
          screenshots={screenshots}
        />
      )}
    </div>
  );
}
