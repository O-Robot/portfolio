"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
    <div className="flex flex-col items-center justify-center gap-2">
      {screenshots[currentIndex].label && (
        <span className="text-sm font-medium text-primary-text/75 text-center">
          {screenshots[currentIndex].label}
        </span>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelect(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          aria-label="Show previous screenshot"
          className="p-1.5 rounded-full glass-morphism disabled:opacity-30 cursor-pointer hover:opacity-80 transition"
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
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                index === currentIndex
                  ? "bg-primary-text scale-125"
                  : "bg-primary-text/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => onSelect(Math.min(screenshots.length - 1, currentIndex + 1))}
          disabled={currentIndex === screenshots.length - 1}
          aria-label="Show next screenshot"
          className="p-1.5 rounded-full glass-morphism disabled:opacity-30 cursor-pointer hover:opacity-80 transition"
        >
          <ChevronRight className="w-4 h-4 text-primary-text" />
        </button>
      </div>
    </div>
  );
}

function VideoPreview({
  className,
  src,
}: {
  className: string;
  src: string;
}) {
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

function EmptyMediaState({ message }: { message: string }) {
  return (
    <div className="w-full min-h-72 rounded-2xl border border-white/10 glass-morphism flex items-center justify-center text-center p-6 text-primary-text/60">
      <p>{message}</p>
    </div>
  );
}

export default function ProjectMediaPanel({
  project,
}: {
  project: ProjectItem;
}) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const screenshots = project.screenshots ?? [];
  const hasScreenshots = screenshots.length > 0;
  const screenshot = hasScreenshots ? screenshots[screenshotIndex] : null;
  const livePreviewHref = project.previewUrl || project.url;

  if (isMobileProject(project)) {
    return (
      <div className="flex flex-col items-center gap-4 w-full md:w-auto">
        <PhoneFrame>
          {project.videoUrl ? (
            <VideoPreview src={project.videoUrl} className="w-full h-full object-cover" />
          ) : screenshot ? (
            <Image
              src={screenshot.src}
              alt={screenshot.label || `${project.name} mobile preview`}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary-text/60 text-sm text-center p-4">
              No mobile preview available.
            </div>
          )}
        </PhoneFrame>

        {!project.videoUrl && hasScreenshots && (
          <ScreenshotControls
            currentIndex={screenshotIndex}
            onSelect={setScreenshotIndex}
            screenshots={screenshots}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 glass-morphism min-h-72 md:min-h-[26rem]">
        {project.videoUrl ? (
          <VideoPreview src={project.videoUrl} className="w-full h-full object-cover" />
        ) : screenshot ? (
          <Image
            src={screenshot.src}
            alt={screenshot.label || `${project.name} screenshot`}
            fill
            className="object-cover object-top"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            className="object-cover object-top"
          />
        ) : (
          <EmptyMediaState message="No project media available." />
        )}
      </div>

      {!project.videoUrl && hasScreenshots && (
        <ScreenshotControls
          currentIndex={screenshotIndex}
          onSelect={setScreenshotIndex}
          screenshots={screenshots}
        />
      )}

      {livePreviewHref && (
        <div className="flex justify-start">
          <Button variant="outline" size="sm" className="glass-morphism bg-transparent" asChild>
            <a href={livePreviewHref} target="_blank" rel="noopener noreferrer">
              Open Live Preview
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
