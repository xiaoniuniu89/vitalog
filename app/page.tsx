import Hero from '@/components/hero'
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

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
    </>
  )
}