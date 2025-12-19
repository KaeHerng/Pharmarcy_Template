// src/components/Carousel.tsx
import React, { useState, useEffect, useRef } from "react";

interface CarouselProps {
    images: string[]; // Array of image URLs
    autoPlay?: boolean; // auto slide
    interval?: number; // ms
}

export default function CarouselSlider({ images, autoPlay = true, interval = 3000 }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const length = images.length;

    // Auto slide
    useEffect(() => {
        if (!autoPlay) return;
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, interval);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, autoPlay, interval, length]);

    const goToSlide = (index: number) => {
        setCurrent(index);
    };

    const nextSlide = () => setCurrent((current + 1) % length);
    const prevSlide = () => setCurrent((current - 1 + length) % length);

    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg h-70">
            {/* Images */}
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`slide-${index}`} className="w-full flex-shrink-0 object-cover h-64 md:h-96" />
                ))}
            </div>

            {/* Arrows */}
            <button
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100"
                onClick={prevSlide}
            >
                &#8592;
            </button>
            <button
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100"
                onClick={nextSlide}
            >
                &#8594;
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-3 h-3 rounded-full ${current === idx ? "bg-green-600" : "bg-white"}`}
                        onClick={() => goToSlide(idx)}
                    />
                ))}
            </div>
        </div>
    );
}
