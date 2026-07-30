"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { cn } from "@/utils/constants";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

interface AccessibleDialogProps {
  children: React.ReactNode;
  describedBy?: string;
  labelledBy: string;
  onClose: () => void;
  panelClassName?: string;
  panelRef?: React.RefObject<HTMLDivElement | null>;
}

export default function AccessibleDialog({
  children,
  describedBy,
  labelledBy,
  onClose,
  panelClassName,
  panelRef,
}: AccessibleDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const shellElements = ["site-header", "main-content", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    shellElements.forEach((element) => {
      element.setAttribute("aria-hidden", "true");
      element.inert = true;
    });

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTORS,
    );
    const initialFocusTarget =
      focusableElements && focusableElements.length > 0
        ? focusableElements[0]
        : dialogRef.current;

    initialFocusTarget?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const currentFocusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      );

      if (currentFocusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      shellElements.forEach((element) => {
        element.removeAttribute("aria-hidden");
        element.inert = false;
      });
      previouslyFocusedElement.current?.focus();
    };
  }, [onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        ref={(node) => {
          dialogRef.current = node;
          if (panelRef) {
            panelRef.current = node;
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "glass-morphism rounded-lg bg-white/5 shadow-lg focus:outline-none",
          panelClassName,
        )}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
