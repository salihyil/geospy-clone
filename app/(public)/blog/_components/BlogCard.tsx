"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
  imageUrl: string;
  index: number;
}

export function BlogCard({
  title,
  description,
  date,
  slug,
  category,
  imageUrl,
  index,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col gap-8 md:flex-row md:items-start"
    >
      <Link
        href={`/blog/${slug}`}
        className="block w-full overflow-hidden rounded-lg md:w-[420px]"
      >
        <div className="relative aspect-[4/3] transform overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-3">
        <div className="flex items-center">
          <span className="text-sm font-medium  ">{category}</span>
        </div>

        <Link href={`/blog/${slug}`} className="group-hover:opacity-80">
          <h2 className="text-[32px] font-semibold leading-tight  ">
            {title}
          </h2>
        </Link>

        <p className="text-lg text-gray-600">{description}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <time className="text-sm text-gray-500">{date}</time>
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-gray-700"
          >
            Read more
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
