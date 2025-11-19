import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Servicos from './components/Servicos'
import Marcacao from './components/Marcacao'
import Galeria from './components/Galeria'
import Contactos from './components/Contactos'
import { useState } from 'react'

function App() {
  const [preselect, setPreselect] = useState(null)

  return (
    <div className="bg-black text-white scroll-smooth">
      <Navbar />
      <Hero />
      <Sobre />
      <Servicos onSelect={(s)=>{ setPreselect(s); setTimeout(()=>{ document.querySelector('#marcacao')?.scrollIntoView({behavior:'smooth'}) }, 50) }} />
      <Marcacao preselected={preselect} />
      <Galeria />
      <Contactos />

      <footer className="border-t border-red-600/30 bg-black/80">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-400 flex items-center justify-between">
          <p>© {new Date().getFullYear()} EL PATRON. Todos os direitos reservados.</p>
          <p>Faro • Olhão • Tavira</p>
        </div>
      </footer>
    </div>
  )
}

export default App
