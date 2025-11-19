import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/90 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-28 w-full">
        <div className="flex flex-col items-start gap-6">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs tracking-widest text-gray-300 border border-red-600 px-3 py-1 rounded">Faro • Olhão • Tavira</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold uppercase text-white leading-tight">
            EL PATRON – BARBEARIA PARA QUEM NÃO QUER SER SÓ MAIS UM.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-xl text-gray-300">
            Três cidades. Um estilo. Zero desculpas.
          </motion.p>
          <motion.a href="#marcacao" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="bg-red-600 hover:bg-red-700 text-white uppercase tracking-wide font-bold px-8 py-4 rounded-md shadow-lg">
            Marcar agora
          </motion.a>
        </div>
      </div>
    </section>
  )
}
