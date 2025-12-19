// src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Menu, X, ShoppingCart, MapPin, User } from "lucide-react";

export default function Header() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const pageLinks = [
        { label: "Home", to: "/" },
        { label: "Branch", to: "/branch" },
        { label: "Product", to: "/product" },
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" },
    ];

    return (
        <header className="w-full z-50 fixed top-0 left-0 shadow-lg">
            {/* Desktop Version */}
            <div className="hidden md:block">
                {/* Desktop header (可保留你原有的 layout) */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-[1600px] mx-auto relative flex items-center p-4">
                        {/* Logo */}
                        <div className="text-2xl font-extrabold text-green-600 flex items-center gap-2 z-10">
                            <span className="bg-green-100 text-green-600 rounded-full p-1">💊</span>
                            PharmaShop
                        </div>

                        {/* Search Bar 居中 */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 z-0 mx-auto flex justify-center">
                            <SearchBar />
                        </div>

                        {/* Right Buttons */}
                        <div className="ml-auto flex items-center gap-4 z-10">
                            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
                                Sign In
                            </button>
                            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
                                Register
                            </button>
                            <button className="relative p-2 rounded-lg hover:bg-green-50 transition">
                                <ShoppingCart size={24} className="text-green-600" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                    3
                                </span>
                            </button>
                            <button className="p-2 rounded-lg hover:bg-green-50 transition">
                                <MapPin size={24} className="text-green-600" />
                            </button>
                        </div>
                    </div>


                    {/* Desktop Page Links */}
                    <nav className="bg-gradient-to-r from-green-600 to-green-400">
                        <div className="max-w-[1600px] mx-auto flex justify-center p-3 space-x-8 text-white font-semibold">
                            {pageLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="hover:text-yellow-300 transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Version */}
            <div className="md:hidden">
                {/* First Row: Gradient Background */}
                <div className="bg-gradient-to-r from-green-600 to-green-400 p-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-extrabold text-white flex items-center gap-2">
                        <span className="bg-white text-green-600 rounded-full p-1">💊</span>
                        PharmaShop
                    </div>

                    {/* Right Buttons */}
                    <div className="flex items-center gap-2 relative">
                        {/* User Button */}
                        <div className="relative">
                            <button
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="p-2 rounded-md bg-white text-green-600 hover:bg-green-100 transition"
                            >
                                <User size={24} />
                            </button>
                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
                                    <Link
                                        to="/signin"
                                        className="block px-4 py-2 text-gray-800 hover:bg-green-100"
                                        onClick={() => setUserDropdownOpen(false)}>
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block px-4 py-2 text-gray-800 hover:bg-green-100"
                                        onClick={() => setUserDropdownOpen(false)}>
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Shopping Cart Button */}
                        <button className="p-2 rounded-md bg-white text-green-600 hover:bg-green-100 transition relative">
                            <ShoppingCart size={24} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                3
                            </span>
                        </button>

                        {/* Location Button */}
                        <button className="p-2 rounded-md bg-white text-green-600 hover:bg-green-100 transition">
                            <MapPin size={24} />
                        </button>
                    </div>
                </div>

                {/* Second Row: White Background */}
                <div className="bg-white flex items-center p-4 gap-2">
                    {/* Menu Button */}
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="p-2 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition">
                        <Menu size={24} />
                    </button>

                    {/* Search Bar */}
                    <SearchBar />
                </div>

                {/* Mobile Sidebar */}
                {mobileSidebarOpen && (
                    <>
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setMobileSidebarOpen(false)}
                        />
                        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
                            <button
                                className="mb-4 flex items-center gap-1 text-green-600"
                                onClick={() => setMobileSidebarOpen(false)}
                            >
                                <X size={20} /> Close
                            </button>
                            <ul className="flex flex-col gap-3">
                                {pageLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="text-gray-800 font-semibold hover:text-green-600 transition"
                                            onClick={() => setMobileSidebarOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}
