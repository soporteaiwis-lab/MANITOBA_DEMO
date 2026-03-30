import { motion } from "motion/react";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Comunidad Chilena en <span className="text-red-500">Manitoba</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light"
        >
          Uniendo raíces, apoyando a nuestra gente y compartiendo nuestra cultura con Canadá desde 1974.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#contacto"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Únete a Nosotros
          </a>
          <a 
            href="#servicios"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm hover:-translate-y-1"
          >
            Nuestros Servicios
          </a>
        </motion.div>
      </div>
    </section>
  );
}
