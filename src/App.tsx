import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "@/contexts/AuthContext";
import {ScrollToTop} from "@/components/ScrollToTop";

// Pages
import LandingPage from "./pages/LandingPage";
import ParaMenteesPage from "./pages/ParaMenteesPage";
import ParaMentoresPage from "./pages/ParaMentoresPage";
import ResourcesPage from "./pages/ResourcesPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import MenteeOnboardingPage from "./pages/mentee/MenteeOnboardingPage";
import MentoraOnboardingPage from "./pages/mentora/MentoraOnboardingPage";
import MenteeDashboardPage from "./pages/mentee/MenteeDashboardPage";
import MatchingPage from "./pages/mentee/MatchingPage";
import MentoraProfilePage from "./pages/mentee/MentoraProfilePage";
import BookingPage from "./pages/mentee/BookingPage";
import SessionRoomPage from "./pages/mentee/SessionRoomPage";
import MentoraDashboardPage from "./pages/mentora/MentoraDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NotFound from "./pages/NotFound";

// Rediseño integral: mentoría inversa
// Los jóvenes talentos son los mentores de los profesionales senior (50-65 años)
// Todas las páginas y componentes serán actualizadas para reflejar este enfoque

const App = () => (
    <AuthProvider>
        <TooltipProvider>
            <Toaster/>
            <Sonner/>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    {/* Public */}
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/para-mentees" element={<ParaMenteesPage/>}/>
                    <Route path="/para-mentores" element={<ParaMentoresPage/>}/>
                    <Route path="/recursos" element={<ResourcesPage/>}/>

                    {/* Auth */}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>

                    {/* Senior (antes mentee) */}
                    <Route path="/mentee/onboarding" element={<MenteeOnboardingPage/>}/>
                    <Route path="/mentee/dashboard" element={<MenteeDashboardPage/>}/>
                    <Route path="/session/:id" element={<SessionRoomPage/>}/>
                    <Route path="/matching" element={<MatchingPage/>}/>
                    <Route path="/mentora/:id" element={<MentoraProfilePage/>}/>
                    <Route path="/booking/:id" element={<BookingPage/>}/>

                    {/* Mentor joven (antes mentora) */}
                    <Route path="/mentora/onboarding" element={<MentoraOnboardingPage/>}/>
                    <Route path="/mentora/dashboard" element={<MentoraDashboardPage/>}/>

                    {/* Admin */}
                    <Route path="/admin/dashboard" element={<AdminDashboardPage/>}/>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </AuthProvider>
);

export default App;
