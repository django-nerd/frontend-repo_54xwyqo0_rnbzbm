import { motion } from 'framer-motion'

const lugares = [
  { cidade: 'Faro', morada: 'Rua Principal 10, Faro', tel: '+351 900 000 000', horario: 'Seg-Sáb 10:00 - 19:00', maps: 'https://maps.google.com/?q=Faro' },
  { cidade: 'Olhão', morada: 'Av. Central 22, Olhão', tel: '+351 900 000 001', horario: 'Seg-Sáb 10:00 - 19:00', maps: 'https://maps.google.com/?q=Olh%C3%A3o' },
  { cidade: 'Tavira', morada: 'Praça do Centro 5, Tavira', tel: '+351 900 000 002', horario: 'Seg-Sáb 10:00 - 19:00', maps: 'https://maps.google.com/?q=Tavira' },
]

export default function Contactos(){
  return (
    <section id="contactos" className="bg-black text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <motion.h2 initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-white text-3xl md:text-4xl font-extrabold uppercase mb-8">Contactos</motion.h2>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid md:grid-cols-3 gap-4">
            {lugares.map((l,i)=> (
              <motion.div key={l.cidade} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.05 }} className="border border-zinc-700 rounded p-4 bg-zinc-900/60">
                <h3 className="text-white font-bold uppercase">{l.cidade}</h3>
                <p className="text-sm text-gray-400">{l.morada}</p>
                <p className="text-sm text-gray-400">{l.horario}</p>
                <p className="text-sm text-gray-300">{l.tel}</p>
                <a href={l.maps} target="_blank" className="inline-block mt-2 text-xs uppercase bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded">Abrir no Maps</a>
                <div className="mt-3">
                  <iframe title={`map-${l.cidade}`} src={l.maps} className="w-full h-32 rounded"></iframe>
                </div>
              </motion.div>
            ))}
          </div>

          <form className="space-y-3 bg-zinc-900/60 border border-zinc-700 rounded p-4">
            <h3 className="text-white font-bold uppercase mb-2">Fala connosco</h3>
            <input placeholder="Nome" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white"/>
            <input placeholder="Email" type="email" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white"/>
            <textarea placeholder="Mensagem" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white min-h-[120px]"></textarea>
            <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-md uppercase">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  )
}
