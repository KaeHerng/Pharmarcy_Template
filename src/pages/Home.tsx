import CarouselSlider from "../components/CarouselSlider";
import Carousel from "../components/Carousel";
import CarouselSlider2 from "../components/CarouselSlider2";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProducts } from "../api";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);

    const images = [
        "https://t4.ftcdn.net/jpg/02/27/41/31/360_F_227413125_c5CgAhRF9FVpEYKzckx8le5cSMpYx9YP.jpg",
        "https://files.blueprism.com/uploads/resources/_1200x630_crop_center-center_82_none/Pharmacy-Social.png?mtime=1662645043",
        "https://ytipharmacy.com/wp-content/uploads/2024/12/pharmacy-1.jpg",
    ];

    const productsshow = [
        { id: 1, name: "Vitamin C", price: "RM 12", image: "https://estore.healthlane.com.my/image/cache/data/theme/Product/HLP/Lifesenze/lifesenze-9777989_250925174901-300x300@1x.jpg" },
        { id: 2, name: "Pain Relief", price: "RM 8", image: "https://cdn1.sgliteasset.com/rpharmac/images/product/product-2825742/cached/O8AydfoH65c42b42cdf7a_1707354946_420x420.png" },
        { id: 3, name: "Cough Syrup", price: "RM 15", image: "https://www.alpropharmacy.com/cdn/shop/files/my-11134211-820le-mi11drhjy2h4b2.jpg?v=1765530465&width=533" },
        { id: 4, name: "Face Mask", price: "RM 5", image: "https://aapharmacy.com.my/cdn/shop/products/sg-11134201-23010-7yyvgafk5ylva9_533x.jpg?v=1699326829" },
        { id: 5, name: "Hand Sanitizer", price: "RM 7", image: "https://aapharmacy.com.my/cdn/shop/files/Slide4_2ca5e9b6-3ba3-4749-8bca-898471591841_533x.jpg?v=1738593284" },
        { id: 6, name: "Bandages", price: "RM 3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-ermhoyNxuvnGvMaWICpXx2_pxQkU1YVKw&s" },
        { id: 7, name: "Thermometer", price: "RM 20", image: "https://www.bigpharmacy.com.my/site_media/img/INTERN_SEPTEMBER__82__20251014111619_bigpharmacy_bigpharmacy.png" },
        { id: 8, name: "Eye Drops", price: "RM 9", image: "https://www.bigpharmacy.com.my/site_media/img/10013647_nb_20250806112615_bigpharmacy.png" },
        { id: 9, name: "Hand Sanitizer", price: "RM 7", image: "https://www.bigpharmacy.com.my/site_media/img/10022231_20250708161133_bigpharmacy.png" },
        { id: 10, name: "Bandages", price: "RM 3", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2FColesPharmacy%2Fimages%2Fproduct%2Fproduct-4625010%2Fcached%2F8LgjLjoY67372754d48bb_1731667796_420x420.jpg&w=3840&q=75" },
        { id: 11, name: "Thermometer", price: "RM 20", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2FColesPharmacy%2Fimages%2Fproduct%2Fproduct-6123121%2Fcached%2FtEqti3Ch68ac1398522e1_1756107672_420x420.jpg&w=3840&q=75" },
        { id: 12, name: "Eye Drops", price: "RM 9", image: "https://cdn1.sgliteasset.com/ColesPharmacy/images/product/product-4084386/cached/4j3BCaXu665c351bbf197_1717318939_420x420.jpg" },
        { id: 13, name: "Hand Sanitizer", price: "RM 7", image: "https://filebroker-cdn.lazada.com.my/kf/S585ccc3298414013a0dd628bc289e570U.jpg" },
        { id: 14, name: "Hand Sanitizer", price: "RM 20", image: "https://www.bigpharmacy.com.my/site_media/img/125539EA-9314057015063_DifflamHextra-Front_20230824181440_bigpharmacy.png" },
        { id: 15, name: "Hand Sanitizer", price: "RM 10", image: "https://aapharmacy.com.my/cdn/shop/files/Slide1_4ef78735-81e4-4295-b7aa-c8b552fa54ee_533x.jpg?v=1715758350" },
        { id: 16, name: "Hand Sanitizer", price: "RM 10", image: "https://aapharmacy.com.my/cdn/shop/files/ssmy.zone-1763624199-Slide7_533x.jpg?v=1763624357" },
        { id: 17, name: "Hand Sanitizer", price: "RM 7", image: "https://filebroker-cdn.lazada.com.my/kf/S585ccc3298414013a0dd628bc289e570U.jpg" },
        { id: 18, name: "Hand Sanitizer", price: "RM 20", image: "https://www.bigpharmacy.com.my/site_media/img/125539EA-9314057015063_DifflamHextra-Front_20230824181440_bigpharmacy.png" },
        { id: 19, name: "Hand Sanitizer", price: "RM 10", image: "https://aapharmacy.com.my/cdn/shop/files/Slide1_4ef78735-81e4-4295-b7aa-c8b552fa54ee_533x.jpg?v=1715758350" },
        { id: 20, name: "Hand Sanitizer", price: "RM 10", image: "https://aapharmacy.com.my/cdn/shop/files/ssmy.zone-1763624199-Slide7_533x.jpg?v=1763624357" },
    ];

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto bg-white">
            <main className="p-6 space-y-10 w-full">
                {/* <Carousel /> */}

                <CarouselSlider images={images} interval={4000} />

                <Carousel items={productsshow} itemsPerSlide={5} interval={3000} />

                <CarouselSlider2 items={productsshow} itemsPerSlide={5} interval={3000} />

                <motion.section
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}>
                    <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                </motion.section>
            </main>
        </div>
    );
}
