"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MenuMeta } from "@/types/menu";

interface BookCardProps {
  menu: MenuMeta;
  href: string;
  logoUrl?: string;
}

export default function BookCard({ menu, href, logoUrl }: BookCardProps) {
  const isFeatured = !!menu.featured;
  const bookColor = menu.color || "#00C4B3";

  return (
    <Link href={href} className="flex justify-center">
      <motion.div
        className="relative flex flex-col items-center justify-end overflow-hidden"
        style={{
          width: isFeatured ? 140 : 110,
          height: isFeatured ? 200 : 170,
          background: isFeatured
            ? `linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)`
            : `linear-gradient(135deg, ${bookColor} 0%, ${bookColor}cc 100%)`,
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

        {/* Featured gold accents */}
        {isFeatured && (
          <>
            <div
              className="absolute top-3 left-3 right-3 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #D4A853, transparent)",
              }}
            />
            <div
              className="absolute bottom-12 left-3 right-3 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #D4A853, transparent)",
              }}
            />
            <div className="absolute top-0 right-4 flex flex-col items-center">
              <div
                className="w-6 h-8 flex items-end justify-center pb-0.5"
                style={{
                  background: "#D4A853",
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)",
                }}
              >
                <span
                  className="text-[8px] text-black leading-none"
                  style={{ marginBottom: 4 }}
                >
                  ★
                </span>
              </div>
            </div>
          </>
        )}

        {/* Restaurant logo */}
        {logoUrl && (
          <div
            className="absolute inset-x-0 flex items-center justify-center"
            style={{
              top: isFeatured ? "28px" : "20px",
              height: isFeatured ? "70px" : "55px",
              padding: "0 16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt=""
              className="max-h-full max-w-full object-contain"
              style={{
                filter: "brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                opacity: 0.85,
              }}
            />
          </div>
        )}

        {/* Book text */}
        <div className="relative z-10 p-3 pb-4 text-center w-full">
          <p
            className="font-heading text-xs font-bold leading-tight text-white"
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
