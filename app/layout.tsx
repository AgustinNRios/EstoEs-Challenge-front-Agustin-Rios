import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Head from 'next/head';
import { Roboto } from 'next/font/google'; // Importa Roboto

const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700'] }); // Define Roboto

export const metadata: Metadata = {
  title: {
    template: 'Esto es',
    default: 'Esto es',
  },
  description: 'Challenge Frontend - Esto Es',
  keywords: 'challenge, frontend, Nextjs, React',
  authors: [{ name: 'Rios, Agustin' }],
  publisher: 'Rios, Agustin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className='h-full bg-[#f5f0f0]'>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={`${roboto.className} w-full flex flex-col h-full bg-[#f5f0f0]`}>
        <Navbar data-testid="navbar"/>
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
