"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import {
  COMMAND_ANIMATION,
  ITEM_ANIMATION,
  LIST_ANIMATION,
} from "@/constant/animations";
import { blogPosts } from "@/constant/blogPosts";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as React from "react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  type: string;
  paragraph: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Motion components
const MotionCommandItem = motion.create(CommandItem);
const MotionCommandList = motion.create(CommandList);
const MotionCommand = motion.create(Command);

// Utility function for highlighting matched text
const highlightMatch = (text: string, query: string): React.ReactNode => {
  if (!query) return text;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        className="rounded-sm bg-gradient-to-br from-primary/20 to-primary/10 px-0.5 font-medium text-primary"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export function SearchDialog({
  open,
  onOpenChange,
}: SearchDialogProps): React.ReactElement {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  const posts = React.useMemo<BlogPost[]>(() => {
    return Object.entries(blogPosts).map(([slug, post]) => ({
      slug,
      ...post,
    }));
  }, []);

  const filteredPosts = React.useMemo<BlogPost[]>(() => {
    if (!value) return [];
    const searchTerm = value.toLowerCase();
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm),
    );
  }, [posts, value]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] translate-y-0 overflow-hidden p-0">
        <VisuallyHidden>
          <DialogTitle>Search Blog Posts</DialogTitle>
        </VisuallyHidden>
        <MotionCommand
          animate={{
            height: value ? "auto" : "48px",
          }}
          transition={COMMAND_ANIMATION}
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          shouldFilter={false}
        >
          <CommandInput
            placeholder="Type to search blog posts..."
            value={value}
            onValueChange={setValue}
          />
          <AnimatePresence mode="sync" initial={false}>
            {value && (
              <MotionCommandList
                {...LIST_ANIMATION}
                className="overflow-hidden"
              >
                {filteredPosts.length === 0 ? (
                  <CommandEmpty>No results found.</CommandEmpty>
                ) : (
                  <CommandGroup>
                    <AnimatePresence mode="popLayout" initial={false}>
                      {filteredPosts.map((post, index) => (
                        <MotionCommandItem
                          key={post.slug}
                          value={post.title}
                          className="flex flex-col items-start gap-2"
                          onSelect={() => {
                            router.push(`/blog/${post.slug}`);
                            onOpenChange(false);
                          }}
                          {...ITEM_ANIMATION}
                          transition={{
                            ...ITEM_ANIMATION.transition,
                            delay: index * 0.03,
                          }}
                        >
                          <div className="flex w-full flex-col">
                            <span className="text-sm font-medium">
                              {highlightMatch(post.title, value)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {post.date} • {post.type}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-xs text-muted-foreground">
                            {post.paragraph}
                          </p>
                        </MotionCommandItem>
                      ))}
                    </AnimatePresence>
                  </CommandGroup>
                )}
              </MotionCommandList>
            )}
          </AnimatePresence>
        </MotionCommand>
      </DialogContent>
    </Dialog>
  );
}
