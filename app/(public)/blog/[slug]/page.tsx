import BlogContent from "@/app/(public)/_components/BlogContent";
import { ContinueReading } from "@/app/(public)/_components/ContinueReading";
import SocialShare from "@/app/(public)/_components/SocialShare";
import { blogPosts } from "@/constant/blogPosts";
import { CalendarDays } from "lucide-react";
import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | GeoSpy Blog`,
    description: post.content.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      format: "mdx",
    },
  });

  // Get other posts for the continue reading section
  const otherPosts = Object.entries(blogPosts)
    .filter(([postSlug]) => postSlug !== slug)
    .map(([postSlug, postData]) => ({
      ...postData,
      slug: postSlug,
      imageUrl: postData.image,
    }))
    .slice(0, 3);

  return (
    <article className="relative">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex flex-col items-center space-y-8 text-center">
          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium dark:text-black">
            {post.type}
          </span>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 ">
            <CalendarDays className="h-5 w-5" />
            <time dateTime={post.date}>{post.date}</time>
          </div>

          <div className="relative aspect-[21/9] w-full max-w-6xl overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex w-full gap-8">
            <aside className="hidden md:block">
              <SocialShare title={post.title} />
            </aside>

            <div className="w-full text-left">
              <BlogContent source={mdxSource} />
            </div>
          </div>
        </div>
      </div>

      <ContinueReading posts={otherPosts} />
    </article>
  );
}
