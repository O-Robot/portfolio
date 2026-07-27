import { event } from "@/utils/gtag";
import { Icon } from "@iconify/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type {
  MobileProjectItem,
  MobileScreenshot,
  ProjectLanguage,
} from "@/types/portfolio";

//! my phone frame
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-49.75 h-107 shrink-0" aria-hidden="true">
      {/* Shell */}
      <div className="absolute inset-0 rounded-[2.2rem] border-[6px] border-white/20 bg-[#111] shadow-xl shadow-black/40" />
      {/* Side buttons */}
      <div className="absolute -left-1.75 top-16 w-1 h-8 bg-primary-text/15 rounded-l-sm" />
      <div className="absolute -left-1.75 top-28 w-1 h-6 bg-primary-text/15 rounded-l-sm" />
      <div className="absolute -right-1.75 top-20 w-1 h-10 bg-primary-text/15 rounded-r-sm" />
      {/* Notch */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-[#111] rounded-full z-20" />
      {/* Screen */}
      <div className="absolute inset-1.25 rounded-[1.8rem] overflow-hidden bg-background z-10">
        {children}
      </div>
      {/* Home bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-primary-text/25 rounded-full z-20" />
    </div>
  );
}

function VideoPreview({ src }: { src: string }) {
  return (
    <video
      src={src}
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      controls
      controlsList="nodownload"
      playsInline
    />
  );
}

function ScreenshotPreview({
  screenshots,
  index,
}: {
  screenshots: MobileScreenshot[];
  index: number;
}) {
  return (
    <Image
      src={screenshots[index].src}
      alt={screenshots[index].label || "Mobile Project"}
      fill
      className="object-cover object-top"
    />
  );
}

function CtaButton({
  href,
  icon,
  label,
  analyticsLabel,
  projectName,
}: {
  href: string;
  icon: string;
  label: string;
  analyticsLabel: string;
  projectName: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        event({ action: "click", category: analyticsLabel, label: projectName })
      }
      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg glass-morphism 
                 text-primary-text text-xs hover:opacity-80 transition border border-white/10"
    >
      <Icon icon={icon} className="w-4 h-4" />
      {label}
    </a>
  );
}

//! mobile preview modal
export default function MobilePreview({ project }: { project: MobileProjectItem }) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const screenshots = project.screenshots || [];
  const hasScreenshots = screenshots.length > 0;

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 h-full w-full p-2 md:p-4 items-center md:justify-center overflow-y-auto z-20">
      {/* Phone preview */}
      <div className="flex flex-col items-center gap-4">
        <PhoneFrame>
          {project.videoUrl ? (
            <VideoPreview src={project.videoUrl} />
          ) : hasScreenshots ? (
            <ScreenshotPreview
              screenshots={screenshots}
              index={screenshotIndex}
            />
          ) : (
            "No attached app"
          )}
        </PhoneFrame>
        {/* Screenshot navigation */}
        {hasScreenshots && !project.videoUrl && screenshots.length > 1 && (
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">
              {screenshots[screenshotIndex].label}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScreenshotIndex((i) => Math.max(0, i - 1))}
                disabled={screenshotIndex === 0}
                aria-label="Show previous screenshot"
                className="p-1.5 rounded-full glass-morphism disabled:opacity-30 cursor-pointer hover:opacity-80 transition"
              >
                <ChevronLeft className="w-4 h-4 text-primary-text" />
              </button>

              {/* Dots */}
              <div className="flex gap-1.5">
                {screenshots.map((_: MobileScreenshot, i: number) => (
                  <button
                    key={i}
                    onClick={() => setScreenshotIndex(i)}
                    aria-label={`Show screenshot ${i + 1}`}
                    aria-current={i === screenshotIndex}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      i === screenshotIndex
                        ? "bg-primary-text scale-125"
                        : "bg-primary-text/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setScreenshotIndex((i) =>
                    Math.min(screenshots.length - 1, i + 1),
                  )
                }
                disabled={screenshotIndex === screenshots.length - 1}
                aria-label="Show next screenshot"
                className="p-1.5 rounded-full glass-morphism disabled:opacity-30 cursor-pointer hover:opacity-80 transition"
              >
                <ChevronRight className="w-4 h-4 text-primary-text" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info panel */}
      <div className="flex flex-col gap-5 max-w-xs">
        <div>
          <h3 className="text-primary-text font-bold text-2xl">
            {project.name}
          </h3>
          {project.createdAt && (
            <p className="text-xs text-primary/80 mt-1">{project.createdAt}</p>
          )}
          <p className="mt-3 text-primary-text/70 text-sm leading-relaxed">
            {project.description || "No description available."}
          </p>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {project.languages.map((lang: ProjectLanguage, i: number) => (
            <span
              key={i}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-white text-xs text-[#231942]"
            >
              <Icon icon={lang.iconifyClass} className="w-4 h-4" />
              {lang.name}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.devicePreview && (
            <CtaButton
              href={project.devicePreview}
              icon="mdi:android"
              label="View Application"
              analyticsLabel="Device Preview"
              projectName={project.name}
            />
          )}
          {project.apkUrl && (
            <CtaButton
              href={project.apkUrl}
              icon="mdi:android"
              label="Download APK"
              analyticsLabel="APK Download"
              projectName={project.name}
            />
          )}
          {project.expoUrl && (
            <CtaButton
              href={project.expoUrl}
              icon="simple-icons:expo"
              label="Open in Expo"
              analyticsLabel="Expo Link Clicked"
              projectName={project.name}
            />
          )}
          {project.figmaUrl && (
            <CtaButton
              href={project.figmaUrl}
              icon="simple-icons:figma"
              label="View in Figma"
              analyticsLabel="Figma Link Clicked"
              projectName={project.name}
            />
          )}
          {project.url && (
            <CtaButton
              href={project.url}
              icon="mdi:github"
              label="View Repo"
              analyticsLabel="Repo Link Clicked"
              projectName={project.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
