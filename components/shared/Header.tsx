import React from 'react';
import { useAuth } from '../../App';
import { UserRole } from '../../types';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    const getRoleName = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMIN: return 'Admin Panel';
            case UserRole.TECHNICIAN: return 'Technician Panel';
            case UserRole.CUSTOMER: return 'Customer Portal';
            default: return '';
        }
    };

    return (
        <header className="bg-white shadow-md dark:bg-gray-800 no-print">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">A1 Technologies</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Industrial Air Cooler Solutions</p>
                </div>
                <div className="text-right">
                    {user && (
                        <>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{getRoleName(user.role)}</p>
                            <button
                                onClick={logout}
                                className="mt-1 text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;