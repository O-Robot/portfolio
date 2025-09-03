"use client";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Timeline({ timelineData }: any) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/60 to-primary rounded-full" />

      <div className="space-y-8 md:space-y-12">
        {timelineData.map((item: any, index: any) => (
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
                <a
                  href={item.link ? item.link : "#"}
                  target={item.link ? "_blank" : ""}
                  rel="noopener noreferrer"
                >
                  <Image
                    src={item?.image}
                    alt="me"
                    height={50}
                    width={50}
                    className="object-contain cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12"
                  />
                </a>
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  setSelectedItem(selectedItem === item.id ? null : item.id)
                }
                className="cursor-pointer"
              >
                <Card className="glass-morphism border border-white/20 transition-all duration-300 backdrop-blur-sm bg-white/5">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 text-link-active flex-shrink-0" />
                      <span className="text-link-active font-semibold text-sm md:text-base">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-skill-text mb-2 leading-tight">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <BriefcaseBusiness className="h-3 w-3 md:h-4 md:w-4 text-skill-text flex-shrink-0" />
                      <span className="text-skill-text/80 text-sm md:text-base truncate">
                        {item.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 text-skill-text flex-shrink-0" />
                      <span className="text-skill-text/60 text-sm md:text-base">
                        {item.location}
                      </span>
                    </div>

                    <p className="text-skill-text/70 mb-4 text-sm md:text-base line-clamp-3 md:line-clamp-none">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {item.technologies.map((tech: any) => (
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
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-morphism rounded-lg p-4 md:p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto bg-white/5 shadow-lg"
            >
              {(() => {
                const item = timelineData.find(
                  (i: any) => i.id === selectedItem
                );
                if (!item) return null;

                return (
                  <div>
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-link-active flex-shrink-0" />
                        <span className="text-link-active font-semibold text-sm md:text-base">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-skill-text leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-start gap-2">
                        <BriefcaseBusiness className="h-4 w-4 text-skill-text flex-shrink-0 mt-0.5" />
                        <span className="text-skill-text/80 text-sm md:text-base">
                          {item.company}, {item.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-skill-text/70 mb-6 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>

                    <h4 className="text-base md:text-lg font-semibold text-primary mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {item.achievements.map((achievement: any, i: number) => (
                        <li
                          key={i}
                          className="text-skill-text/70 flex text-sm md:text-base"
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2 mr-3" />
                          <span className="flex-1 leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {item.technologies?.map((tech: any) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="glass-morphism text-skill-text text-xs md:text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Close button for mobile */}
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="mt-6 md:hidden w-full py-2 px-4 bg-primary/20 text-primary rounded-lg font-medium"
                    >
                      Close
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
