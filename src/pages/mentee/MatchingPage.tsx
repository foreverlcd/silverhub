import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MentorCard } from '@/components/MentorCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mentoras } from '@/data/mockData';
import {
  Search,
  Brain,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  const filteredMentoras = mentoras.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesArea = !areaFilter || mentor.specialties.some((s) => s.toLowerCase().includes(areaFilter.toLowerCase()));
    const matchesCountry = !countryFilter || mentor.country === countryFilter;

    return matchesSearch && matchesArea && matchesCountry;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setAreaFilter('');
    setCountryFilter('');
  };

  const hasActiveFilters = searchQuery || areaFilter || countryFilter;

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-700 selection:bg-primary/20">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="section-container">
          {/* Header Section */}
          <div className="mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">
               <Sparkles className="h-3 w-3" />
               Elite Digital Matching
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight leading-tight">
              Encuentra a tu <span className="text-primary">Coach Digital.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Algoritmo de IA optimizado para conectar tu sabiduría estratégica con la vanguardia tecnológica mundial.
            </p>
          </div>

          {/* Intelligent Algorithm Banner */}
          <div className="bg-card rounded-[3rem] p-8 md:p-12 mb-16 border border-border shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
               <Brain className="w-64 h-64" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="h-20 w-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shrink-0 transition-transform">
                <Sparkles className="h-10 w-10" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                  Matching Estratégico Activado
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-3xl">
                    Nuestros modelos priorizan perfiles alineados a tu <span className="font-bold text-primary italic">Roadmap Digital</span> personalizado. El Score de Match garantiza compatibilidad técnica y de visión corporativa.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="px-4 py-1.5 bg-success/10 text-success text-[10px] font-bold rounded-full border border-success/20 uppercase tracking-widest">IA Powered Preview</span>
                    <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20 uppercase tracking-widest">Global Expertise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-6 mb-16 sticky top-24 z-30">
            <div className="relative flex-1 group shadow-lg rounded-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="IA, Digital Strategy, Cloud Transformation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 pl-14 pr-6 rounded-2xl bg-background border-2 border-border focus:border-primary text-lg font-medium shadow-md transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="h-16 min-w-[200px] rounded-2xl bg-background border-2 border-border font-bold text-xs uppercase tracking-widest px-6 shadow-md hover:border-primary/40 transition-all">
                  <SelectValue placeholder="Especialidad" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border shadow-xl">
                   <SelectItem value="Backend" className="font-bold text-xs p-3 cursor-pointer">MAESTRÍA EN CÓDIGO</SelectItem>
                   <SelectItem value="ML" className="font-bold text-xs p-3 cursor-pointer">IA & DATA STRATEGY</SelectItem>
                   <SelectItem value="Security" className="font-bold text-xs p-3 cursor-pointer">CIBERSEGURIDAD</SelectItem>
                </SelectContent>
              </Select>

              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="h-16 min-w-[180px] rounded-2xl bg-background border-2 border-border font-bold text-xs uppercase tracking-widest px-6 shadow-md hover:border-primary/40 transition-all">
                   <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border shadow-xl">
                   <SelectItem value="Perú" className="font-bold p-3">PERÚ</SelectItem>
                   <SelectItem value="México" className="font-bold p-3">MÉXICO</SelectItem>
                   <SelectItem value="Colombia" className="font-bold p-3">COLOMBIA</SelectItem>
                   <SelectItem value="Brasil" className="font-bold p-3">BRASIL</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  className="h-16 px-6 font-bold uppercase text-[10px] tracking-widest text-destructive hover:bg-destructive/5 rounded-2xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  RESETEAR
                </Button>
              )}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-12 px-2 animate-fade-in">
             <div className="flex items-center gap-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-3">
                   <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                   {filteredMentoras.length} {filteredMentoras.length === 1 ? 'Perfil Encontrado' : 'Perfiles Encontrados'}
                </p>
             </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentoras.map((mentor, i) => (
              <div key={mentor.id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <MentorCard
                  {...mentor}
                  isRecommended={mentor.matchScore !== undefined && mentor.matchScore >= 92}
                  onViewProfile={() => navigate(`/mentora/${mentor.id}`)}
                  onBook={() => navigate(`/booking/${mentor.id}`)}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMentoras.length === 0 && (
            <div className="text-center py-32 bg-secondary/5 rounded-[3rem] border-2 border-dashed border-border">
              <div className="h-20 w-20 rounded-[1.5rem] bg-secondary/20 mx-auto mb-8 flex items-center justify-center">
                 <Search className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight">Sin resultados exactos.</h3>
              <p className="text-lg text-muted-foreground font-medium mb-12 max-w-md mx-auto">
                Prueba ajustando los filtros o busca términos más generales para encontrar a tu coach ideal.
              </p>
              <Button 
                onClick={clearFilters} 
                className="h-16 px-10 rounded-xl bg-primary text-primary-foreground font-bold uppercase text-xs tracking-widest shadow-xl"
              >
                 Ver Todos los Expertos
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MatchingPage;
