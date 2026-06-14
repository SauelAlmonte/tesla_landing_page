import Navbar from "@/components/Navbar";
import CarSection from "@/components/CarSection";
import Footer from "@/components/Footer";
import { sections } from "@/lib/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {sections.map((section, index) => (
          <CarSection
            key={section.id}
            section={section}
            // Chain to the next panel, or to the footer after the last product.
            nextId={sections[index + 1]?.id ?? "site-footer"}
            isHero={index === 0}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
