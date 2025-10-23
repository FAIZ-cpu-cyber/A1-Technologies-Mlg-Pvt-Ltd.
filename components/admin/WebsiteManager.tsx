import React, { useState } from 'react';
import { WebsiteContent, Testimonial, Stat, Feature } from '../../types';

export const MOCK_WEBSITE_CONTENT: WebsiteContent = {
  hero: {
    title: "Unleash Peak Performance with A1 Cooling Solutions",
    subtitle: "Experience unparalleled efficiency and durability. We engineer industrial cooling systems that work as hard as you do, ensuring optimal temperature and air quality for any workspace."
  },
  stats: [
    { id: 'stat1', value: '1000+', label: 'Successful Installations' },
    { id: 'stat2', value: '24/7', label: 'Service & Support' },
    { id: 'stat3', value: '15+', label: 'Years of Experience' },
    { id: 'stat4', value: '99%', label: 'Customer Satisfaction' }
  ],
  about: {
      title: "About A1 Technologies",
      content: "A1 Technologies MLG Private Limited is a leading manufacturer and service provider based in Malegaon, India, specializing in high-performance Industrial Air Coolers, Ducting, Motors, Pumps, and VFD Controllers. With over 15 years of industry experience, our mission is to deliver robust, energy-efficient, and reliable solutions that meet the demanding needs of our industrial clients. We pride ourselves on quality craftsmanship and unwavering commitment to customer satisfaction."
  },
  features: [
    { id: 'feat1', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l-2-2m10 0l2-2m-2 10l2 2m-10 0l-2 2" /></svg>', title: 'Quality Manufacturing', description: 'We use top-grade materials to build robust and long-lasting industrial coolers, ducting, and motors.' },
    { id: 'feat2', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>', title: 'Expert Service', description: 'Our team of skilled technicians ensures prompt installation, maintenance, and support for all our products.' },
    { id: 'feat3', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>', title: 'Customer Satisfaction', description: 'We are committed to providing excellent customer service and ensuring your complete satisfaction.' }
  ],
  testimonials: [
    { id: 't1', customerName: 'Ravi Sharma', company: 'Sharma Textiles', text: 'A1 Technologies transformed our factory floor. The new coolers are efficient and the 24/7 support is a lifesaver. Highly recommended!' },
    { id: 't2', customerName: 'Priya Mehta', company: 'Mehta Logistics', text: 'The installation was seamless and professional. We have seen a significant drop in our energy bills since switching to their VFD controllers.' },
    { id: 't3', customerName: 'Anil Kumar', company: 'Kumar Auto Parts', text: 'Durable products and fantastic after-sales service. Their team is always ready to help. A truly reliable partner.' }
  ]
};


const WebsiteManager: React.FC = () => {
    const [content, setContent] = useState<WebsiteContent>(MOCK_WEBSITE_CONTENT);
    const [isEditingTestimonial, setIsEditingTestimonial] = useState<Testimonial | null>(null);

    const handleSave = () => {
        // In a real app, this would save to Firebase
        console.log('Saving content:', content);
        alert('Website content saved! (Check console for data)');
    };
    
    const handleTestimonialSave = (testimonial: Testimonial) => {
        // This is a mock save for the UI demo
        if (content.testimonials.find(t => t.id === testimonial.id)) {
            setContent(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === testimonial.id ? testimonial : t)}));
        } else {
             setContent(prev => ({ ...prev, testimonials: [...prev.testimonials, testimonial]}));
        }
        setIsEditingTestimonial(null);
    }
    
    const handleTestimonialDelete = (id: string) => {
        if (window.confirm('Delete this testimonial?')) {
            setContent(prev => ({...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }));
        }
    }

    return (
        <div className="space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Manage Website Content</h3>
                <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save All Changes</button>
            </div>
            
            {/* Hero Section */}
            <div className="space-y-4 p-4 border rounded-lg dark:border-gray-700">
                <h4 className="text-xl font-semibold">Hero Banner</h4>
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={content.hero.title} onChange={e => setContent(c => ({...c, hero: {...c.hero, title: e.target.value}}))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div>
                    <label className="block text-sm font-medium">Subtitle</label>
                    <textarea value={content.hero.subtitle} onChange={e => setContent(c => ({...c, hero: {...c.hero, subtitle: e.target.value}}))} rows={3} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
            </div>

            {/* About Section */}
             <div className="space-y-4 p-4 border rounded-lg dark:border-gray-700">
                <h4 className="text-xl font-semibold">About Us Section</h4>
                 <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={content.about.title} onChange={e => setContent(c => ({...c, about: {...c.about, title: e.target.value}}))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Content</label>
                    <textarea value={content.about.content} onChange={e => setContent(c => ({...c, about: {...c.about, content: e.target.value}}))} rows={5} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
            </div>
            
            {/* Testimonials */}
            <div className="space-y-4 p-4 border rounded-lg dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold">Testimonials</h4>
                    <button onClick={() => setIsEditingTestimonial({id: `t${Date.now()}`, customerName: '', text: ''})} className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add New</button>
                </div>
                {isEditingTestimonial && <TestimonialForm testimonial={isEditingTestimonial} onSave={handleTestimonialSave} onCancel={() => setIsEditingTestimonial(null)} />}
                <div className="space-y-2">
                    {content.testimonials.map(t => (
                        <div key={t.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                            <div>
                                <p className="font-semibold">{t.customerName} <span className="text-gray-500 font-normal">{t.company && `(${t.company})`}</span></p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{t.text}"</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsEditingTestimonial(t)} className="text-xs text-blue-600 hover:underline">Edit</button>
                                <button onClick={() => handleTestimonialDelete(t.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

const TestimonialForm: React.FC<{testimonial: Testimonial, onSave: (t: Testimonial) => void, onCancel: () => void}> = ({testimonial, onSave, onCancel}) => {
    const [name, setName] = useState(testimonial.customerName);
    const [company, setCompany] = useState(testimonial.company || '');
    const [text, setText] = useState(testimonial.text);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...testimonial, customerName: name, company, text });
    }

    return (
        <form onSubmit={handleSubmit} className="p-3 border rounded-md bg-gray-100 dark:bg-gray-600 space-y-3 my-2">
            <input type="text" placeholder="Customer Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-1 border rounded-md dark:bg-gray-500 dark:border-gray-400" />
            <input type="text" placeholder="Company (Optional)" value={company} onChange={e => setCompany(e.target.value)} className="w-full p-1 border rounded-md dark:bg-gray-500 dark:border-gray-400" />
            <textarea placeholder="Testimonial text" value={text} onChange={e => setText(e.target.value)} required rows={3} className="w-full p-1 border rounded-md dark:bg-gray-500 dark:border-gray-400" />
            <div className="flex gap-2">
                <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded-md text-sm">Save</button>
                <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-300 dark:bg-gray-500 rounded-md text-sm">Cancel</button>
            </div>
        </form>
    );
};

export default WebsiteManager;
