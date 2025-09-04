"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Link2, X } from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { event } from "@/utils/gtag";

export default function Projects({ projectsData }: any) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  return (
    <div className="relative">
      <div
        className="grid gap-7 w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gridAutoRows: "max-content",
        }}
      >
        {projectsData.map((project: any, index: any) => (
          <Tilt
            key={index}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1}
            transitionSpeed={450}
            className="bg-background/30 shadow shadow-skill-text/40 p-5 rounded-xl "
          >
            {/* Project preview / link */}
            <div className="relative w-full h-[230px]">
              <Image
                src={project?.image || "/images/logo.png"}
                alt="project_image"
                className="w-full h-full object-cover object-left-center rounded-2xl cursor-pointer z-10"
                width={1300}
                height={50}
                onClick={() => {
                  setSelectedItem(
                    selectedItem === project.id ? null : project.id
                  );
                  event({
                    action: "click",
                    category: "Project Frame Clicked",
                    label: project.name,
                  });
                }}
              />
              <div className="absolute inset-0 flex justify-end m-3 pointer-events-none">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.url, "_blank");
                    event({
                      action: "click",
                      category: "Project Link Clicked",
                      label: project.name,
                    });
                  }}
                  className="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto"
                >
                  <Link2 />
                </div>
              </div>
            </div>

            {/* Title + description */}
            <div className="mt-5">
              <h3 className="text-primary-text font-bold text-[20px]">
                {project.name}
              </h3>
              <p className="mt-2 text-primary-text/70 text-[14px]">
                {project.description || "No description available."}
              </p>
              {project.createdAt && (
                <p className="mt-1 text-xs text-primary/80">
                  {project.createdAt}
                </p>
              )}
            </div>

            {/* Languages */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.languages.map((lang: any, i: any) => (
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
        ))}
      </div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center overflow-hidden justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-morphism rounded-lg p-4  md:p-6 lg:p-8  w-full overflow-y-auto bg-white/5 shadow-lg"
            >
              {(() => {
                const item = projectsData.find(
                  (i: any) => i.id === selectedItem
                );
                if (!item) return null;

                return (
                  <div className="relative h-[80vh] rounded-2xl overflow-hidden  flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center p-3 border-b flex-shrink-0">
                      <h2 className="text-lg font-semibold text-primary-text">
                        {item?.name} Preview
                      </h2>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="p-2 rounded-full hover:bg-link-active hover:text-white text-primary-text cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Iframe Viewer */}
                    <div className="relative flex-1 overflow-y-auto">
                      {isLoading && !item.isFork && (
                        <div className="absolute inset-0 flex justify-center items-center bg-background">
                          <p>Loading {item.name}...</p>
                        </div>
                      )}

                      {!item.isFork ? (
                        <iframe
                          src={item.url}
                          className="w-full h-full border-0"
                          onLoad={() => setIsLoading(false)}
                          title={item.name}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col justify-center items-center h-full text-center p-4 gap-6">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={900}
                            height={500}
                          />
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 glass-morphism text-primary rounded transition"
                          >
                            View Live Site
                          </a>
                        </div>
                      )}
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
