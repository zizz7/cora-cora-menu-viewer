"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MenuMeta } from "@/types/menu";

interface BookCardProps {
  menu: MenuMeta;
}

const cardVariants = {
  rest: { y: 0, rotate: 0 },
  hover: { y: -8, rotate: -1 },
};

const badgeVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

export default function BookCard({ menu }: BookCardProps) {
  return (
    <Link href={`/menu/${menu.slug}`} className="block">
      <motion.div
        className="relative cursor-pointer overflow-hidden"
        style={{
          aspectRatio: "3 / 4",
          borderRadius: "4px 10px 10px 4px",
          boxShadow: "inset 6px 0 12px rgba(0, 0, 0, 0.35)",
        }}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Cover image — native img for loading="lazy" per spec */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={menu.coverUrl}
          alt={menu.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Spine shadow overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 15%)",
          }}
        />

        {/* Bottom info bar */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
          <h3 className="font-heading text-sm font-semibold leading-tight text-cream">
            {menu.title}
          </h3>
          <p className="font-mono text-xs text-cream-muted">
            {menu.pageCount} pages
          </p>
        </div>

        {/* Hover badge overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/30"
          variants={badgeVariants}
          transition={{ duration: 0.2 }}
        >
          <span className="rounded-full bg-amber px-4 py-1.5 font-body text-sm font-semibold text-forest">
            View Menu
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}
