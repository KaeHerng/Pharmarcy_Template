// src/components/Footer.tsx
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-green-600 to-green-400 shadow-lg text-gray-200 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">KH Orchard</h2>
                        <p className="text-gray-600">
                            Your trusted online pharmacy for health, skincare, and supplements.
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Products</h3>
                        <ul className="space-y-2">
                            <li className="hover:text-green-400 cursor-pointer">Medical Care</li>
                            <li className="hover:text-green-400 cursor-pointer">Skin Care</li>
                            <li className="hover:text-green-400 cursor-pointer">Health Food</li>
                            <li className="hover:text-green-400 cursor-pointer">Supplements</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li className="hover:text-green-400 cursor-pointer">About Us</li>
                            <li className="hover:text-green-400 cursor-pointer">Careers</li>
                            <li className="hover:text-green-400 cursor-pointer">Blog</li>
                            <li className="hover:text-green-400 cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-green-400">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="hover:text-green-400">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="hover:text-green-400">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="hover:text-green-400">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-700 pt-4 text-center text-black text-sm">
                    &copy; {new Date().getFullYear()} KH Orchard. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
