"use client";
import LiveGitHub from "@/components/live-github-widget";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { Link2 } from "lucide-react";

type Stats = {
  totalStars: number;
  totalCommits: number;
  recentActivity: { repo: string; message: string; date: string }[];
};

export default function ProjectsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { theme } = useStore();

  useEffect(() => {
    fetch("/api/github-stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);
  console.log(stats);

  const data = [
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "OGAMB Website",
      createdAt: "November 2023",
      url: "https://ogamb.com.ng/",
      description:
        "The website for Ogun State Alternate Medicine Board. Visit the website here ",
      isFork: false,
      languages: [
        { name: "Wordpress", iconifyClass: "fa-wordpress" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "PHP", iconifyClass: "logos-php" },
        { name: "JavaScript", iconifyClass: "logos-javascript" },
      ],
      image: "/images/projects/ogamb.png",
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "SunSolar Dashboard",
      createdAt: "September 2023",
      url: "https://sun-solar.vercel.app/",
      description: "The dashboard for Investment. Visit the website here ",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "JavaScript", iconifyClass: "logos-javascript" },
        { name: "React", iconifyClass: "vscode-icons:file-type-reactts" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "PlugIt Dashboard",
      createdAt: "May 2023",
      url: "https://plugit-dashboard.vercel.app/",
      description:
        "The dashboard for PlugIt Automation. Visit the website here ",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "JavaScript", iconifyClass: "logos-javascript" },
        { name: "React", iconifyClass: "vscode-icons:file-type-reactts" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "PlugIt Website",
      createdAt: "March 2023",
      url: "https://landing-page-rho-sandy.vercel.app/",
      description: "The website for PlugIt Automation. Visit the website here ",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "JavaScript", iconifyClass: "logos-javascript" },
        { name: "React", iconifyClass: "vscode-icons:file-type-reactts" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "Audit & Systems Solutions",
      createdAt: "November 2022",
      url: "https://itauditsolution.ng",
      description:
        "The website for Audit & Systems Solutions. Visit the website here ",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "JavaScript", iconifyClass: "logos-javascript" },
        { name: "React", iconifyClass: "vscode-icons:file-type-reactts" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "Boxin Logistics",
      createdAt: "May 2021",
      url: "https://boxin.ng/",
      description: "The website for Boxin Logistics. Visit the website here ",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "JavaScript", iconifyClass: "logos-javascript" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "Boxin Store",
      createdAt: "May 2022",
      url: "http://20.119.67.205:8000/",
      description:
        "Online Store for Boxin users. The site is Unique to each particular store owner ",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "Sass", iconifyClass: "logos-sass" },
        { name: "React", iconifyClass: "vscode-icons:file-type-reactts" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "AA Magazine",
      createdAt: "June 2022",
      url: "https://aamagazine.net",
      description:
        "The website for AA Magazine where Users can read news and also subscribe to read premium magazines. Visit the website here ",
      isFork: false,
      languages: [{ name: "Wordpress", iconifyClass: "fa-wordpress" }],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "The LightGivers Foundation",
      createdAt: "October 2022",
      url: "https://thelightgivers.org",
      description:
        "The website for The LightGiversHumanitarian Foundation with multi-currency donations capabilities. Visit the website here ",
      isFork: false,
      languages: [
        { name: "Wordpress", iconifyClass: "fa-wordpress" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "PHP", iconifyClass: "logos-php" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNjkwNzUwMjM=",
      name: "My Portfolio Site",
      createdAt: "January 2021",
      url: "https://ogooluwaniadewale.com",
      description: "My Portfolio website. Visit the website here",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "React", iconifyClass: "vscode-icons:file-type-reactts" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNzM1MTI1NTE=",
      name: "DP Creator",
      createdAt: "June 2020",
      url: "https://dpcreator.netlify.app/",
      description:
        "A Display Picture creator for Online Seminars and Conferences. Click to view",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "JavaScript", iconifyClass: "logos-javascript" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNzM1MTI1NTE=",
      name: "Online Calculator",
      createdAt: "April 2022",
      url: "https://o-robot.github.io/online-calculator/",
      description: "A Basic Calculator WebApp using React JS. Click to view",
      isFork: false,
      languages: [
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "CSS", iconifyClass: "logos-css-3" },
        { name: "React", iconifyClass: "vscode-icons:file-type-reactts" },
      ],
    },

    {
      id: "MDEwOlJlcG9zaXRvcnkyMDIxNDc4ODA=",
      name: "Graphics Design Portfolio",
      createdAt: "",
      url: "https://drive.google.com/drive/folders/1qSKTqEuMO3WixSqvq5FJLugPlX2ORdbH?usp=sharing",
      description: "",
      isFork: false,
      languages: [
        { name: "Corel Draw", iconifyClass: "file-icons:coreldraw-alt" },
        {
          name: "Photoshop",
          iconifyClass: "vscode-icons:file-type-photoshop2",
        },
        { name: "Illustrator", iconifyClass: "vscode-icons:file-type-ai2" },
        { name: "Canva", iconifyClass: "simple-icons:canva" },
      ],
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkxODIxMjk3NTQ=",
      name: "Motion Design Portfolio",
      createdAt: "",
      url: "https://drive.google.com/drive/folders/17SY1VTVE6VePs6VInHEdlNh4GrDS7WD9?usp=sharing",
      description: "",
      isFork: false,
      languages: [
        {
          name: "After Effects",
          iconifyClass: "logos:adobe-after-effects",
        },
        { name: "After Premiere Pro", iconifyClass: "logos:adobe-premiere" },
      ],
    },
  ];

  return (
    <section className={`${theme === "dark" ? "bg-black" : "bg-black/20"}`}>
      <section id="projects" className="py-32 relative  ">
        <div className="container  mx-auto px-6">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">
              My Projects Journey
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              A showcase of ideas brought to life — exploring creativity,
              problem-solving, and innovation through code
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className={`relative z-0 gap-7 flex justify-center`}
          >
            <div className="flex flex-wrap gap-7 justify-start max-w-[calc(360px*3+2*28px)]">
              {data.map((project, _) => (
                <Tilt
                  key={_}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1}
                  transitionSpeed={450}
                  className="bg-purple-500 p-5 rounded-2xl w-[360px]"
                >
                  {/* Project preview / link */}
                  <div className="relative w-full h-[230px]">
                    <Image
                      src={project?.image || "/images/logo.png"}
                      alt="project_image"
                      className="w-full h-full object-cover object-left-center rounded-2xl"
                      width={1300}
                      height={50}
                    />
                    <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                      <div
                        onClick={() => window.open(project.url, "_blank")}
                        className="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                      >
                        <Link2 />
                      </div>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="mt-5">
                    <h3 className="text-white font-bold text-[20px]">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-secondary text-[14px]">
                      {project.description || "No description available."}
                    </p>
                    {project.createdAt && (
                      <p className="mt-1 text-xs text-gray-300">
                        {project.createdAt}
                      </p>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 text-xs text-white"
                      >
                        <Icon icon={lang.iconifyClass} className="w-4 h-4" />
                        {lang.name}
                      </span>
                    ))}
                  </div>
                </Tilt>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16 px-6"
          >
            <LiveGitHub />
          </motion.div>
        </div>
      </section>
    </section>
  );
}
