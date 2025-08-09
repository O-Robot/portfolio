"use client";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function AboutPage() {
  const { theme } = useStore();

  // socialMediaLinks.ts
  const socialMediaLinks = [
    {
      name: "Github",
      link: "https://github.com/O-Robot",
      icon: "simple-icons:github", // Iconify Simple Icons format
      color: "#181717", // From https://simpleicons.org
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/adewale-ogooluwani",
      icon: "simple-icons:linkedin",
      color: "#0077B5",
    },
    {
      name: "Gmail",
      link: "mailto:hey@ogooluwaniadewale.com",
      icon: "simple-icons:gmail",
      color: "#D14836",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/ogzy_robot",
      icon: "simple-icons:twitter",
      color: "#1DA1F2",
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/ogzy.robot/",
      icon: "simple-icons:facebook",
      color: "#1877F2",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/ogzy.robot/",
      icon: "simple-icons:instagram",
      color: "#E4405F",
    },
    {
      name: "Behance",
      link: "https://www.behance.net/ogooluwaniadewale",
      icon: "simple-icons:behance",
      color: "#053eff",
    },
    {
      name: "Dribbble",
      link: "https://dribbble.com/O-Robot",
      icon: "simple-icons:dribbble",
      color: "#ea4c89",
    },
  ];

  return (
    <section className={`${theme === "dark" ? "bg-black" : "bg-black/20"}`}>
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">
              About Me
            </h2>
            {/* <p className="text-xl text-white/80 max-w-3xl mx-auto">
              I&apos;m a creative technologist who bridges the gap between
              design and development, crafting digital experiences that push the
              boundaries of what&apos;s possible on the web.
            </p> */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" mb-16 flex gap-10 justify-between px-10"
          >
            <div className="text-xl text-justify  text-white/80 w-1/2">
              👋 Hey there! I am John Doe, 🎓 a proud graduate of Engineering
              College, where I am pursuing a Bachelors degree in Electronics and
              Communication Engineering and building a solid foundation in
              technology.
              <br />
              <br />
              💻 I am also an avid developer, enthusiastic volunteer, and public
              speaker, and I love exploring new opportunities and avenues.{" "}
              <br />
              <br />
              🎮 As a self-taught developer, I have spent countless hours
              sharpening my skills and learning new techniques to bring my ideas
              to life.
              <br />
              <br />
              🎉 I am proud to be a 100% attendance holder in both school and
              college, till 2nd year. I take my education seriously and love
              learning about new topics, especially when it comes to nuclear
              technology 💥. <br />
              <br />
              🧩 In my free time, I love to solve puzzles and brain teasers,
              which helps me stay sharp and keep my problem-solving skills on
              point. I am also a big fan of learning myths and legends from
              around the world 🌍, which gives me a glimpse into different
              cultures and traditions. <br />
              <br />
              🙌 Beyond my personal pursuits, I am committed to making a
              positive impact in my community. I love volunteering with local
              organizations and provide educational resources to underprivileged
              kids 📚 . Its amazing to see the impact that even a small amount
              of time and effort can have on someones life. <br />
              <br />
              💪 So if you are looking for someone who is hardworking, authentic
              and always up for a good challenge, look no further than yours
              truly! Lets connect and see how we can make a difference together
              🤝.
            </div>
            <div className="text-xl text-white/80 w-1/2 px-8 flex flex-col gap-8">
              <Image
                src={"/images/raw.png"}
                alt="me"
                height={100}
                width={400}
                className="rounded-2xl"
              />

              <div className="border-t border-b  py-4 flex gap-3">
                {socialMediaLinks.map((media, i) => (
                  <a
                    key={i}
                    href={media.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={media.name}
                    className="text-white rounded-full cursor-pointer text-xl w-10 h-10 flex justify-center items-center"
                    style={{ background: media.color }}
                  >
                    <Icon
                      icon={media.icon}
                      className="  transition-transform hover:scale-110"
                    />
                  </a>
                ))}
              </div>
              <div className="rounded-xl flex justify-center flex-col px-4 py-6 max-w-100 bg-[#070d1e]items-center text-center gap-4">
                <p className="text-[#a9a9a9] text-lg">
                  Let’s connect and build something awesome together.
                </p>
                <p className="text-sm">Send me a message!</p>
                <Button variant={"outline"}>Contact</Button>
              </div>
            </div>
          </motion.div>{" "}
        </div>
      </section>
    </section>
  );
}
