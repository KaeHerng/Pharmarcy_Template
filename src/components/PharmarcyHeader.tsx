// src/components/PharmacyHeader.tsx
import React, { useState } from "react";

export default function PharmacyHeader() {
    const [search, setSearch] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Search:", search);
        // Add search functionality here
    };

    return (
        <header className="bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between p-4">
                {/* Left: Logo */}
                <div className="flex items-center gap-2 text-2xl font-extrabold">
                    <span className="bg-white text-green-600 rounded-full p-1">💊</span>
                    KH PharmaShop
                </div>

                {/* Middle: Search bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex-1 max-w-lg mx-4 hidden sm:flex"
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-l-lg border-none outline-none text-gray-800"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-white text-green-600 rounded-r-lg font-semibold hover:bg-green-100 transition"
                    >
                        Search
                    </button>
                </form>

                {/* Right: Sign In / Sign Out */}
                <div className="hidden sm:flex items-center gap-4">
                    {isSignedIn ? (
                        <button
                            onClick={() => setIsSignedIn(false)}
                            className="px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-100 transition"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsSignedIn(true)}
                            className="px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-100 transition"
                        >
                            Sign In
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="sm:hidden">
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="text-white p-2 rounded-md hover:bg-green-700 transition"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="sm:hidden bg-green-600 px-4 py-4 space-y-4">
                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-l-lg border-none outline-none text-gray-800"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-white text-green-600 rounded-r-lg font-semibold hover:bg-green-100 transition"
                        >
                            Search
                        </button>
                    </form>

                    {/* Sign In / Sign Out */}
                    {isSignedIn ? (
                        <button
                            onClick={() => setIsSignedIn(false)}
                            className="w-full px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-100 transition"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsSignedIn(true)}
                            className="w-full px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-100 transition"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            )}
        </header>
    );
}
