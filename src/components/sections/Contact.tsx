import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, Send } from 'lucide-react';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
  };

  return (
    <section id="contacto" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Contacto</h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">¿Tienes alguna duda? ¡Escríbenos!</h3>
          <p className="text-lg text-gray-600">
            Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100"
          >
            <h4 className="text-2xl font-bold text-gray-900 mb-8">Información de Contacto</h4>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-1">Nuestra Sede</h5>
                  <p className="text-gray-600">123 Main Street, Suite 400<br/>Winnipeg, MB R3C 1A3<br/>Canadá</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-1">Teléfono</h5>
                  <p className="text-gray-600">+1 (204) 555-0198<br/>Lunes a Viernes, 9am - 5pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-1">Correo Electrónico</h5>
                  <p className="text-gray-600">contacto@manitobachilean.ca<br/>info@manitobachilean.ca</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-10 h-64 bg-gray-200 rounded-2xl overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164536.41725515795!2d-97.28821034999999!3d49.853822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea73fbf91a2b11%3A0x2b2a1afac6b9cb64!2sWinnipeg%2C%20MB%2C%20Canada!5e0!3m2!1sen!2sus!4v1709660000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Winnipeg"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "El nombre es obligatorio" })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-shadow`}
                  placeholder="Juan Pérez"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo electrónico inválido"
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-shadow`}
                  placeholder="juan@ejemplo.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject", { required: "El asunto es obligatorio" })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-shadow`}
                  placeholder="Consulta sobre membresía"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", { required: "El mensaje es obligatorio" })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-shadow resize-none`}
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
