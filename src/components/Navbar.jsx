import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#sobre', label: 'Sobre Nós' },
  { href: '#servicos', label: 'Serviços & Preços' },
  { href: '#marcacao', label: 'Marcação Online' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contactos', label: 'Contactos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur border-b border-red-600/40"> 
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="text-white font-extrabold tracking-widest text-lg">
          <span className="text-red-600">EL</span> PATRON
        </a>
        <nav className="hidden md:flex gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm uppercase tracking-wide text-gray-300 hover:text-white hover:border-b-2 border-red-600 pb-1 transition">
              {l.label}
            </a>
          ))}
        </nav>
        <button aria-label="menu" onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black border-t border-red-600/40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm uppercase tracking-wide text-gray-200 py-2 border-b border-white/10">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
