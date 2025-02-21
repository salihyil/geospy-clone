"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribe:", email);
  };

  return (
    <footer className=" ">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-start md:space-x-8">
          {/* Left section - GeoSpy */}
          <div className="flex flex-2 flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/geospy-icon.png"
                alt="GeoSpy"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-semibold">GeoSpy</span>
            </div>
            <p className="text-gray-600">Pixels to intelligence</p>
            <div className="flex space-x-6">
              <Link
                href="https://twitter.com/geospy"
                className="text-gray-500 hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-.799 17.52h1.83L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/company/geospy"
                className="text-gray-500 hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right section - Newsletter */}
          <div className="mt-8 flex-4 md:ml-auto md:mt-0">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="mt-2 text-gray-600">
              Keep up to date with news and content from Graylark.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-x-4">
              <Input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-4"
              />
              <Button type="submit" className="flex-2 shrink-0">
                Subscribe
              </Button>
            </form>
            <p className="mt-2 text-sm text-gray-500">
              By signing up you agree to our{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:text-gray-700"
              >
                privacy policy
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-left text-[14px] font-bold dark:text-white">
            Copyright © 2025 Graylark Technologies Inc
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
