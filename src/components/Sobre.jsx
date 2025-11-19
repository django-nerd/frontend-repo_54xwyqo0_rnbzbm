import { motion } from 'framer-motion'

export default function Sobre() {
  const items = [
    'El Patron não é só cortar cabelo.',
    'É ritual.',
    'É identidade.'
  ]
  return (
    <section id="sobre" className="relative bg-black text-gray-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12">
        <div>
          <motion.h2 initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-white text-3xl md:text-4xl font-extrabold uppercase mb-6">
            Sobre Nós
          </motion.h2>
          <p className="text-gray-400 leading-relaxed">
            Masculino, urbano e direto. Trabalhamos com detalhe, técnica e respeito pelo cliente. A nossa casa respira cultura de barbearia de rua com um toque moderno e premium. Aqui, cada corte é um statement.
          </p>
          <div className="mt-8 space-y-4">
            {items.map((t,i)=> (
              <motion.div key={t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.1 }} className="border-l-4 border-red-600 pl-4">
                <p className="text-white font-semibold">{t}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-400 mt-6">Equipa de barbers experientes, focada no teu estilo e na tua identidade.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center h-48 md:h-64 grayscale hover:grayscale-0 transition rounded"></div>
          <div className="bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center h-48 md:h-64 grayscale hover:grayscale-0 transition rounded"></div>
          <div className="bg-[url('https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM1MTI1ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center h-40 md:h-48 grayscale hover:grayscale-0 transition rounded col-span-2"></div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
    </section>
  )
}
