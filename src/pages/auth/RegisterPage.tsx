import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Eye, EyeOff, ArrowRight, User, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('mentee');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await register(email, password, name, role);
      
      if (role === 'mentee') {
        navigate('/mentee/onboarding');
      } else if (role === 'mentora') {
        navigate('/mentora/onboarding');
      }
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-screen pt-20 pb-8 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-scale-in">
            <div className="text-center mb-8">
              <img 
                src="/mujeresdigitales.jpg" 
                alt="Logo" 
                className="h-12 w-12 rounded-xl object-cover mx-auto mb-4 shadow-md"
              />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Únete a Mujeres Digitales
              </h1>
              <p className="text-muted-foreground">
                Crea tu cuenta y comienza tu camino en STEM
              </p>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setRole('mentee')}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left',
                  role === 'mentee'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <User className={cn(
                  'h-6 w-6 mb-2',
                  role === 'mentee' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <p className={cn(
                  'font-medium',
                  role === 'mentee' ? 'text-primary' : 'text-foreground'
                )}>
                  Soy Mentee
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Busco orientación STEM
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRole('mentora')}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left',
                  role === 'mentora'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <GraduationCap className={cn(
                  'h-6 w-6 mb-2',
                  role === 'mentora' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <p className={cn(
                  'font-medium',
                  role === 'mentora' ? 'text-primary' : 'text-foreground'
                )}>
                  Soy Mentora
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Quiero guiar mujeres
                </p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-focus"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-focus"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="input-focus pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              Al registrarte, aceptas nuestros{' '}
              <a href="#" className="text-primary hover:underline">Términos</a> y{' '}
              <a href="#" className="text-primary hover:underline">Política de privacidad</a>
            </p>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
