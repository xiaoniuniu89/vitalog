import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function CTA() {
  return (
    <section className="p-8 m-8">
      <div className="flex justify-center">
        <Button asChild variant="secondary">
          <Link href="/dashboard">Get Started For Free</Link>
        </Button>
      </div>
    </section>
  );
}

export default CTA;
