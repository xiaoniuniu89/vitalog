import Hero from "@/components/Landing/hero";
import LearnMore from "@/components/Landing/LearnMore";
import Demo from "@/components/Landing/Demo";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import CTA from "@/components/Landing/CTA";
import Footer from "@/components/Landing/Footer";

export const metadata = {
  title: "Vita Log",
  description: "A simple food journaling app",
  favicon: "./favicon.ico",
};

export default async function Home() {
  const user = await currentUser();

  if (user?.id) {
    redirect("/dashboard");
  }
  return (
    <>
      <Hero />
      <LearnMore />
      <Demo />
      <CTA />
      <Footer />
    </>
  );
}
