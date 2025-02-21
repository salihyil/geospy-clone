import { cn } from "@/lib/utils";
import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  date: string;
  image: string;
  type: "Tips" | "Articles";
  href: string;
  className?: string;
}

export function BlogCard({
  title,
  date,
  image,
  type,
  href,
  className,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-[4/3] bg-gray-50/50 p-3">
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-100/50">
          <Image
            priority
            sizes="fill"
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium backdrop-blur">
            {type}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-xl font-semibold tracking-tight">
          {title}
        </h3>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={date}>{date}</time>
          </div>
          <span className="inline-flex items-center font-medium text-gray-700 group-hover:text-gray-900">
            Read more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
