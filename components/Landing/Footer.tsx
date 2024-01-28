import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-vita-orange text-center p-4 flex">
        <div className='container mx-auto flex flex-wrap justify-center gap-4'>
        <Link href="/contact-us" className="text-lg" aria-label="Contact Us">Contact Us</Link>
        <Link href="/privacy-policy" className="text-lg" aria-label="Privacy Policy">Privacy Policy</Link>
        <Link href="/cookie-policy" className="text-lg" aria-label="Cookie Policy">Cookie Policy</Link>
        </div>
      <div className="container mx-auto flex flex-wrap justify-center gap-4">
        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="text-lg">
          <Twitter className="inline-block" size={24} aria-label="Link to X" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="inline-block" size={24} aria-label="Facebook Contact" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
