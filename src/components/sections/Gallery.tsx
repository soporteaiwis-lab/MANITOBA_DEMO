import { motion } from "motion/react";

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=2069&auto=format&fit=crop", alt: "Comida chilena", span: "col-span-1 row-span-1" },
  { id: 2, src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop", alt: "Gente reunida", span: "col-span-2 row-span-2" },
  { id: 3, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop", alt: "Baile tradicional", span: "col-span-1 row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop", alt: "Evento cultural", span: "col-span-1 row-span-2" },
  { id: 5, src: "https://images.unsplash.com/photo-1533174000273-e1c6640bef9c?q=80&w=2070&auto=format&fit=crop", alt: "Fiesta", span: "col-span-2 row-span-1" },
];

export function Gallery() {
  return (
    <section id="galeria" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-red-500 uppercase mb-3">Nuestra Comunidad</h2>
          <h3 className="text-4xl font-bold mb-6">Momentos Inolvidables</h3>
          <p className="text-lg text-gray-400">
            Un vistazo a nuestras celebraciones, talleres y encuentros en Manitoba.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 h-[600px]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group ${photo.span}`}
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium text-lg">{photo.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-3 rounded-full font-medium transition-colors">
            Ver Galería Completa
          </button>
        </div>
      </div>
    </section>
  );
}
