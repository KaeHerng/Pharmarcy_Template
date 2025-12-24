import CarouselSlider from "../components/CarouselSlider";
import Carousel from "../components/Carousel";
import CarouselSlider2 from "../components/CarouselSlider2";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useNavigate();

    const images = [
        "https://guardian.com.my/media/wysiwyg/Ecom_homepage_hero_banner_-1900600_10.jpg?auto=webp&format=pjpg&quality=85",
        "https://files.blueprism.com/uploads/resources/_1200x630_crop_center-center_82_none/Pharmacy-Social.png?mtime=1662645043",
        "https://thumbs.dreamstime.com/b/doctor-medical-background-24834402.jpg",
        "https://imu.edu.my/wp-content/uploads/2024/06/SchoolofPharmacy_HeroBanner.png",
        "https://wellandmedical.com/wp-content/uploads/2015/08/Website-banner.jpg",
    ];

    const productsshow = [
        { id: 52, name: "Vitamin C", price: "RM 12", image: "https://estore.healthlane.com.my/image/cache/data/theme/Product/HLP/Lifesenze/lifesenze-9777989_250925174901-300x300@1x.jpg" },
        { id: 41, name: "Pain Relief", price: "RM 8", image: "https://cdn1.sgliteasset.com/rpharmac/images/product/product-2825742/cached/O8AydfoH65c42b42cdf7a_1707354946_420x420.png" },
        { id: 554, name: "Cough Syrup", price: "RM 15", image: "https://www.alpropharmacy.com/cdn/shop/files/my-11134211-820le-mi11drhjy2h4b2.jpg?v=1765530465&width=533" },
        { id: 123, name: "Face Mask", price: "RM 5", image: "https://aapharmacy.com.my/cdn/shop/products/sg-11134201-23010-7yyvgafk5ylva9_533x.jpg?v=1699326829" },
        { id: 785, name: "Hand Sanitizer", price: "RM 7", image: "https://aapharmacy.com.my/cdn/shop/files/Slide4_2ca5e9b6-3ba3-4749-8bca-898471591841_533x.jpg?v=1738593284" },
        { id: 421, name: "Bandages", price: "RM 3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-ermhoyNxuvnGvMaWICpXx2_pxQkU1YVKw&s" },
        { id: 886, name: "Thermometer", price: "RM 20", image: "https://www.bigpharmacy.com.my/site_media/img/INTERN_SEPTEMBER__82__20251014111619_bigpharmacy_bigpharmacy.png" },
        { id: 1236, name: "Eye Drops", price: "RM 9", image: "https://www.bigpharmacy.com.my/site_media/img/10013647_nb_20250806112615_bigpharmacy.png" },
        { id: 884, name: "Hand Sanitizer", price: "RM 7", image: "https://www.bigpharmacy.com.my/site_media/img/10022231_20250708161133_bigpharmacy.png" },
        { id: 978, name: "Bandages", price: "RM 3", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2FColesPharmacy%2Fimages%2Fproduct%2Fproduct-4625010%2Fcached%2F8LgjLjoY67372754d48bb_1731667796_420x420.jpg&w=3840&q=75" },
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

    const healthfood = [
        { id: 1, name: "Supplement-DM", price: "RM 58", image: "https://aapharmacy.com.my/cdn/shop/files/Slide1_43fed115-19e4-4f7c-872f-3b551671cc9d_533x.jpg?v=1763514239" },
        { id: 2, name: "Supplement-DM", price: "RM 88", image: "https://aapharmacy.com.my/cdn/shop/files/Slide4_2ca5e9b6-3ba3-4749-8bca-898471591841_533x.jpg?v=1738593284" },
        { id: 3, name: "Supplement-DM", price: "RM 100", image: "https://aapharmacy.com.my/cdn/shop/files/Slide4_283fd669-4d36-4ad1-8b4a-356bc6a7f24a_533x.jpg?v=1734335909" },
        { id: 4, name: "Supplement-DM", price: "RM 45", image: "https://aapharmacy.com.my/cdn/shop/files/ssmy.zone-1719994188-Slide7.jpg?v=1719995116" },
        { id: 5, name: "Supplement-DM", price: "RM 77", image: "https://www.bigpharmacy.com.my/site_media/img/10011262_EA_bigpharmacy.png9" },
        { id: 6, name: "Supplement-DM", price: "RM 88", image: "https://aapharmacy.com.my/cdn/shop/files/ssmy.zone-1740714698-Slide1_533x.jpg?v=1740715292" },
        { id: 7, name: "Supplement-DM", price: "RM 88", image: "https://aapharmacy.com.my/cdn/shop/files/Slide1_82923ada-a724-4da9-b82e-a3de77c175d1_533x.jpg?v=1721177296" },
        { id: 8, name: "GINGEN with Honey", price: "RM 40", image: "https://aapharmacy.com.my/cdn/shop/files/Slide7_32b5530c-86ef-4fad-bace-1b5d395849c1_533x.jpg?v=1724661945" },
    ]

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const handleViewMore = (category: string) => {
        navigate(`/ProductShareLayout/${category}`);
    };

    return (
        // <div className="w-full max-w-7xl mx-auto bg-white">
        <div className="w-full md:w-[80%] mx-auto bg-white">
            <main className="p-3 md:p-6 space-y-5 w-full">
                {/* <Carousel /> */}

                <CarouselSlider images={images} interval={4000} />

                <Carousel items={productsshow} itemsPerSlide={5} interval={3000} />

                <div>
                    <div className="flex justify-between mb-2">
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
                        " onClick={() => handleViewMore("Skin-care")}>
                            {`VIEW MORE >`}
                        </div>
                    </div>
                    <CarouselSlider2 items={productsshow} itemsPerSlide={5} interval={3000} />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
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
                            Health Food
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
                        " onClick={() => handleViewMore("Skin-care")}>
                            {`VIEW MORE >`}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, rotateY: 90 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="grid grid-cols-3 flex flex-row">
                        <div>
                            <img
                                src={'https://www.bigpharmacy.com.my/site_media/img/banners/Mailer_E-Store_banner_750px__w__x_452px__h__FA_-_Big_20251201142441.png'}
                                alt={'poster2'}
                                className="w-full h-40 sm:h-48 md:h-75 object-cover mb-3 select-none"
                                draggable={false}
                            />
                        </div>
                        <div>
                            <img
                                src={'https://www.bigpharmacy.com.my/site_media/img/banners/BCG_Year_Ed_Sale_Web_Banner_20251201144019.jpg'}
                                alt={'poster1'}
                                className="w-full h-40 sm:h-48 md:h-75 object-cover mb-3 select-none"
                                draggable={false}
                            />
                        </div>
                        <div>
                            <img
                                src={'https://www.bigpharmacy.com.my/site_media/img/banners/Big_Year_End_Mailer_-_Web_Banner__Desktop___Mobile___1250px_x_750px__20251201143209.png'}
                                alt={'poster3'}
                                className="w-full h-40 sm:h-48 md:h-75 object-cover mb-3 select-none"
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                    <CarouselSlider2 items={healthfood} itemsPerSlide={5} interval={3000} />
                </div>
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
