
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white pt-10 pb-4 no-print">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">A1 Technologies MLG</h3>
                        <p className="text-gray-400">
                            Manufacturer and service provider of Industrial Air Coolers, Ducting, Motors, Pumps, and VFD Controllers.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p className="text-gray-400">Soygaon, Malegaon, Nashik, Maharashtra, 423203, India</p>
                        <p className="text-gray-400 mt-2">Email: info@a1technologies.com</p>
                        <p className="text-gray-400 mt-1">Phone: +91 9607900979</p>
                    </div>
                    <div className="h-64 md:h-auto rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.747970868884!2d74.5218763148902!3d20.55160898621404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdec5f2c5ffffff%3A0x9c3f0c3f0c3f0c3f!2sMalegaon%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1672526400000"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map of Malegaon"
                        ></iframe>
                    </div>
                </div>
                <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
                    <p>&copy; {new Date().getFullYear()} A1 Technologies MLG Private Limited. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
