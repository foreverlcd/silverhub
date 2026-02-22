import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Linkedin, Twitter, Instagram, Sparkles, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
      
      <div className="section-container py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
          {/* Brand */}
          <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:rotate-3 transition-transform duration-500">
                 <img src="/LogoSILVERHUB-transparent.png" alt="SilverHub" className="h-8 w-8 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight leading-none">
                  SILVER<span className="text-primary">HUB</span>
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Mentoría Inversa Digital</span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-sm">
              Conectamos la experiencia senior con el futuro tecnológico a través de una metodología de mentoría inversa única.
            </p>
            
            <div className="flex gap-4 items-center">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary/20 transition-all">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
              <div className="ml-4 h-px w-8 bg-white/10" />
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-8">Plataforma</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link to="/para-mentees" className="hover:text-primary transition-colors">Para Mentees</Link></li>
              <li><Link to="/para-mentores" className="hover:text-primary transition-colors">Para Mentores</Link></li>
              <li><Link to="/recursos" className="hover:text-primary transition-colors">Recursos</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-8">Comunidad</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/para-mentees" className="hover:text-primary transition-colors">Beneficios</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Membresías</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-xl">
              <h4 className="text-sm font-bold text-foreground mb-2">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-6">Recibe novedades sobre IA y liderazgo.</p>
              <div className="space-y-3">
                 <input type="email" placeholder="Tu correo electrónico" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 h-12 text-sm focus:outline-none focus:border-primary transition-all" />
                 <Button className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:bg-primary/90 transition-all">
                    Suscribirse
                 </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-muted-foreground opacity-60">
            © 2025 SILVERHUB — Hackaton Demo.
          </p>
          <div className="flex gap-8 text-xs font-medium text-muted-foreground opacity-60">
             <Link to="#" className="hover:text-primary transition-colors">Privacidad</Link>
             <Link to="#" className="hover:text-primary transition-colors">Términos</Link>
          </div>
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            Hecho con <Heart className="h-4 w-4 text-primary fill-primary" /> para el futuro senior
          </p>
        </div>
      </div>
    </footer>
  );
};
