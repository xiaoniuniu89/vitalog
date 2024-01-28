import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroImage from "@/public/hero.webp";

export default function Hero() {
  return (
    <section className="bg-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap">

        {/* Image div - Always displayed, changes position based on screen size */}
        <div className="w-full md:w-2/5 my-auto md:order-1">
          <Image src={HeroImage} alt="Hero Image" />
        </div>

        {/* Title "Vitalog" and buttons - Only visible on tablet and mobile */}
        <div className="w-full text-center md:hidden">
          <h2 className="text-4xl font-bold mt-4">Vitalog</h2>
          <div className="flex flex-col items-center gap-4 my-4">
            <Button asChild variant="secondary">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button asChild>
              <Link href="/">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Right div - Hero content for larger screens */}
        <div className="w-full md:w-3/5 pt-32 pb-12 md:pt-40 md:pb-20 md:order-2">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Track Your Nutrition Easily
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                A simple and effective way to keep a diary of your nutritional intake and stay healthy.
              </p>
              {/* Buttons for larger screens */}
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex justify-center gap-2">
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
