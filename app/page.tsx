import Hero from '@/components/hero'
import { redirect } from 'next/navigation';
// import Features from '@/components/features'
// import FeaturesBlocks from '@/components/features-blocks'
// import Testimonials from '@/components/testimonials'
// import Newsletter from '@/components/newsletter'

export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
  favicon: './favicon.ico',
}

export default function Home() {
  
  // if (.user) {
  //   redirect('/dashboard');
  // }
  return (
    <>
      <Hero />
      {/* <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter /> */}
    </>
  )
}