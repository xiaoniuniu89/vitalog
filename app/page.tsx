import Hero from '@/components/hero'
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
// import Features from '@/components/features'
// import FeaturesBlocks from '@/components/features-blocks'
// import Testimonials from '@/components/testimonials'
// import Newsletter from '@/components/newsletter'

export const metadata = {
  title: 'Vita Log',
  description: 'A simple food journaling app',
  favicon: './favicon.ico',
}

export default async function Home() {

  const user = await currentUser();
  
  if (user?.id) {
    redirect('/dashboard');
  }
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