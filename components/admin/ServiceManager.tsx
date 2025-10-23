import React, { useState, useMemo } from 'react';
import { ServiceRequest, ServiceStatus } from '../../types';
import { useNavigate } from 'react-router-dom';

const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
    { id: 'sr001', customerId: 'cust1', customerName: 'John Doe', productName: 'Industrial Cooler X1', issueDescription: 'Not cooling properly.', status: ServiceStatus.UNSOLVED, createdAt: '2023-10-26T10:00:00Z', address: '123 Main St, Mumbai' },
    { id: 'sr002', customerId: 'cust2', customerName: 'Jane Smith', productName: 'VFD Controller Z-500', issueDescription: 'Making a loud noise.', status: ServiceStatus.IN_PROCESS, assignedTechnicianId: 'tech1', assignedTechnicianName: 'Ramesh Kumar', createdAt: '2023-10-25T14:30:00Z', address: '456 Oak Ave, Pune' },
    { id: 'sr003', customerId: 'cust3', customerName: 'Sam Wilson', productName: 'Water Pump 3000', issueDescription: 'Leaking from the base.', status: ServiceStatus.SOLVED, assignedTechnicianId: 'tech1', assignedTechnicianName: 'Ramesh Kumar', createdAt: '2023-10-22T09:00:00Z', feedback: { rating: 5, remarks: 'Excellent and fast service!' }, address: '789 Pine Ln, Nashik' },
];

const MOCK_TECHNICIANS = [
    { id: 'tech1', name: 'Ramesh Kumar' },
    { id: 'tech2', name: 'Suresh Patil' },
];

const ServiceManager: React.FC = () => {
    const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_SERVICE_REQUESTS);
    const [filter, setFilter] = useState<ServiceStatus | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredRequests = useMemo(() => {
        return requests
            .filter(req => filter === 'all' || req.status === filter)
            .filter(req => 
                req.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [requests, filter, searchTerm]);

    const handleAssignTechnician = (requestId: string, techId: string) => {
        const technician = MOCK_TECHNICIANS.find(t => t.id === techId);
        if (!technician) return;
        setRequests(prev => prev.map(req => 
            req.id === requestId 
            ? { ...req, assignedTechnicianId: techId, assignedTechnicianName: technician.name, status: ServiceStatus.IN_PROCESS }
            : req
        ));
    };
    
    const getStatusChip = (status: ServiceStatus) => {
        const colors = {
            [ServiceStatus.UNSOLVED]: 'bg-red-100 text-red-800',
            [ServiceStatus.IN_PROCESS]: 'bg-yellow-100 text-yellow-800',
            [ServiceStatus.SOLVED]: 'bg-green-100 text-green-800',
        };
        return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>{status}</span>;
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Service Requests</h3>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input 
                    type="text"
                    placeholder="Search by customer, product, or ID..."
                    className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select 
                    className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    value={filter}
                    onChange={e => setFilter(e.target.value as ServiceStatus | 'all')}
                >
                    <option value="all">All Statuses</option>
                    <option value={ServiceStatus.UNSOLVED}>Unsolved</option>
                    <option value={ServiceStatus.IN_PROCESS}>In Process</option>
                    <option value={ServiceStatus.SOLVED}>Solved</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredRequests.map(req => (
                            <tr key={req.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{req.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{req.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{req.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusChip(req.status)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {req.status === ServiceStatus.UNSOLVED ? (
                                        <select 
                                            className="text-xs p-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                            onChange={e => handleAssignTechnician(req.id, e.target.value)}
                                            value=""
                                        >
                                            <option value="" disabled>Assign...</option>
                                            {MOCK_TECHNICIANS.map(tech => <option key={tech.id} value={tech.id}>{tech.name}</option>)}
                                        </select>
                                    ) : (
                                        req.assignedTechnicianName || 'N/A'
                                    )}
                                </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => navigate(`/print-report/${req.id}`)}
                                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200"
                                    >
                                        Print LR
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServiceManager;