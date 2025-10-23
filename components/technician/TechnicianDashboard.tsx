import React, { useState, useMemo } from 'react';
import { useAuth } from '../../App';
import { ServiceRequest, ServiceStatus, CustomerFeedback } from '../../types';

const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
    { id: 'sr002', customerId: 'cust2', customerName: 'Jane Smith', productName: 'VFD Controller Z-500', issueDescription: 'Making a loud noise.', status: ServiceStatus.IN_PROCESS, assignedTechnicianId: 'tech1', assignedTechnicianName: 'Ramesh Kumar', createdAt: '2023-10-25T14:30:00Z', address: '456 Oak Ave, Pune' },
    { id: 'sr004', customerId: 'cust4', customerName: 'Peter Jones', productName: 'Industrial Cooler X1', issueDescription: 'Fan not starting.', status: ServiceStatus.IN_PROCESS, assignedTechnicianId: 'tech1', assignedTechnicianName: 'Ramesh Kumar', createdAt: '2023-10-27T11:00:00Z', address: '321 Elm St, Mumbai' },
    { id: 'sr003', customerId: 'cust3', customerName: 'Sam Wilson', productName: 'Water Pump 3000', issueDescription: 'Leaking from the base.', status: ServiceStatus.SOLVED, assignedTechnicianId: 'tech1', assignedTechnicianName: 'Ramesh Kumar', createdAt: '2023-10-22T09:00:00Z', feedback: { rating: 5, remarks: 'Excellent and fast service!' }, address: '789 Pine Ln, Nashik' },
];

const CompletionForm: React.FC<{ request: ServiceRequest, onComplete: (reqId: string, notes: string, feedback: CustomerFeedback) => void, onCancel: () => void }> = ({ request, onComplete, onCancel }) => {
    const [notes, setNotes] = useState('');
    const [rating, setRating] = useState(0);
    const [remarks, setRemarks] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(rating === 0) {
            alert("Please ask the customer for a rating.");
            return;
        }
        onComplete(request.id, notes, { rating, remarks });
    };

    return (
        <div className="mt-4 p-4 border-t dark:border-gray-600">
            <h4 className="font-semibold text-lg mb-2">Completion Report</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    placeholder="Technician's completion notes..."
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                />
                <h5 className="font-semibold">Customer Feedback (Digital)</h5>
                <div className="flex items-center gap-2">
                    <span className="text-sm">Rating:</span>
                    {[1, 2, 3, 4, 5].map(star => (
                        <button type="button" key={star} onClick={() => setRating(star)} className="text-2xl">
                            {star <= rating ? '⭐' : '☆'}
                        </button>
                    ))}
                </div>
                <textarea
                    placeholder="Customer's remarks..."
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                />
                 <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Mark as Solved</button>
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-500 rounded-md">Cancel</button>
                </div>
            </form>
        </div>
    );
};


const TechnicianDashboard: React.FC = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_SERVICE_REQUESTS);
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

    const assignedRequests = useMemo(() => {
        return requests.filter(req => req.assignedTechnicianId === user?.id);
    }, [requests, user]);
    
    const handleComplete = (reqId: string, notes: string, feedback: CustomerFeedback) => {
        setRequests(prev => prev.map(req => 
            req.id === reqId 
            ? { ...req, status: ServiceStatus.SOLVED, technicianNotes: notes, feedback }
            : req
        ));
        setSelectedRequestId(null);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Assigned Sites</h2>
            <div className="space-y-4">
                {assignedRequests.length > 0 ? assignedRequests.map(req => (
                    <div key={req.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div><span className="font-semibold">Customer:</span> {req.customerName}</div>
                            <div><span className="font-semibold">Address:</span> {req.address}</div>
                            <div><span className="font-semibold">Product:</span> {req.productName}</div>
                             <div className="md:text-right">
                                {req.status === ServiceStatus.IN_PROCESS ? (
                                    <button onClick={() => setSelectedRequestId(req.id === selectedRequestId ? null : req.id)} className="px-3 py-1 bg-green-600 text-white rounded-md text-sm">Update Status</button>
                                ) : (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                                )}
                            </div>
                        </div>
                         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className="font-semibold">Issue:</span> {req.issueDescription}</p>

                        {selectedRequestId === req.id && (
                           <CompletionForm request={req} onComplete={handleComplete} onCancel={() => setSelectedRequestId(null)} />
                        )}
                    </div>
                )) : <p>No sites assigned.</p>}
            </div>
        </div>
    );
};

export default TechnicianDashboard;