import { ReactNode } from 'react';
import Header from '@/components/Header';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen">
      <Header />
      <main className="mx-auto container h-4/5 mt-6 py-3">{children}</main>
    </div>
  );
}
