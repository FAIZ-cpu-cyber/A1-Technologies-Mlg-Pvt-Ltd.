import React from 'react';
import { Link } from 'react-router-dom';
import { Product, WebsiteContent } from '../../types';
import Footer from '../shared/Footer';
import { WhatsAppButton } from '../shared/WhatsAppButton';
import { MOCK_WEBSITE_CONTENT } from '../admin/WebsiteManager'; // Editable content
import { MOCK_PRODUCTS } from '../admin/ProductManager'; // Editable products

const PublicHeader: React.FC = () => (
    <header className="bg-white shadow-md sticky top-0 z-40 no-print dark:bg-gray-800 dark:border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">A1 Technologies</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Industrial Air Cooler Solutions</p>
            </div>
            <Link to="/login" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                CRM Login
            </Link>
        </div>
    </header>
);

const LandingPage: React.FC = () => {
    const content = MOCK_WEBSITE_CONTENT;
    const products = MOCK_PRODUCTS;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <PublicHeader />
            <main>
                {/* Hero Section */}
                <section className="relative bg-green-700 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="container mx-auto px-4 py-24 text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">{content.hero.title}</h2>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-green-100">{content.hero.subtitle}</p>
                        <a href="#products" className="bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors text-lg">
                            Explore Our Products
                        </a>
                    </div>
                </section>
                
                {/* Stats Section */}
                <section className="bg-green-50 dark:bg-gray-800 py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {content.stats.map(stat => (
                                <div key={stat.id}>
                                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">{stat.value}</p>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Us Section */}
                 <section id="about" className="py-16">
                    <div className="container mx-auto px-4 text-center">
                         <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{content.about.title}</h3>
                         <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">{content.about.content}</p>
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="py-16 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Our Core Products</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map(product => (
                                <Link to={`/product/${product.id}`} key={product.id} className="block bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover"/>
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{product.name}</h4>
                                        <p className="font-bold text-lg text-green-600 dark:text-green-400 mb-3">₹{product.price.toLocaleString()}</p>
                                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                            {product.specifications.map((spec, i) => <li key={i}>{spec}</li>)}
                                        </ul>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Features/Why Choose Us Section */}
                <section className="bg-gray-50 dark:bg-gray-800 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">Why Choose A1 Technologies?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           {content.features.map(feature => (
                                <div key={feature.id} className="p-6">
                                    <div className="text-green-600 dark:text-green-400 mb-4" dangerouslySetInnerHTML={{ __html: feature.icon }}></div>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                </div>
                           ))}
                        </div>
                    </div>
                </section>

                 {/* Testimonials Section */}
                <section className="py-16 bg-green-600 text-white">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {content.testimonials.map(testimonial => (
                                <div key={testimonial.id} className="bg-green-700 p-6 rounded-lg shadow-lg">
                                    <p className="italic mb-4">"{testimonial.text}"</p>
                                    <p className="font-bold">{testimonial.customerName}</p>
                                    {testimonial.company && <p className="text-sm text-green-200">{testimonial.company}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default LandingPage;