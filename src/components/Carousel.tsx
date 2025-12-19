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
    interval = 4000,
}: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const navigate = useNavigate();

    const slides: Product[][] = [];
    for (let i = 0; i < items.length; i += itemsPerSlide) {
        slides.push(items.slice(i, i + itemsPerSlide));
    }
    const length = slides.length;

    useEffect(() => {
        if (!autoPlay) return;

        timeoutRef.current = window.setTimeout(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, interval);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, autoPlay, interval, length]);


    const handleViewMore = (category: string) => {
        navigate(`/ProductShareLayout/${category}`);
    };

    const nextSlide = () => setCurrent((current + 1) % length);
    const prevSlide = () => setCurrent((current - 1 + length) % length);
    const goToSlide = (index: number) => setCurrent(index);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }} className="relative w-full mx-auto overflow-hidden rounded-xl pb-10">
            {/* Slides container */}
            <div className="flex justify-between">
                <div className="relative inline-block
                  text-lg font-bold
                  bg-gradient-to-r from-green-600 to-green-400
                  bg-clip-text text-transparent
                  after:content-['']
                  after:absolute
                  after:left-0 after:bottom-0
                  after:h-[2px] after:w-full
                  after:bg-gradient-to-r after:from-green-600 after:to-green-400
                ">
                    New Arrival
                </div>
                <div className="relative inline-block
                  text-lg font-bold
                  bg-gradient-to-r from-green-600 to-green-400
                  bg-clip-text text-transparent
                  after:content-['']
                  after:absolute
                  after:left-0 after:bottom-0
                  cursor-pointer hover:scale-103 transition-all duration-200
                  after:bg-gradient-to-r after:from-green-600 after:to-green-400
                " onClick={() => handleViewMore("medical-care")}>
                    {`VIEW MORE >`}
                </div>
            </div>
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0 w-full grid grid-cols-2 md:grid-cols-5 gap-6 py-4">
                        {slide.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="bg-white rounded-xl p-4 flex flex-col items-center transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-green-500">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-56 md:h-50 object-cover rounded-lg mb-3"
                                />
                                <div className="font-semibold text-center text-gray-800 text-lg">{product.name}</div>
                                <div className="text-green-600 font-bold text-md mt-1">{product.price}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-green-100 hover:scale-110 transition-all duration-200"
                onClick={prevSlide}
            >
                &#8592;
            </button>
            <button
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-green-100 hover:scale-110 transition-all duration-200"
                onClick={nextSlide}
            >
                &#8594;
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-4 h-4 rounded-full border-2 border-gray-300 ${current === idx ? "bg-green-600 border-green-600" : "bg-white"}`}
                        onClick={() => goToSlide(idx)}
                    />
                ))}
            </div>
        </motion.div>
    );
}
