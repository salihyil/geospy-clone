import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <div id="contact-section" className="relative">
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 pt-20 text-center">
        <Badge
          variant="outline"
          className="group mb-8 p-3 text-base font-bold transition-all duration-500 hover:rounded-xl hover:bg-primary/10 hover:text-primary"
        >
          <span className="bg-gradient-to-r from-primary to-primary bg-[length:0px_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
            GeoSpy Pro
          </span>
        </Badge>

        <h1 className="mb-8 max-w-[600px] text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          For Government & Law Enforcement
        </h1>

        <p className="mb-12 max-w-[650px] text-left text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          GeoSpy Pro is an advanced AI platform integrating powerful AI location
          models for your city or country. Delivering up to meter level
          accuracy, state of the art computer vision models all in an easy to
          use interface. For qualified government and enterprise organizations.
        </p>

        <Button className="px-8 py-6 text-lg font-medium text-white">
          <div className="flex items-center gap-2">
            Contact Us
            <MessageCircle className="ml-2 h-5 w-5" />
          </div>
        </Button>
      </div>
    </div>
  );
}
