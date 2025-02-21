import { Container } from "@/components/ui/container";
import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  title: string;
  date: string;
  type: string;
  imageUrl: string;
  slug: string;
}

interface ContinueReadingProps {
  posts: BlogPost[];
}

export function ContinueReading({ posts }: ContinueReadingProps) {
  return (
    <section className="border-t">
      <Container>
        <div className="py-20">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold">Continue Reading</h2>
              <p className="mt-2 text-lg">
                The latest handpicked blog articles
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              Check all articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-sm font-medium shadow-sm">
                      {post.type}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-gray-600">
                      {post.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2  ">
                        <CalendarDays className="h-4 w-4" />
                        <time className="text-sm">{post.date}</time>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-medium  ">
                        Read more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
