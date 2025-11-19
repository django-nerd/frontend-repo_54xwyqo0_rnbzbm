import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { apiGet, apiPost } from '../utils/api'
import { Phone, CalendarDays, MapPin, Clock } from 'lucide-react'

const todayStr = () => new Date().toISOString().slice(0,10)

export default function Marcacao({ preselected }) {
  const [locations, setLocations] = useState(['Faro','Olhão','Tavira'])
  const [location, setLocation] = useState('Faro')
  const [services, setServices] = useState([])
  const [service, setService] = useState(null)
  const [date, setDate] = useState(todayStr())
  const [slots, setSlots] = useState([])
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  useEffect(()=>{
    apiGet('/locations').then(setLocations).catch(()=>{})
    apiGet('/services').then(d=>{
      setServices(d)
      if (preselected) {
        const found = d.find(x=>x.id===preselected.id || x.name===preselected.name)
        if(found) setService(found)
      }
    })
  },[])

  useEffect(()=>{
    if (location && date) {
      apiGet(`/slots?location=${encodeURIComponent(location)}&date=${date}`).then(setSlots).catch(()=>setSlots([]))
      setTime('')
    }
  },[location,date])

  const canSubmit = useMemo(()=>{
    return location && service && date && time && name && phone
  },[location, service, date, time, name, phone])

  const confirm = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const payload = {
        location,
        service_id: service?.id,
        service_name: service?.name,
        date,
        time,
        name,
        phone,
        email: email || undefined
      }
      const res = await apiPost('/book', payload)
      setStatus({ type: 'success', message: res.message })
    } catch (err) {
      setStatus({ type: 'error', message: String(err.message || err) })
    }
  }

  return (
    <section id="marcacao" className="bg-black text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <motion.h2 initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-white text-3xl md:text-4xl font-extrabold uppercase mb-8 flex items-center gap-3">
          <CalendarDays className="text-red-600"/> Marcação Online
        </motion.h2>

        <form onSubmit={confirm} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm uppercase text-gray-400 mb-1">Localização</label>
              <div className="grid grid-cols-3 gap-2">
                {locations.map(l => (
                  <button type="button" key={l} onClick={()=>setLocation(l)} className={`px-3 py-2 rounded border text-sm ${location===l? 'bg-red-600 text-white border-red-600':'bg-zinc-900 text-gray-300 border-zinc-700 hover:border-red-600/50'}`}>
                    <MapPin className="inline mr-1" size={14}/> {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm uppercase text-gray-400 mb-1">Serviço</label>
              <select value={service?.id||''} onChange={(e)=>{
                const s = services.find(x=>x.id===e.target.value)
                setService(s||null)
              }} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white">
                <option value="">Seleciona um serviço</option>
                {services.map(s=>(
                  <option key={s.id} value={s.id}>{s.name} • €{s.price}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm uppercase text-gray-400 mb-1">Data</label>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white"/>
              </div>
              <div>
                <label className="block text-sm uppercase text-gray-400 mb-1">Hora</label>
                <div className="grid grid-cols-3 gap-2 max-h-40 overflow-auto p-1 bg-zinc-900 border border-zinc-700 rounded">
                  {slots.map(s=> (
                    <button type="button" key={s.datetime} disabled={!s.available} onClick={()=>setTime(s.datetime.slice(11,16))} className={`px-2 py-2 rounded text-sm ${time===s.datetime.slice(11,16)? 'bg-red-600 text-white':'bg-black/40 border border-zinc-700 text-gray-300 hover:border-red-600/50'} ${!s.available? 'opacity-30 cursor-not-allowed':''}`}>
                      <Clock className="inline mr-1" size={14}/> {s.datetime.slice(11,16)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm uppercase text-gray-400 mb-1">Nome</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white" placeholder="O teu nome"/>
              </div>
              <div>
                <label className="block text-sm uppercase text-gray-400 mb-1">Telefone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded pl-9 pr-3 py-2 text-white" placeholder="Contacto"/>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm uppercase text-gray-400 mb-1">Email (opcional)</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white" placeholder="email@exemplo.com"/>
            </div>

            <button disabled={!canSubmit || status==='loading'} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-md uppercase">Confirmar Marcação</button>
            {status?.type && (
              <p className={`text-sm ${status.type==='success'?'text-green-400':'text-red-400'}`}>{status.message}</p>
            )}
          </div>

          <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-red-600/30 rounded-lg p-6">
            <h3 className="text-white font-bold uppercase mb-2">Informação</h3>
            <p className="text-gray-400 text-sm">Depois de confirmares, o slot fica bloqueado. Em breve vamos integrar com Google Calendar e confirmações automáticas.</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>• Aberto de Segunda a Sábado, 10:00 - 19:00</li>
              <li>• Sem barbers fixos – escolhemos o melhor para ti</li>
              <li>• Pagamento no local</li>
            </ul>
          </div>
        </form>
      </div>
    </section>
  )
}
