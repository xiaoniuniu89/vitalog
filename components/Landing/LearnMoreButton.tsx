"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function LearnMoreButton() {
  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  const handleLearnMoreClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    scrollToElement("LearnMore");
  };

  return (
    <Button variant="vitaGreen" asChild onClick={handleLearnMoreClick}>
      <Link href="#LearnMore">Learn More</Link>
    </Button>
  );
}

export default LearnMoreButton;
