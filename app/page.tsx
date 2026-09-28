import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ScrollExperience from "@/components/ScrollExperience";
import MenuSection from "@/components/MenuSection";
import GrillSection from "@/components/GrillSection";
import Gallery from "@/components/Gallery";
import InstagramSection from "@/components/InstagramSection";
import EventsSection from "@/components/EventsSection";
import Location from "@/components/Location";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <ScrollExperience />
        <MenuSection />
        <GrillSection />
        <Gallery />
        <InstagramSection />
        <EventsSection />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
