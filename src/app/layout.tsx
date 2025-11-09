import Hero from "@/components/Hero";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Montserrat } from 'next/font/google';
import Services from "@/components/Services";
import Projects from "@/components/Projects";


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
})

export const metadata = { title: "Sadaf Nemani" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans bg-neutral-55 text-neutral-10`}>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Projects />
        </main>
      </body>
    </html>
  );
}
