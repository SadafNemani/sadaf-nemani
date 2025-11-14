import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Montserrat } from 'next/font/google';
import Footer from "@/components/footer/Footer";
import GradientHalo from "@/components/layout/GradientHalo";


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
        <GradientHalo />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
