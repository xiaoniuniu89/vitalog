import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Track Your Nutrition Easily
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                A simple and effective way to keep a diary of your nutritional
                intake and stay healthy.
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex justify-center flex gap-2">
                <Button asChild variant="secondary">
                  <Link href="/dashboard">Get Started</Link>
                </Button>

                <Button asChild>
                  <Link href="/">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
