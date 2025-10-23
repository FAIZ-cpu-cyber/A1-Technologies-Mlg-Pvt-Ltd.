import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../admin/ProductManager'; // Using shared mock data
import PublicHeader from './LandingPage'; // Re-using for consistent public view
import { useAuth } from '../../App';


const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link to="/" className="text-green-600 hover:underline mt-4 inline-block">Back to Home</Link>
            </div>
        );
    }
    
    const handleBookService = () => {
        if (user) {
            navigate('/'); // Navigate to customer dashboard
        } else {
            navigate('/login'); // Prompt login
        }
    };


    return (
        <div className="bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <div>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-lg object-cover aspect-square"/>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">{product.name}</h1>
                        <p className="text-3xl font-semibold text-green-600 dark:text-green-400 mb-6">₹{product.price.toLocaleString()}</p>
                        
                        <div className="prose dark:prose-invert max-w-none mb-6">
                            <p className="lead">{product.description}</p>
                        </div>

                        <div className="border-t dark:border-gray-700 pt-6">
                            <h3 className="text-xl font-semibold mb-3">Key Specifications</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                                {product.specifications.map((spec, i) => <li key={i}>{spec}</li>)}
                            </ul>
                        </div>
                        
                        <div className="mt-8">
                             <button 
                                onClick={handleBookService}
                                className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-lg"
                            >
                                Book a Service for this Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;