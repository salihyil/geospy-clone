import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { locations } from "@/constant/features-section";
import { Shield, Sparkles, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-[1000px] px-4 py-6 sm:px-6 sm:py-[34px]">
      <div className="flex flex-col gap-4 sm:gap-[30px] md:flex-row">
        <div className="flex w-full flex-col gap-4 sm:gap-[30px] md:w-1/2">
          {/* Location Intelligence Card  */}
          <Card className="p-3 sm:p-4">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-xs sm:text-sm"
                >
                  <Zap className="h-3 w-3" />
                  Fast
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-xs sm:text-sm"
                >
                  <Shield className="h-3 w-3" />
                  Secure
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-xs sm:text-sm"
                >
                  <Target className="h-3 w-3" />
                  Accurate
                </Badge>
              </div>
              <CardTitle className="text-xl sm:text-2xl">
                Location Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">
                GeoSpy turns low-context photo data into precise GPS location
                prediction—no EXIF data needed. Unlock real-time location
                intelligence from any photo.
              </p>
            </CardContent>
            <CardFooter className="h-16"></CardFooter>
          </Card>
          {/* Global Coverage Card  */}
          <Card className="p-3 sm:p-4">
            <CardHeader className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
              <CardTitle className="text-xl sm:text-2xl">
                Global Coverage
              </CardTitle>
              <Badge variant="outline" className="text-xs sm:text-sm">
                Global
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-base">
                GeoSpy can be deployed to teams and organizations in over 120+
                countries. With coverage in most geographic regions, GeoSpy is a
                great fit for teams across the globe.
              </p>
              <div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-white antialiased dark:bg-black">
                <InfiniteMovingCards
                  items={locations}
                  direction="left"
                  speed="normal"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex w-full flex-col gap-[30px] md:w-1/2">
          {/* Built to Scale Card   */}
          <Card className="p-3 sm:p-4">
            <CardHeader className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
              <CardTitle className="text-xl sm:text-2xl">
                Built to Scale
              </CardTitle>
              <Badge variant="outline" className="text-xs sm:text-sm">
                Enterprise
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-base">
                The GeoSpy platform can be accessed via Sass, API, or on
                premises deployments. We process 200,000+ images a day and can
                scale to billions.
              </p>
            </CardContent>
          </Card>
          {/* AI Research Card   */}
          <Card className="relative flex flex-1 flex-col justify-end p-3 sm:p-4">
            <div className="absolute right-0 top-0 z-0">
              <Sparkles className="h-40 w-40 text-gray-300" />
            </div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-xl sm:text-2xl">
                Cutting edge AI research
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <p className="text-base">
                Stay ahead of the latest break throughs in AI and partner with
                us in developing, integrating, and deploying the latest in AI
                models for intelligence, gathering and understanding
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Contact Us →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
