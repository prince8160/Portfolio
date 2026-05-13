import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Kalla Prince | Premium Web Developer',
  description: 'Creative web developer focused on building modern, responsive, and visually engaging websites with clean design.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans bg-black text-gray-100 antialiased selection:bg-orange-500/30 selection:text-orange-200">
        <div className="fixed inset-0 z-[-1] bg-black">
          {/* Atmospheric background */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
