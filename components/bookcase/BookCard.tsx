"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MenuMeta } from "@/types/menu";
import { BASE_PATH } from "@/lib/basePath";

interface BookCardProps {
  menu: MenuMeta;
  href: string;
  logoUrl?: string;
}

export default function BookCard({ menu, href, logoUrl }: BookCardProps) {
  const bookColor = menu.color || "#00C4B3";

  return (
    <Link href={href} className="flex justify-center">
      <motion.div
        className="relative flex flex-col items-center justify-end overflow-hidden"
        style={{
          width: 120,
          height: 180,
          background: `linear-gradient(135deg, ${bookColor} 0%, ${bookColor}cc 100%)`,
          borderRadius: "3px 8px 8px 3px",
          boxShadow:
            "4px 6px 20px rgba(0,0,0,0.5), inset 6px 0 12px rgba(0,0,0,0.25)",
          cursor: "pointer",
        }}
        whileHover={{ y: -20, rotate: 1, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Spine shadow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-4"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        />

        {/* Top pages edge */}
        <div
          className="absolute top-0 left-3 right-1 h-2"
          style={{
            background:
              "repeating-linear-gradient(to right, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
            borderRadius: "0 2px 0 0",
          }}
        />

        {/* Restaurant logo */}
        {logoUrl && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ padding: "10px 14px 70px", paddingLeft: "20px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}${logoUrl}`}
              alt=""
              className="w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}
            />
          </div>
        )}

        {/* Book text */}
        <div className="relative z-10 pb-3 pt-1 text-center w-full" style={{ paddingLeft: "18px", paddingRight: "8px" }}>
          <p
            className="font-heading text-xs font-bold leading-tight text-white whitespace-pre-line"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
          >
            {menu.title}
          </p>
          {menu.subtitle && (
            <p className="font-body text-[10px] mt-0.5 text-white/70">
              {menu.subtitle}
            </p>
          )}
        </div>

        {/* Hover tooltip */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="font-body text-xs font-semibold text-white flex items-center gap-1">
            Open Menu <span className="text-sm">→</span>
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}
