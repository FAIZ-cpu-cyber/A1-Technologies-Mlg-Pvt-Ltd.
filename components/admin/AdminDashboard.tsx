import React, { useState } from 'react';
import ProductManager from './ProductManager';
import ServiceManager from './ServiceManager';
import WebsiteManager from './WebsiteManager';

type Tab = 'services' | 'products' | 'website';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('services');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'services':
                return <ServiceManager />;
            case 'products':
                return <ProductManager />;
            case 'website':
                return <WebsiteManager />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
            
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'services' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Service Management
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'products' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Product Management
                    </button>
                    <button
                        onClick={() => setActiveTab('website')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'website' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Website Content
                    </button>
                </nav>
            </div>
            
            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;