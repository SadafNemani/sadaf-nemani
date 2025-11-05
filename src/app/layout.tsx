import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Sadaf Nemani" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-55 text-neutral-10">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
