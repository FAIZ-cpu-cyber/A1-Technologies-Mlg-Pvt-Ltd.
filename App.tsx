import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, UserRole, AuthContextType } from './types';
import LandingPage from './components/public/LandingPage';

// Mock User Data - In a real app, this would come from Firebase Auth
const MOCK_USERS: User[] = [
  { id: 'admin1', email: 'admin@a1.com', role: UserRole.ADMIN, name: 'Admin User' },
  { id: 'tech1', email: 'tech@a1.com', role: UserRole.TECHNICIAN, name: 'Ramesh Kumar' },
  { id: 'cust1', email: 'customer@a1.com', role: UserRole.CUSTOMER, name: 'John Doe' },
];

// Components
import LoginPage from './components/auth/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import TechnicianDashboard from './components/technician/TechnicianDashboard';
import CustomerDashboard from './components/customer/CustomerDashboard';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { WhatsAppButton } from './components/shared/WhatsAppButton';
import { PrintReportPage } from './components/admin/PrintReportPage';
import ProductDetailPage from './components/public/ProductDetailPage';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking auth state
        const storedUser = localStorage.getItem('a1-crm-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email: string) => {
        const foundUser = MOCK_USERS.find(u => u.email === email);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('a1-crm-user', JSON.stringify(foundUser));
            return foundUser;
        }
        return null;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('a1-crm-user');
    };

    const value = { user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const AppRouter: React.FC = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const isPrintRoute = location.pathname.startsWith('/print-report');

    return (
        <div className="flex flex-col min-h-screen">
            {!isPrintRoute && user && <Header />}
            <main className={`flex-grow ${user && !isPrintRoute ? 'container mx-auto px-4 py-8' : ''}`}>
                 <Routes>
                    <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
                    <Route path="/print-report/:id" element={
                        <ProtectedRoute role={UserRole.ADMIN}>
                            <PrintReportPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/" element={
                        user ? (
                            <>
                                {user.role === UserRole.ADMIN && <AdminDashboard />}
                                {user.role === UserRole.TECHNICIAN && <TechnicianDashboard />}
                                {user.role === UserRole.CUSTOMER && <CustomerDashboard />}
                            </>
                        ) : (
                            <LandingPage />
                        )
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            {!isPrintRoute && (
                <>
                    <Footer />
                    <WhatsAppButton />
                </>
            )}
        </div>
    );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode; role: UserRole }> = ({ children, role }) => {
    const { user } = useAuth();
    if (!user || user.role !== role) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

export default function App() {
    return (
        <AuthProvider>
            <HashRouter>
                <AppRouter />
            </HashRouter>
        </AuthProvider>
    );
}