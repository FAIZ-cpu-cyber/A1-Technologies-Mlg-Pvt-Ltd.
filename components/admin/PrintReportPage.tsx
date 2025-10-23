
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ServiceRequest, ServiceStatus } from '../../types';

// Mock data - in a real app, you would fetch this based on the ID
const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
    { id: 'sr001', customerId: 'cust1', customerName: 'John Doe', productName: 'Industrial Cooler X1', issueDescription: 'Not cooling properly.', status: ServiceStatus.UNSOLVED, createdAt: '2023-10-26T10:00:00Z', address: '123 Main St, Mumbai, Maharashtra' },
    { id: 'sr002', customerId: 'cust2', customerName: 'Jane Smith', productName: 'VFD Controller Z-500', issueDescription: 'Making a loud noise.', status: ServiceStatus.IN_PROCESS, assignedTechnicianId: 'tech1', assignedTechnicianName: 'Ramesh Kumar', createdAt: '2023-10-25T14:30:00Z', address: '456 Oak Ave, Pune, Maharashtra' },
    { id: 'sr003', customerId: 'cust3', customerName: 'Sam Wilson', productName: 'Water Pump 3000', issueDescription: 'Leaking from the base.', status: ServiceStatus.SOLVED, assignedTechnicianId: 'tech1', assignedTechnicianName: 'Ramesh Kumar', createdAt: '2023-10-22T09:00:00Z', feedback: { rating: 5, remarks: 'Excellent and fast service!' }, address: '789 Pine Ln, Nashik, Maharashtra' },
];


export const PrintReportPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const report = MOCK_SERVICE_REQUESTS.find(r => r.id === id);

    useEffect(() => {
        // Automatically trigger print dialog when component mounts
        window.print();
    }, []);

    if (!report) {
        return <div className="p-10">Report not found.</div>;
    }

    return (
        <div className="p-8 bg-white text-black font-sans">
            <div className="border-2 border-black p-6">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold">A1 Technologies MLG Private Limited</h1>
                    <p className="text-sm">Soygaon, Malegaon, Nashik, Maharashtra, 423203, India</p>
                    <h2 className="text-2xl font-semibold border-y-2 border-black my-4 py-2">SERVICE REPORT / LR FORMAT</h2>
                </header>
                
                <section className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 border-b-2 border-black pb-4">
                    <div><strong>Report ID:</strong> {report.id}</div>
                    <div><strong>Date:</strong> {new Date(report.createdAt).toLocaleDateString()}</div>
                    <div><strong>Customer Name:</strong> {report.customerName}</div>
                    <div><strong>Assigned Technician:</strong> {report.assignedTechnicianName || 'N/A'}</div>
                    <div className="col-span-2"><strong>Address:</strong> {report.address}</div>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Service Details</h3>
                    <table className="w-full border-collapse border border-black">
                        <tbody>
                            <tr className="border border-black">
                                <td className="font-semibold p-2 border-r border-black">Product Name:</td>
                                <td className="p-2">{report.productName}</td>
                            </tr>
                            <tr className="border border-black">
                                <td className="font-semibold p-2 border-r border-black">Issue Reported:</td>
                                <td className="p-2">{report.issueDescription}</td>
                            </tr>
                             <tr className="border border-black">
                                <td className="font-semibold p-2 border-r border-black">Technician Notes:</td>
                                <td className="p-2 h-24 align-top">{report.technicianNotes || '...'}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                
                <section className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Customer Feedback</h3>
                     <table className="w-full border-collapse border border-black">
                        <tbody>
                            <tr className="border border-black">
                                <td className="font-semibold p-2 border-r border-black">Rating:</td>
                                <td className="p-2">{report.feedback ? `${report.feedback.rating} / 5` : 'Not provided'}</td>
                            </tr>
                            <tr className="border border-black">
                                <td className="font-semibold p-2 border-r border-black">Remarks:</td>
                                <td className="p-2 h-20 align-top">{report.feedback?.remarks || '...'}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <footer className="grid grid-cols-2 gap-8 pt-10">
                    <div className="border-t-2 border-black pt-2">
                        <p className="font-semibold">Technician Signature</p>
                    </div>
                    <div className="border-t-2 border-black pt-2">
                        <p className="font-semibold">Customer Signature & Stamp</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};
