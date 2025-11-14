import Hero from "@/components/hero/Hero";
import Services from "@/components/home-sections/Services";
import Projects from "@/components/home-sections/Projects";
import Testimonials from "@/components/home-sections/Testimonials";
import ContactCTA from "@/components/home-sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
