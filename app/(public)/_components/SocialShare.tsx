"use client";

import { usePathname } from "next/navigation";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

interface SocialShareProps {
  title: string;
}

export default function SocialShare({ title }: SocialShareProps) {
  const pathname = usePathname();
  const url = `https://geospy.ai${pathname}`;

  const shareLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`,
    },
    {
      name: "X",
      icon: FaXTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
  ];

  const handleShare = (href: string) => {
    window.open(href, "_blank", "width=600,height=400");
  };

  return (
    <div className="sticky top-32 flex flex-col gap-6">
      {shareLinks.map((link) => (
        <button
          key={link.name}
          onClick={() => handleShare(link.href)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:shadow-lg"
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="h-5 w-5 text-gray-700" />
        </button>
      ))}
    </div>
  );
}
