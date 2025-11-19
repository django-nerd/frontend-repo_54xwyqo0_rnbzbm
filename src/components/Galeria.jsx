import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { apiGet } from '../utils/api'

export default function Galeria(){
  const [videos, setVideos] = useState([])
  useEffect(()=>{ apiGet('/gallery').then(setVideos).catch(()=>setVideos([])) },[])

  return (
    <section id="galeria" className="bg-black text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <motion.h2 initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-white text-3xl md:text-4xl font-extrabold uppercase mb-8">Galeria</motion.h2>
        <div className="grid md:grid-cols-3 gap-4">
          {videos.map((v,i)=> (
            <motion.div key={v.id||i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.05 }} className="group relative overflow-hidden rounded border border-zinc-700 hover:border-red-600 transition">
              <div className="aspect-video bg-black">
                {v.platform==='mp4' ? (
                  <video controls src={v.url} className="w-full h-full object-cover"/>
                ) : (
                  <iframe src={v.url} title={v.title} loading="lazy" className="w-full h-full"></iframe>
                )}
              </div>
              <div className="absolute inset-0 ring-0 group-hover:ring-4 ring-red-600/60 transition pointer-events-none" />
              <div className="p-3 text-sm text-white bg-zinc-950/80">{v.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
