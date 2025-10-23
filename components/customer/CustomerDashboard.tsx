import React, { useState } from 'react';
import { Product, ServiceRequest, ServiceStatus } from '../../types';
import { useAuth } from '../../App';
import { MOCK_PRODUCTS } from '../admin/ProductManager';
import { Link } from 'react-router-dom';

const MOCK_MY_REQUESTS: ServiceRequest[] = [
    { id: 'sr001', customerId: 'cust1', customerName: 'John Doe', productName: 'Industrial Cooler X1', issueDescription: 'Not cooling properly.', status: ServiceStatus.UNSOLVED, createdAt: '2023-10-26T10:00:00Z', address: '123 Main St, Mumbai' },
];


const ServiceRequestForm: React.FC<{ products: Product[], onSubmit: (req: ServiceRequest) => void, onCancel: () => void }> = ({ products, onSubmit, onCancel }) => {
    const { user } = useAuth();
    const [productId, setProductId] = useState(products[0]?.id || '');
    const [issue, setIssue] = useState('');
    const [address, setAddress] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const product = products.find(p => p.id === productId);
        if (!product || !user) return;
        
        onSubmit({
            id: `sr${Date.now()}`,
            customerId: user.id,
            customerName: user.name,
            productName: product.name,
            issueDescription: issue,
            address,
            status: ServiceStatus.UNSOLVED,
            createdAt: new Date().toISOString()
        });
    };
    
    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 space-y-4">
            <h4 className="text-xl font-semibold">New Service Request</h4>
            <select value={productId} onChange={e => setProductId(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500">
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <textarea placeholder="Describe the issue..." value={issue} onChange={e => setIssue(e.target.value)} required className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" />
            <textarea placeholder="Full Address for service" value={address} onChange={e => setAddress(e.target.value)} required className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" />
            <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Submit Request</button>
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-500 dark:text-white">Cancel</button>
            </div>
        </form>
    );
};

const CustomerDashboard: React.FC = () => {
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [myRequests, setMyRequests] = useState<ServiceRequest[]>(MOCK_MY_REQUESTS);
    const [isBooking, setIsBooking] = useState(false);

    const handleNewRequest = (request: ServiceRequest) => {
        setMyRequests([request, ...myRequests]);
        setIsBooking(false);
        alert('Service request booked successfully! Admin and technicians have been notified.');
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
        <div className="space-y-8">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Our Products</h2>
                    <button onClick={() => setIsBooking(true)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Book a Service</button>
                </div>
                 {isBooking && <ServiceRequestForm products={products} onSubmit={handleNewRequest} onCancel={() => setIsBooking(false)} />}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {products.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="block border rounded-lg overflow-hidden shadow-sm dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
                             <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h4 className="text-xl font-semibold">{product.name}</h4>
                                <p className="font-bold text-lg text-green-600 dark:text-green-400">₹{product.price.toLocaleString()}</p>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    {product.specifications.map((spec, i) => <li key={i}>{spec}</li>)}
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                 <h2 className="text-3xl font-bold mb-4">My Service Requests</h2>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-3">
                     {myRequests.map(req => (
                         <div key={req.id} className="border-b dark:border-gray-700 pb-3 last:border-b-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{req.productName}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">ID: {req.id}</p>
                                </div>
                                {getStatusChip(req.status)}
                            </div>
                            <p className="text-sm mt-1">{req.issueDescription}</p>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;