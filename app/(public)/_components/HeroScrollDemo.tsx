"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="mt-32 flex flex-col overflow-hidden">
      <ContainerScroll titleComponent={<></>}>
        <video
          src="/geospy.mp4"
          autoPlay
          muted
          loop
          className="mx-auto h-full object-cover object-left-top"
          draggable={false}
          suppressHydrationWarning
        />
      </ContainerScroll>
    </div>
  );
}
