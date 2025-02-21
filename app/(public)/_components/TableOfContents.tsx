"use client";

import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";

interface TableOfContentsProps {
  content: string;
}

interface Section {
  id: string;
  title: string;
  level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    // Parse content to find headings
    const lines = content.split("\n");
    const foundSections: Section[] = [];

    lines.forEach((line) => {
      if (line.startsWith("##")) {
        const title = line.replace(/^##\s+/, "").trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        foundSections.push({
          id,
          title,
          level: line.startsWith("###") ? 2 : 1,
        });
      }
    });

    setSections(foundSections);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav className="sticky top-8 hidden space-y-2 lg:block">
      <div className="flex items-center gap-2 font-semibold">
        <Link className="h-4 w-4" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-2 text-sm">
        {sections.map((section) => (
          <li
            key={section.id}
            className={cn(
              "cursor-pointer transition-colors hover:text-gray-900",
              section.level === 2 && "ml-4",
              activeSection === section.id
                ? "font-medium text-gray-900"
                : "text-gray-500",
            )}
            onClick={() => scrollToSection(section.id)}
          >
            {section.title}
          </li>
        ))}
      </ul>
    </nav>
  );
}
