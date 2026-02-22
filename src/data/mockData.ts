import mentora1 from '@/assets/mentora-1.png';
import mentora2 from '@/assets/mentora-2.png';
import mentora3 from '@/assets/mentora-3.png';
import mentora4 from '@/assets/mentora-4.png';
import mentora5 from '@/assets/mentora-5.png';
import mentora6 from '@/assets/mentora-6.png';
import mentora7 from '@/assets/mentora-7.png';
import mentora8 from '@/assets/mentora-8.png';
import mentora9 from '@/assets/mentora-9.png';
import mentora10 from '@/assets/mentora-10.png';
import mentora11 from '@/assets/mentora-11.png';
import mentora12 from '@/assets/mentora-12.png';
import mentor1 from '@/assets/mentor-1.png';


export interface CoachDigital {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  country: string;
  imageUrl: string;
  bio: string;
  skills: string[];
  specialties: string[];
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  yearsExperience: number;
  languages: string[];
  availability: string[];
  pricePerSession: number;
  matchScore?: number;
  isVerified: boolean;
}

export interface Mentee {
  id: string;
  name: string;
  email: string;
  age: number;
  location: string;
  stage: 'profesional_senior' | 'ejecutivo' | 'director' | 'consultor';
  stemInterest: string; // Keep for internal logic, but usually referred to as Digital Transformation
  objective: string;
  level: 'principiante' | 'intermedio' | 'avanzado';
  clarityBefore: number;
  clarityAfter: number;
}

export const mentoras: CoachDigital[] = [
  {
    id: '1',
    name: 'Rocío',
    title: 'Estratega en IA Generativa & Prompt Engineering',
    company: 'Tech Innovators',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora1,
    bio: 'Especialista en habilitación tecnológica para la alta dirección. Transformo la sabiduría de líderes senior en potencia digital mediante IA Generativa.',
    skills: ['IA Generativa', 'Prompt Engineering', 'Automatización', 'Digital Tools'],
    specialties: ['IA Generativa', 'Automatización'],
    rating: 4.9,
    reviewCount: 127,
    sessionsCompleted: 245,
    yearsExperience: 5,
    languages: ['Español', 'Inglés'],
    availability: ['Lunes', 'Miércoles', 'Viernes'],
    pricePerSession: 59.00,
    matchScore: 92,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Camila',
    title: 'Analista de Business Intelligence & Data Strategy',
    company: 'DataMetrics',
    location: 'CDMX',
    country: 'México',
    imageUrl: mentora2,
    bio: 'Experta en democratización de datos. Guío a directores senior en el dominio de dashboards estratégicos y toma de decisiones basada en evidencia.',
    skills: ['Data Analytics', 'Power BI', 'Google Analytics', 'Data Storytelling'],
    specialties: ['Data Analytics', 'Business Intelligence'],
    rating: 4.8,
    reviewCount: 89,
    sessionsCompleted: 156,
    yearsExperience: 4,
    languages: ['Español', 'Portugués'],
    availability: ['Martes', 'Jueves', 'Sábado'],
    pricePerSession: 59.00,
    matchScore: 88,
    isVerified: true,
  },
  {
    id: '3',
    name: 'Ingrid',
    title: 'Arquitecta de Ecosistemas Colaborativos Digitales',
    company: 'RemoteWork Pro',
    location: 'São Paulo',
    country: 'Brasil',
    imageUrl: mentora3,
    bio: 'Maximizando la eficiencia operativa senior a través de entornos digitales de alto rendimiento. Especialista en flujo de trabajo y agilidad.',
    skills: ['Notion', 'Slack', 'Asana', 'Metodologías Ágiles'],
    specialties: ['Productividad', 'Colaboración Digital'],
    rating: 4.9,
    reviewCount: 203,
    sessionsCompleted: 312,
    yearsExperience: 6,
    languages: ['Español', 'Inglés', 'Portugués'],
    availability: ['Lunes', 'Miércoles', 'Sábado'],
    pricePerSession: 59.00,
    matchScore: 95,
    isVerified: true,
  },
];

export interface Session {
  id: string;
  mentorId: string;
  menteeId: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  rating?: number;
  feedback?: string;
  actionPlan?: string[];
}

export const testimonials = [
  {
    id: '1',
    name: 'Alberto Ruiz',
    age: 58,
    location: 'Lima, Perú',
    quote: 'Después de 30 años en finanzas, sentí que la IA me estaba dejando fuera. SilverHub me conectó con un coach que en 3 sesiones me enseñó a usar herramientas que hoy me permiten liderar proyectos de nuevo.',
    rating: 5,
    mentorName: 'Rocio',
  },
  {
    id: '2',
    name: 'Elena Benavides',
    age: 52,
    location: 'Arequipa, Perú',
    quote: 'El edadismo laboral es real, pero mi respuesta fue la actualización digital. Gracias a mi coach en SilverHub, ahora domino la analítica de datos y mi consultoría es más vigente que nunca.',
    rating: 5,
    mentorName: 'Camila',
  },
  {
    id: '3',
    name: 'Jorge Martínez',
    age: 63,
    location: 'Miraflores, Perú',
    quote: 'La hoja de ruta con IA de SilverHub me dio un norte claro. Superé el miedo a lo digital y redescubrí mi valor como profesional senior en esta economía moderna.',
    rating: 5,
    mentorName: 'Ingrid',
  },
];

export const platformStats = {
  mentorsActive: 150,
  sessionsCompleted: 5200,
  countriesReached: 4,
  satisfactionRate: 98,
};

export const adminStats = {
  totalUsers: 3247,
  activeUsers: 1823,
  activeMentors: 847,
  sessionsThisMonth: 456,
  averageSatisfaction: 4.8,
  totalRevenue: 34520,
  platformRevenue: 13808,
};
