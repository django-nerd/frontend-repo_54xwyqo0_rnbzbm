import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { apiGet } from '../utils/api'
import { Scissors, Sparkles } from 'lucide-react'

export default function Servicos({ onSelect }) {
  const [servicos, setServicos] = useState([])

  useEffect(() => {
    apiGet('/services').then(setServicos).catch(()=>{
      setServicos([])
    })
  }, [])

  return (
    <section id="servicos" className="bg-black text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <motion.h2 initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-white text-3xl md:text-4xl font-extrabold uppercase mb-8 flex items-center gap-3">
          <Scissors className="text-red-600" /> Serviços & Preços
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((s, i) => (
            <motion.div key={s.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.05 }} className={`relative border rounded-lg p-5 bg-zinc-900/60 ${s.featured ? 'border-red-600 shadow-[0_0_25px_rgba(255,0,0,0.3)]' : 'border-zinc-700'}`}>
              {s.featured && (
                <div className="absolute -top-3 right-3 bg-red-600 text-white text-xs uppercase px-3 py-1 rounded flex items-center gap-1">
                  <Sparkles size={14}/> Destaque
                </div>
              )}
              <h3 className="text-white font-bold text-xl uppercase">{s.name}</h3>
              {s.description && <p className="text-sm text-gray-400 mt-1">{s.description}</p>}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-white font-extrabold text-2xl">€{s.price}</span>
                <button onClick={() => onSelect?.(s)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md uppercase text-sm">Marcar este serviço</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
