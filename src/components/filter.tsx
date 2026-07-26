"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface FilterOption {
  id: string;
  label: string;
  icon?: string;
}

interface FilterProps {
  filters: FilterOption[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function Filter({
  filters,
  selectedFilter,
  onFilterChange,
}: FilterProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-4"
      role="toolbar"
      aria-label="Filter content"
    >
      {filters.map((filter) => (
        <motion.div
          key={filter.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedFilter === filter.id ? "default" : "outline"}
            onClick={() => onFilterChange(filter.id)}
            aria-pressed={selectedFilter === filter.id}
            className={`glass-morphism border-white/20 cursor-pointer transition-all ${
              selectedFilter === filter.id
                ? "bg-link-active text-primary-text border-link-active shadow-lg shadow-link-active/20"
                : "bg-transparent text-link-inactive hover:text-link-active"
            }`}
          >
            {filter.icon && <span className="mr-2">{filter.icon}</span>}
            {filter.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
