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
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/60 to-primary rounded-full" />

      <div className="space-y-12">
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
              className="absolute left-1/2 transform -translate-x-1/2 z-10"
            >
              <div className="w-20 h-20 rounded-full border-4 border-primary/20 overflow-hidden shadow-2xl ring-4 ring-primary/30 backdrop-blur-sm bg-white flex justify-center items-center">
                <Image
                  src={item?.image}
                  alt="me"
                  height={50}
                  width={50}
                  className="object-contain "
                />
              </div>
            </motion.div>

            {/* Content Card */}
            <div
              className={`w-1/2 ${index % 2 === 0 ? "pr-16" : "pl-16 ml-auto"}`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  setSelectedItem(selectedItem === item.id ? null : item.id)
                }
                className="cursor-pointer"
              >
                <Card className="glass-morphism border border-white/20 transition-all duration-300 backdrop-blur-sm bg-white/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-link-active" />
                      <span className="text-link-active font-semibold">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-skill-text mb-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <BriefcaseBusiness className="h-4 w-4 text-skill-text" />
                      <span className="text-skill-text/80">{item.company}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-skill-text" />
                      <span className="text-skill-text/60">
                        {item.location}
                      </span>
                    </div>

                    <p className="text-skill-text/70 mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech: any) => (
                        <Badge
                          key={tech}
                          className="bg-white/10 text-skill-text border border-white/20 hover:bg-white/20 transition-colors"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-morphism rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              {(() => {
                const item = timelineData.find(
                  (i: any) => i.id === selectedItem
                );
                if (!item) return null;

                return (
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-white/80 mb-6">{item.description}</p>

                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {item.achievements.map((achievement: any, i: any) => (
                        <li key={i} className="text-white/70 flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech: any) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-white/10 text-white"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
