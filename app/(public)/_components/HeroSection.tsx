import { HeroScrollDemo } from "@/app/(public)/_components/HeroScrollDemo";
import { VideoDialog } from "@/app/(public)/_components/VideoDialog";
import HeroSectionBackground from "@/components/icon/HeroSectionBackground";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div
          className="container"
          data-framer-name="Animated-circles"
          style={{
            opacity: 1,
            transform: "translateY(-200px) scale(1) rotate(45deg)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              placeContent: "center",
              placeItems: "center",
              backgroundColor: "transparent",
              overflow: "hidden",
            }}
          >
            <HeroSectionBackground />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <VideoDialog />
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Unlock the Power of AI{" "}
            <span className="block">Image intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Convert pixels into actionable location intelligence using AI
          </p>
        </div>

        <Link
          href="/geospy"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-8 py-3 text-base font-medium text-white transition-all hover:scale-105 hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Try GeoSpy <span className="text-lg">⚡</span>
        </Link>

        <p className="text-sm text-muted-foreground">
          GeoSpy is trusted by over 1000+ organizations worldwide
        </p>
      </div>

      <HeroScrollDemo />
    </section>
  );
};

export default HeroSection;
