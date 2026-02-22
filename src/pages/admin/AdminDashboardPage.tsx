import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { adminStats } from '@/data/mockData';
import { Users, UserCheck, Calendar, DollarSign, Star, AlertTriangle, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboardPage: React.FC = () => {
  const pendingMentors = [
    { id: '1', name: 'Laura Gómez', specialty: 'Ingeniería Civil', status: 'pending' },
    { id: '2', name: 'Patricia Ruiz', specialty: 'Biotecnología', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Métricas y gestión de la plataforma Mujeres Digitales.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Usuarias totales" value={adminStats.totalUsers.toLocaleString()} icon={Users} trend={{ value: 12, isPositive: true }} />
            <StatCard title="Usuarias activas" value={adminStats.activeUsers.toLocaleString()} icon={UserCheck} />
            <StatCard title="Mentoras activas" value={adminStats.activeMentors} icon={TrendingUp} />
            <StatCard title="Sesiones este mes" value={adminStats.sessionsThisMonth} icon={Calendar} />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Satisfacción promedio" value={`${adminStats.averageSatisfaction}/5`} icon={Star} />
            <StatCard title="Ingresos totales" value={`$${adminStats.totalRevenue.toLocaleString()}`} icon={DollarSign} subtitle="USD este mes" />
            <StatCard title="Ingresos plataforma (40%)" value={`$${adminStats.platformRevenue.toLocaleString()}`} icon={DollarSign} subtitle="USD" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" /> Mentoras pendientes de aprobación
              </h2>
              <div className="space-y-3">
                {pendingMentors.map((mentor) => (
                  <div key={mentor.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-sm text-muted-foreground">{mentor.specialty}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><XCircle className="h-4 w-4 mr-1" /> Rechazar</Button>
                      <Button size="sm"><CheckCircle className="h-4 w-4 mr-1" /> Aprobar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" /> Alertas de calidad
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Rating bajo detectado</p>
                    <p className="text-sm text-muted-foreground">Mentora ID #234 tiene rating 3.2 en últimas 5 sesiones</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success shrink-0" />
                  <p className="text-sm text-muted-foreground">Sin otras alertas activas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
