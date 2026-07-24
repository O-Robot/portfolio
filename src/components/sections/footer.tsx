"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      className=" bottom-0 w-full bg-background  px-10 py-4 flex justify-center items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <div className=" text-center container ">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="text-primary-text">© 2025 Ogooluwani Adewale.</div>
        </div>
      </div>
    </motion.div>
  );
}
