"use client";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 1] : [1.02, 1];
  };

  const scaleValues = scaleDimensions();
  const rotate = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [scaleValues[0], scaleValues[1]],
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div
      className="relative flex h-[20rem] items-center justify-center md:h-[32rem] md:p-6"
      ref={containerRef}
    >
      <div
        className="relative w-full"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000002d, 0 9px 20px #0000002b, 0 37px 37px #00000024, 0 84px 50px #0000001a, 0 149px 60px #00000006, 0 233px 65px #00000001",
      }}
      className="mx-auto -mt-4 h-[24rem] w-full max-w-4xl rounded-[16px] border-2 border-[#6C6C6C] bg-[#222222] shadow-xl md:h-[32rem]"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
