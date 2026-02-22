import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/para-mentees', label: 'Para Seniors' },
    { href: '/para-mentores', label: 'Para Mentores Jovenes' },
  ];

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'mentee':
        return user.isOnboarded ? '/mentee/dashboard' : '/mentee/onboarding';
      case 'mentora':
        return user.isOnboarded ? '/mentora/dashboard' : '/mentora/onboarding';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700">
      <div className="mx-auto px-4 sm:px-10 lg:px-16 pt-6">
        <div className="glass rounded-[1.5rem] px-8 h-16 md:h-20 flex items-center justify-between shadow-lg border-white/20 backdrop-blur-3xl bg-white/60 dark:bg-black/40">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-all duration-500 hover:scale-105 active:scale-95">
            <div className="h-10 w-10 bg-primary dark:bg-[hsl(232_85%_35%)] rounded-xl flex items-center justify-center p-1.5 border border-primary/20 group-hover:rotate-3 transition-transform">
              <img
                src="/LogoSILVERHUB-transparent.png"
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-xl tracking-tight leading-none bg-p">
                <span className="text-accent">Silver</span><span className="text-secondary dark:text-blue-600">Hub</span>
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">Mentoría Inversa</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-base font-semibold transition-all duration-300 relative py-2',
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons + ThemeToggle */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-12 gap-3 font-semibold text-base hover:bg-primary/5 rounded-xl border border-transparent hover:border-primary/10 px-4 transition-all">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                       {user?.name?.charAt(0)}
                    </div>
                    <span className="max-w-[120px] truncate">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border border-border bg-background/95 backdrop-blur-xl">
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/10 cursor-pointer py-3 font-semibold text-base">
                    <Link to={getDashboardLink()} className="flex items-center justify-between">
                       Mi Dashboard <ArrowRight className="h-4 w-4" />
                    </Link>
                  </DropdownMenuItem>
                  <div className="my-1 h-px bg-border/50" />
                  <DropdownMenuItem onClick={logout} className="rounded-xl focus:bg-destructive/10 text-destructive cursor-pointer py-3 font-semibold text-base">
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild className="font-semibold text-base rounded-xl px-6 h-12">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl px-8 h-12 shadow-md transition-all">
                  <Link to="/register">Registrarse</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden h-12 w-12 flex items-center justify-center hover:bg-primary/5 rounded-xl transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 p-4 glass rounded-3xl shadow-2xl border-white/20 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-lg font-medium py-4 px-6 rounded-2xl transition-all',
                    location.pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary/50'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-4 mt-2 border-t border-border/10">
                <div className="flex items-center justify-between px-6 py-3 bg-secondary/10 rounded-xl">
                  <span className="text-sm font-medium text-muted-foreground">Tema</span>
                  <ThemeToggle />
                </div>
                {isAuthenticated ? (
                  <>
                    <Button variant="outline" asChild className="rounded-xl h-14 font-medium border-primary/20">
                      <Link to={getDashboardLink()} onClick={() => setIsOpen(false)}>
                        Mi Panel
                      </Link>
                    </Button>
                    <Button variant="ghost" onClick={() => { logout(); setIsOpen(false); }} className="h-12 font-medium text-destructive">
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <div className="grid gap-3">
                    <Button variant="outline" asChild className="rounded-xl h-14 font-medium">
                      <Link to="/login" onClick={() => setIsOpen(false)}>Entrar</Link>
                    </Button>
                    <Button asChild className="rounded-xl h-14 font-medium bg-primary">
                      <Link to="/register" onClick={() => setIsOpen(false)}>Registrarse</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
