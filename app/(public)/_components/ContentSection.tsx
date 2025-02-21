"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ContentSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.7], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2"
      ref={targetRef}
    >
      {/* Left Column */}
      <div className="space-y-8">
        <div className="flex w-full gap-2">
          <motion.div
            className="group relative h-[75px] w-[75px] cursor-pointer"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="https://picsum.photos/seed/picsum/75/75"
              alt="Clean AI"
              width={75}
              height={75}
              className="w-full rounded-full border"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-medium text-white">Clean</span>
            </div>
          </motion.div>

          <motion.div
            className="group relative h-[75px] w-[75px] cursor-pointer"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="https://picsum.photos/seed/picsum/75/75"
              alt="Robust AI"
              width={75}
              height={75}
              className="w-full rounded-full border"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-medium text-white">Robust</span>
            </div>
          </motion.div>

          <motion.div
            className="group relative h-[75px] w-[75px] cursor-pointer"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="https://picsum.photos/seed/picsum/75/75"
              alt="Modern AI"
              width={75}
              height={75}
              className="w-full rounded-full border"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-medium text-white">Modern</span>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl lg:text-5xl">
            Turn pixels into intelligence.
          </h2>

          <p className="max-w text-lg leading-relaxed text-gray-600">
            Billions of data points in the form of images stream across the open
            and closed net every day, most of which go untapped. Harness the
            power of next-generation computer vision models to transform this
            data into actionable intelligence for decision-making.
          </p>

          <Link
            href="/geospy"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-8 py-3 text-base font-medium text-white transition-all hover:scale-105 hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Try GeoSpy →
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        style={{ x, opacity }}
        className="relative aspect-[3/4] overflow-hidden rounded-xl"
      >
        <Image
          sizes="fill"
          src="/frank_residence.png"
          alt="San Francisco cityscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 backdrop-blur">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">52 V, San Francisco, CA 94112, USA</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="mb-4 text-2xl font-semibold">
            &quot;This is a photo of Frank Residences, and Byer Square in San
            Francisco, CA&quot;
          </p>
          <Button
            variant="link"
            className="h-auto p-0 text-white hover:no-underline"
          >
            Learn More →
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
