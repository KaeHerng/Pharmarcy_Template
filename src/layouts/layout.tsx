// src/layouts/Layout.tsx
import React from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 w-full mx-auto p-4 mt-25">
                {children}
            </main>
            <Footer />
        </div>
    );
}
