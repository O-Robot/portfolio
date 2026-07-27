"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Calendar, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AccessibleDialog from "../ui/accessible-dialog";
import type { ExperienceItem, TimelineItem, WorkMode } from "@/types/portfolio";

function isExperienceItem(item: TimelineItem): item is ExperienceItem {
  return "type" in item;
}

function formatEmploymentType(type?: ExperienceItem["type"]) {
  const labels: Record<string, string> = {
    work: "Work",
    "full-time": "Full-time",
    "part-time": "Part-time",
    freelance: "Freelance",
    contract: "Contract",
    intern: "Internship",
    volunteership: "Volunteership",
  };

  return type ? (labels[type] ?? type) : null;
}

function formatWorkMode(mode?: WorkMode) {
  const labels: Record<WorkMode, string> = {
    remote: "Remote",
    hybrid: "Hybrid",
    onsite: "Onsite",
  };

  return mode ? (labels[mode] ?? mode) : null;
}

function getCompactEmploymentLabel(type?: ExperienceItem["type"]) {
  const compactTypes = [
    "work",
    "full-time",
    "part-time",
    "freelance",
    "contract",
  ];

  if (!type || !compactTypes.includes(type)) {
    return null;
  }

  return formatEmploymentType(type);
}

function getModalEmploymentLabel(item: {
  type?: ExperienceItem["type"];
  workMode?: WorkMode;
}) {
  const employmentType = formatEmploymentType(item.type);
  const workMode = formatWorkMode(item.workMode);

  if (employmentType && workMode) {
    return `${employmentType} ${workMode}`;
  }

  return employmentType ?? workMode ?? null;
}

export default function Timeline({ timelineData }: { timelineData: TimelineItem[] }) {
  const [selectedItem, setSelectedItem] = useState<TimelineItem["id"] | null>(null);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-linear-to-b from-primary/60 to-primary rounded-full" />

      <div className="space-y-8 md:space-y-12">
        {timelineData.map((item, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative flex items-center"
          >
            {/* Image on Timeline */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              className="absolute left-8 md:left-1/2 transform -translate-x-1/2 md:transform md:-translate-x-1/2 z-10"
            >
              <div className="w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 rounded-full border-2 md:border-4 border-primary/20 overflow-hidden shadow-2xl ring-2 md:ring-4 ring-primary/30 backdrop-blur-sm bg-white flex justify-center items-center">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${item.company}`}
                  >
                    <Image
                      src={item?.image}
                      alt={`${item.company} logo`}
                      height={50}
                      width={50}
                      className="object-contain cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12"
                    />
                  </a>
                ) : (
                  <Image
                    src={item?.image}
                    alt={`${item.company} logo`}
                    height={50}
                    width={50}
                    className="object-contain w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12"
                  />
                )}
              </div>
            </motion.div>

            {/* Content Card */}
            <div
              className={`w-full md:w-1/2 ${
                // Mobile: always left-aligned with padding from timeline
                // Desktop: alternating sides
                index % 2 === 0
                  ? "pl-20 md:pl-0 md:pr-8 lg:pr-16"
                  : "pl-20 md:pl-8 lg:pl-16 md:ml-auto"
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                type="button"
                onClick={() =>
                  setSelectedItem(selectedItem === item.id ? null : item.id)
                }
                className="cursor-pointer w-full text-left rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
                aria-haspopup="dialog"
                aria-expanded={selectedItem === item.id}
                aria-controls={`timeline-dialog-${item.id}`}
              >
                <Card className="glass-morphism border border-white/20 transition-all duration-300 backdrop-blur-sm bg-white/5">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 text-link-active shrink-0" />
                      <span className="text-link-active font-semibold text-sm md:text-base">
                        {item.year}
                      </span>
                      {isExperienceItem(item) &&
                        getCompactEmploymentLabel(item.type) && (
                        <Badge className="bg-white/10 text-skill-text border border-white/20 text-[10px] md:text-xs">
                          {getCompactEmploymentLabel(item.type)}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-skill-text mb-2 leading-tight">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <BriefcaseBusiness className="h-3 w-3 md:h-4 md:w-4 text-skill-text shrink-0" />
                      <span className="text-skill-text/80 text-sm md:text-base truncate">
                        {item.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 text-skill-text shrink-0" />
                      <span className="text-skill-text/60 text-sm md:text-base">
                        {item.location}
                      </span>
                    </div>

                    <p className="text-skill-text/70 mb-4 text-sm md:text-base line-clamp-3 md:line-clamp-none">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {item.technologies.map((tech: string) => (
                        <Badge
                          key={tech}
                          className="bg-white/10 text-skill-text border border-white/20 hover:bg-white/20 transition-colors text-xs md:text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <AccessibleDialog
            labelledBy={`timeline-dialog-title-${selectedItem}`}
            describedBy={`timeline-dialog-description-${selectedItem}`}
            onClose={() => setSelectedItem(null)}
            panelClassName="max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto p-4 md:p-6 lg:p-8"
          >
            {(() => {
              const item = timelineData.find((entry) => entry.id === selectedItem);
              if (!item) return null;

              return (
                <div id={`timeline-dialog-${item.id}`}>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-link-active shrink-0" />
                        <span className="text-link-active font-semibold text-sm md:text-base">
                          {item.year}
                        </span>
                      </div>
                      <h3
                        id={`timeline-dialog-title-${item.id}`}
                        className="text-xl md:text-2xl font-bold text-skill-text leading-tight"
                      >
                        {item.title}
                      </h3>
                      <div className="flex items-start gap-2">
                        <BriefcaseBusiness className="h-4 w-4 text-skill-text shrink-0 mt-0.5" />
                        <span className="text-skill-text/80 text-sm md:text-base">
                          {item.company}, {item.location}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      aria-label={`Close ${item.title} details`}
                      className="p-2 rounded-full hover:bg-link-active hover:text-white text-primary-text cursor-pointer transition"
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  <p
                    id={`timeline-dialog-description-${item.id}`}
                    className="text-skill-text/70 mb-6 text-sm md:text-base leading-relaxed"
                  >
                    {item.description}
                  </p>

                  {isExperienceItem(item) && getModalEmploymentLabel(item) && (
                    <>
                      <h4 className="text-base md:text-lg font-semibold text-primary mb-3">
                        Employment Type:
                      </h4>
                      <div className="mb-6">
                        <Badge
                          variant="secondary"
                          className="glass-morphism text-skill-text text-xs md:text-sm"
                        >
                          {getModalEmploymentLabel(item)}
                        </Badge>
                      </div>
                    </>
                  )}

                  <h4 className="text-base md:text-lg font-semibold text-primary mb-3">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {item.achievements.map((achievement: string, i: number) => (
                      <li
                        key={i}
                        className="text-skill-text/70 flex text-sm md:text-base"
                      >
                        <span className="shrink-0 w-2 h-2 bg-accent rounded-full mt-2 mr-3" />
                        <span className="flex-1 leading-relaxed">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-base md:text-lg font-semibold text-primary mb-3">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {item.technologies?.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="glass-morphism text-skill-text text-xs md:text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="mt-6 md:hidden w-full py-2 px-4 bg-primary/20 text-primary rounded-lg font-medium"
                  >
                    Close
                  </button>
                </div>
              );
            })()}
          </AccessibleDialog>
        )}
      </AnimatePresence>
    </div>
  );
}
