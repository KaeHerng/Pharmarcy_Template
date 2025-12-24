import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
    images: string[];
    autoPlay?: boolean;
    interval?: number;
}

export default function CarouselSlider({ images, autoPlay = true, interval = 4000 }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const length = images.length;
    
    // 增加一个引用，用于获取容器宽度
    const containerRef = useRef<HTMLDivElement>(null);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev + 1) % length);
    }, [length]);

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev - 1 + length) % length);
    }, [length]);

    useEffect(() => {
        if (!autoPlay || isHovered) return;
        const timer = setInterval(nextSlide, interval);
        return () => clearInterval(timer);
    }, [nextSlide, autoPlay, interval, isHovered]);

    const handleDragEnd = (e: any, info: any) => {
        // info.offset.x 是拖拽的距离
        // info.velocity.x 是拖拽的速度
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        // 阈值判断：滑动超过 50px 或 速度超过 500
        if (offset < -50 || velocity < -500) {
            nextSlide();
        } else if (offset > 50 || velocity > 500) {
            prevSlide();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[1400px] mx-auto overflow-hidden rounded-2xl shadow-xl group bg-slate-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

            style={{ userSelect: "none", touchAction: "pan-y" }} 
        >
            {/* 图片轨道容器 */}
            <motion.div
                ref={containerRef}
                className="flex cursor-grab active:cursor-grabbing h-[300px] md:h-[500px] w-full"
                drag="x"
                // 桌面端修复：给 dragConstraints 提供一个 ref 或者设为 0
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                // 使用百分比进行平滑动画
                animate={{ x: `-${current * 100}%` }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}>
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className="w-full h-full flex-shrink-0">
                        <img
                            src={img}
                            alt={`slide-${index}`}
                            draggable="false" 
                            className="w-full h-full object-cover pointer-events-none select-none"
                        />
                    </div>
                ))}
            </motion.div>

            {/* 左右箭头 */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex pointer-events-none">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all shadow-lg active:scale-90 pointer-events-auto"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all shadow-lg active:scale-90 pointer-events-auto"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* 指示器 */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/20 backdrop-blur-sm z-10">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className="relative h-2 transition-all duration-300"
                    >
                        <div className={`h-full rounded-full transition-all duration-500 ${
                            current === idx ? "w-8 bg-green-500" : "w-2 bg-white/60 hover:bg-white"
                        }`} />
                    </button>
                ))}
            </div>
        </motion.div>
    );
}