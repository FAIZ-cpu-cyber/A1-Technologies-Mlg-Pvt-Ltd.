import React, { useState } from 'react';
import { Product } from '../../types';

export const MOCK_PRODUCTS: Product[] = [
    { id: 'p001', name: 'Industrial Cooler X1', imageUrl: 'https://picsum.photos/seed/cooler/300/200', specifications: ['5000 CFM Airflow', 'Durable Fiber Body', '3-Speed Motor'], price: 25000, description: 'The Industrial Cooler X1 is our flagship product, designed for maximum cooling efficiency in large industrial spaces. Its durable fiber body ensures longevity, while the powerful 3-speed motor provides customizable airflow up to 5000 CFM. Perfect for factories, warehouses, and workshops.' },
    { id: 'p002', name: 'Heavy Duty Ducting', imageUrl: 'https://picsum.photos/seed/ducting/300/200', specifications: ['24 Gauge GI Sheet', 'Customizable Length', 'Weather Resistant'], price: 5000, description: 'Our heavy-duty ducting is manufactured from high-quality 24 gauge galvanized iron sheets, making it resistant to weather and corrosion. Available in customizable lengths to fit any industrial setup, ensuring efficient and directed airflow from your cooling units.' },
    { id: 'p003', name: 'VFD Controller Z-500', imageUrl: 'https://picsum.photos/seed/vfd/300/200', specifications: ['Variable Frequency Drive', 'Energy Saving', 'Digital Display'], price: 12000, description: 'The VFD Controller Z-500 is a state-of-the-art Variable Frequency Drive that helps you save on energy costs by regulating motor speed. It features a clear digital display for easy monitoring and is compatible with a wide range of industrial motors and pumps.' },
];

const ProductForm: React.FC<{ product?: Product; onSave: (product: Product) => void; onCancel: () => void; }> = ({ product, onSave, onCancel }) => {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || 0);
    const [specs, setSpecs] = useState(product?.specifications.join(', ') || '');
    const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
    const [description, setDescription] = useState(product?.description || '');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: product?.id || `p${Date.now()}`,
            name,
            price: Number(price),
            specifications: specs.split(',').map(s => s.trim()),
            imageUrl: imageUrl || `https://picsum.photos/seed/${name}/300/200`,
            description,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
            <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" />
            <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} required className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" />
            <input type="text" placeholder="Image URL (or leave blank for placeholder)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" />
            <textarea placeholder="Specifications (comma-separated)" value={specs} onChange={e => setSpecs(e.target.value)} required className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" />
            <textarea placeholder="Full Product Description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" />
            <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">{product ? 'Update' : 'Add'} Product</button>
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-500 dark:text-white">Cancel</button>
            </div>
        </form>
    );
};


const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleSave = (product: Product) => {
        if (editingProduct) {
            setProducts(products.map(p => p.id === product.id ? product : p));
        } else {
            setProducts([product, ...products]);
        }
        setEditingProduct(null);
        setIsAdding(false);
    };

    const handleDelete = (productId: string) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Products</h3>
                {!isAdding && !editingProduct && (
                    <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add New Product</button>
                )}
            </div>
            
            {(isAdding || editingProduct) && (
                <ProductForm 
                    product={editingProduct || undefined}
                    onSave={handleSave}
                    onCancel={() => { setIsAdding(false); setEditingProduct(null); }}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h4 className="text-xl font-semibold">{product.name}</h4>
                            <p className="font-bold text-lg text-green-600 dark:text-green-400">₹{product.price.toLocaleString()}</p>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {product.specifications.map((spec, i) => <li key={i}>{spec}</li>)}
                            </ul>
                            <div className="flex gap-2 mt-4">
                                <button onClick={() => setEditingProduct(product)} className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300">Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManager;