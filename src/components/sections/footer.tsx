"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <div className=" bottom-0 w-full bg-black border-t border-white/10  px-10 py-4 flex justify-center items-center">
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className=" text-center container "
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/60">
            © 2025 Ogooluwani Adewale. Crafted with ❤️ and cutting-edge tech.
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
            <span className="text-white/40 text-sm">
              Powered by Next.js & Three.js
            </span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
