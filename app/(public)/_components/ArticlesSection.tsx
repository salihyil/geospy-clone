import { BlogCard } from "@/components/ui/blog-card";

export default function ArticlesSection() {
  return (
    <section className="mx-auto max-w-[1200px] space-y-8 px-4 py-16">
      <h2 className="text-3xl font-semibold">Latest Articles & Tips</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          title="Find a Photo's Location"
          date="December 23, 2024"
          image="/articles/1.png"
          type="Tips"
          href="/blog/find-a-photo"
        />

        <BlogCard
          title="Superbolt: The Future of Visual Place Recognition"
          date="November 3, 2024"
          image="/articles/2.png"
          type="Articles"
          href="/blog/superbolt-the-future-of-visual-place-recognition"
        />

        <BlogCard
          title="What Is Photo Geolocation?"
          date="December 20, 2024"
          image="/articles/3.png"
          type="Articles"
          href="/blog/what-is-photo-geolocation"
        />
      </div>
    </section>
  );
}
