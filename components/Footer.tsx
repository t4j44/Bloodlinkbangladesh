
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Footer = () => {
    const { t, language } = useLanguage();
    return (
        <footer className="bg-white mt-12 py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <div>
                        <h4 className="font-semibold text-gray-800">Red Connector</h4>
                        <p className="text-sm text-gray-500">Connect to save a life.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Contact</h4>
                        <p className="text-sm text-gray-500">Name: Tajuddin Ahamed</p>
                        <p className="text-sm text-gray-500">Mail: tajuddinahamed.contact@gmail.com</p>
                        <p className="text-sm text-gray-500">LinkedIn: <a href="https://www.linkedin.com/in/tajuddin-ahamed-4r4t4x/" target="_blank" rel="noreferrer" className="text-primary">Profile</a></p>
                    </div>
                    <div>
                        <p className={`${language === 'bn' ? 'font-display' : 'font-sans'}`}>
                            &copy; {new Date().getFullYear()} Red Connector.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
