import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { HTMLAttributes, ImgHTMLAttributes } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type ComponentProps = HTMLAttributes<HTMLElement>;
type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const components: MDXComponents = {
  h1: ({ children, ...props }: ComponentProps) => (
    <h1 className="mb-4 mt-8 text-4xl font-bold tracking-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps) => (
    <h2 className="mb-4 mt-8 text-3xl font-bold tracking-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps) => (
    <h3 className="mb-3 mt-6 text-2xl font-bold tracking-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps) => (
    <h4 className="mb-3 mt-6 text-xl font-bold tracking-tight" {...props}>
      {children}
    </h4>
  ),
  p: (props: ComponentProps) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  a: (props: ComponentProps) => (
    <a
      className="font-medium text-blue-600 underline underline-offset-4"
      {...props}
    />
  ),
  ul: (props: ComponentProps) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props: ComponentProps) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: (props: ComponentProps) => <li className="mt-2" {...props} />,
  blockquote: (props: ComponentProps) => (
    <blockquote
      className="mt-6 border-l-2 border-gray-300 pl-6 italic"
      {...props}
    />
  ),
  img: (props: ImageProps) => (
    <div className="relative my-8 h-[400px] w-full overflow-hidden rounded-lg">
      <Image
        alt={props.alt || "Blog Image"}
        src={props.src || ""}
        fill
        className="object-cover"
        priority={true}
      />
    </div>
  ),
  pre: (props: ComponentProps) => (
    <pre className="overflow-x-auto" {...props} />
  ),
  code: ({ children, className, ...props }: ComponentProps) => {
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !match;

    return isInline ? (
      <code
        className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    ) : (
      <SyntaxHighlighter
        language={match?.[1] || ""}
        style={oneDark}
        PreTag="div"
        className="my-6 rounded-lg"
        showLineNumbers
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  table: (props: ComponentProps) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  th: (props: ComponentProps) => (
    <th className="border px-4 py-2 text-left font-bold" {...props} />
  ),
  td: (props: ComponentProps) => <td className="border px-4 py-2" {...props} />,
  hr: (props: ComponentProps) => <hr className="my-8" {...props} />,
};
