import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Events } from '../components/sections/Events';
import { Gallery } from '../components/sections/Gallery';
import { Contact } from '../components/sections/Contact';

export function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <About />
      <Services />
      <Events />
      <Gallery />
      <Contact />
    </main>
  );
}
