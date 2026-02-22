import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Navbar} from '@/components/Navbar';
import {Footer} from '@/components/Footer';
import {MentorCard} from '@/components/MentorCard';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {mentoras} from '@/data/mockData';
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
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar/>

            <main className="pt-28 pb-20">
                <div className="section-container">
                    {/* Header Section */}
                    <div className="mb-12 animate-fade-in text-center md:text-left">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">
                            <Sparkles className="h-3 w-3"/>
                            Matching Estratégico
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                            Encuentra a tu <span className="text-primary">Coach Digital.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                            Nuestro algoritmo conecta tu sabiduría estratégica con la vanguardia tecnológica mundial.
                        </p>
                    </div>

                    {/* Algorithm Banner */}
                    <div
                        className="bg-card rounded-[2.5rem] p-8 md:p-12 mb-16 border border-border shadow-md relative overflow-hidden group">
                        <div
                            className="absolute top-0 right-0 p-12 opacity-[0.01] group-hover:scale-110 transition-transform duration-1000">
                            <Brain className="w-64 h-64"/>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <div
                                className="h-16 w-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shrink-0">
                                <Sparkles className="h-8 w-8"/>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                                    Priorización por Perfil
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-3xl">
                                        Sugerimos perfiles alineados a tus objetivos de transformación. El Score de
                                        Match mide la compatibilidad técnica y de visión corporativa.
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        <span
                                            className="px-3 py-1 bg-success/10 text-success text-[10px] font-bold rounded-lg border border-success/20 uppercase tracking-widest">IA Analítica Activa</span>
                                        <span
                                            className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg border border-primary/20 uppercase tracking-widest">Expertos Globales</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-12 sticky top-24 z-30">
                        <div className="relative flex-1 group">
                            <div
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
                                <Input
                                    type="text"
                                    placeholder="Buscar por tecnología, habilidad o nombre..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 pl-12 pr-6 rounded-xl bg-card border-border focus:border-primary text-base font-medium shadow-sm transition-all"
                                />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Select value={areaFilter} onValueChange={setAreaFilter}>
                                    <SelectTrigger
                                        className="h-14 min-w-[200px] rounded-xl bg-card border-border font-bold text-[10px] uppercase tracking-widest px-6 shadow-sm hover:border-primary/40 transition-all">
                                        <SelectValue placeholder="Especialidad"/>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border border-border">
                                        <SelectItem value="Backend"
                                                    className="font-bold text-[10px] p-3 uppercase tracking-widest">Backend</SelectItem>
                                        <SelectItem value="ML"
                                                    className="font-bold text-[10px] p-3 uppercase tracking-widest">IA &
                                            Data</SelectItem>
                                        <SelectItem value="Security"
                                                    className="font-bold text-[10px] p-3 uppercase tracking-widest">Ciberseguridad</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={countryFilter} onValueChange={setCountryFilter}>
                                    <SelectTrigger
                                        className="h-14 min-w-[150px] rounded-xl bg-card border-border font-bold text-[10px] uppercase tracking-widest px-6 shadow-sm hover:border-primary/40 transition-all">
                                        <SelectValue placeholder="País"/>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border border-border">
                                        <SelectItem value="Perú"
                                                    className="font-bold text-[10px] p-3 uppercase tracking-widest">Perú</SelectItem>
                                        <SelectItem value="México"
                                                    className="font-bold text-[10px] p-3 uppercase tracking-widest">México</SelectItem>
                                        <SelectItem value="Colombia"
                                                    className="font-bold text-[10px] p-3 uppercase tracking-widest">Colombia</SelectItem>
                                        <SelectItem value="Brasil"
                                                    className="font-bold text-[10px] p-3 uppercase tracking-widest">Brasil</SelectItem>
                                    </SelectContent>
                                </Select>

                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        onClick={clearFilters}
                                        className="h-14 px-6 font-bold uppercase text-[10px] tracking-widest text-destructive hover:bg-destructive/5 rounded-xl"
                                    >
                                        <X className="h-4 w-4 mr-2"/>
                                        Resetear
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div className="flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse"/>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {filteredMentoras.length} {filteredMentoras.length === 1 ? 'Perfil Encontrado' : 'Perfiles Encontrados'}
                                </p>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredMentoras.map((mentor, i) => (
                                <div key={mentor.id} className="animate-fade-in"
                                     style={{animationDelay: `${i * 100}ms`}}>
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
                            <div
                                className="text-center py-24 bg-secondary/5 rounded-[2.5rem] border border-border border-dashed">
                                <div
                                    className="h-16 w-16 rounded-2xl bg-secondary/10 mx-auto mb-6 flex items-center justify-center">
                                    <Search className="h-8 w-8 text-muted-foreground/30"/>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Sin resultados
                                    exactos.</h3>
                                <p className="text-muted-foreground font-medium mb-10 max-w-md mx-auto">
                                    Prueba ajustando los filtros o busca términos más generales para encontrar a tu
                                    coach digital ideal.
                                </p>
                                <Button
                                    onClick={clearFilters}
                                    className="h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold uppercase text-[10px] tracking-widest shadow-md"
                                >
                                    Ver Todos los Coaches
                                </Button>
                            </div>
                        )}
                    </div>
            </main>

            <Footer/>
        </div>
);
};

export default MatchingPage;
