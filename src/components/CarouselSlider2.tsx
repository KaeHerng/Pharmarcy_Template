// src/components/Carousel.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}

interface CarouselProps {
    items: Product[];
    itemsPerSlide?: number;
    autoPlay?: boolean;
    interval?: number;
}

export default function Carousel({
    items,
    itemsPerSlide = 5,
    autoPlay = true,
    interval = 3000,
}: CarouselProps) {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const length = items.length;
    const totalDots = Math.ceil(items.length / itemsPerSlide);

    // ================ autoplay =================
    useEffect(() => {
        if (!autoPlay || length <= itemsPerSlide) return;

        timeoutRef.current = window.setTimeout(() => {
            setCurrent((prev) => (prev === length - 5 ? 0 : prev + 1) % length);
        }, interval);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, autoPlay, interval, length, itemsPerSlide]);

    // ================ controls =================
    const nextSlide = () => {
        setCurrent((prev) => (prev === length - 5 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
    };
    const goToSlide = (pageIndex: number) => {
        setCurrent(pageIndex * itemsPerSlide);
    };

    // ================ drag/swipe =================
    const startXRef = useRef(0);
    const isDraggingRef = useRef(false);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        isDraggingRef.current = true;
        startXRef.current =
            "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDraggingRef.current) return;
        const currentX =
            "touches" in e ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startXRef.current;

        // Optional: you can implement slide follow by diff px here
    };

    const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDraggingRef.current) return;
        const endX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
        const diff = endX - startXRef.current;

        if (diff > 50 && current > 0) prevSlide(); // swipe right → prev
        else if (diff < -50 && current < length - itemsPerSlide) nextSlide(); // swipe left → next

        isDraggingRef.current = false;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative w-full mx-auto overflow-hidden rounded-xl pb-10">

            {/* ===== Slides container ===== */}
            <div
                ref={containerRef}
                className="flex transition-transform duration-700 ease-in-out cursor-grab"
                style={{
                    transform: `translateX(-${(current * 100) / itemsPerSlide}%)`,
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {items.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="flex-shrink-0 px-3"
                        style={{ width: `${100 / itemsPerSlide}%` }}
                    >
                        <div className="bg-white rounded-xl p-4 flex flex-col items-center transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-green-500">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg mb-3 select-none"
                                draggable={false}
                            />
                            <div className="font-semibold text-center text-gray-800 text-lg">
                                {product.name}
                            </div>
                            <div className="text-green-600 font-bold text-md mt-1">
                                {product.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== Arrows ===== */}
            <button
                className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-green-100 hover:scale-110 transition-all duration-200"
                onClick={prevSlide}
            >
                &#8592;
            </button>
            <button
                className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-green-100 hover:scale-110 transition-all duration-200"
                onClick={nextSlide}
            >
                &#8594;
            </button>

            {/* ===== Dots ===== */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
                {Array.from({ length: totalDots }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-4 h-4 rounded-full border-2 transition-all ${Math.floor(current / itemsPerSlide) === idx
                            ? "bg-green-600 border-green-600"
                            : "bg-white border-gray-300"
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    );
}

