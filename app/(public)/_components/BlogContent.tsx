"use client";

import { components } from "@/components/mdx-components";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface BlogContentProps {
  source: MDXRemoteSerializeResult;
}

export default function BlogContent({ source }: BlogContentProps) {
  return (
    <article className="prose prose-gray max-w-none">
      <MDXRemote {...source} components={components} />
    </article>
  );
}
