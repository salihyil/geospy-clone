import { Container } from "@/components/ui/container";
import { blogPosts } from "@/constant/blogPosts";
import { Metadata } from "next";
import { BlogCard } from "./_components/BlogCard";

export const metadata: Metadata = {
  title: "Blog | GeoSpy",
  description: "Read the latest from the GeoSpy team",
};

export default function BlogPage() {
  const posts = Object.entries(blogPosts).map(([slug, post]) => ({
    ...post,
    slug,
    imageUrl: post.image,
  }));

  return (
    <div className="relative pb-20 pt-16">
      <Container>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Read the latest from the GeoSpy team
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.paragraph}
                date={post.date}
                slug={post.slug}
                category={post.type}
                imageUrl={post.imageUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
