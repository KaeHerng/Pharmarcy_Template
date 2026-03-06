import CarouselSlider from "../components/CarouselSlider";
import Carousel from "../components/Carousel";
import CarouselSlider2 from "../components/CarouselSlider2";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api";
import { RealEstateCard } from "../components/RealEstateCard";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useNavigate();

    const images = [
        "https://cdn.tractorkarvan.com/tr:f-webp/images/Blogs/Orchard/Orchard/Orange.jpg",
        "https://vcdn1-english.vnecdn.net/2024/10/09/DSC00011JPG1-1728470742-2260-1728470748.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=PHNGvhwUTaIGr9TLE3yldQ",
        "https://t3.ftcdn.net/jpg/11/86/50/36/360_F_1186503636_bzwqIUDLoHU4nrkQknIALYpDS8viQ2sW.jpg",
        "https://topfruits.com.my/wp-content/uploads/sites/261/2024/06/TF_Blog-Featured-Image_R01-scaled.jpg",
        "https://xinaday.com/wp-content/uploads/2021/04/penang-tropical-fruit-farm-cover-scaled.jpg",
    ];

    const productsshow = [
        { id: 52, name: "Musang King（猫山王 / D197）", price: "RM25 – RM60+ /kg", image: "https://cdn1.npcdn.net/images/b00087194dacad9bd58fcc4561bec6b1_1734420325.webp?md5id=83ceae014fabf2e56e69da4b132f4f6b&new_width=1000&new_height=1000&size=max&w=-62170008925&from=png&type=9" },
        { id: 41, name: "Black Thorn（D200 / 黑刺 / Durian Duri Hitam）", price: "RM40 – RM60+ /kg", image: "https://my-test-11.slatic.net/p/55870710e2a08ed72ae5c40f01fba54e.png" },
        { id: 554, name: "D24 / Sultan（D24）", price: "RM15 – RM30 /kg", image: "https://www.99oldtrees.com//image/cache/catalog/99oldtrees/durian/D24/IMG_20200705_175142-500x500.jpg" },
        { id: 123, name: "Tupai King（树鼠除 / 猴子王）", price: "RM100+ /kg", image: "https://down-my.img.susercontent.com/file/3659a505e3f18bef6457eea36681e59f" },
        { id: 785, name: "Kampung Durian（甘榜榴莲 / 野生榴莲）", price: "RM8 – RM15 /kg", image: "https://132712785.cdn6.editmysite.com/uploads/1/3/2/7/132712785/s262126716725454872_p5_i1_w400.jpeg" },
        { id: 421, name: "Red Prawn / Udang Merah（红虾 / Ang Heh）", price: "RM20 – RM40 /kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFZBY7sMzprxCmRBzBhr8gf6Gjvd-VtHnyJg&s" },
        { id: 886, name: "Hor Lor（D163）", price: "RM15 – RM30 /kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM7rpReR3oEeqksPp1kDqXU9RcwRWoR7DTJw&s" },
        { id: 1236, name: "D101 / Durian Mas（马来金）", price: "RM10 – RM25 /kg", image: "https://durydury.com/wp-content/uploads/2024/09/black-thorn-pro-img.jpg" },
        // { id: 884, name: "Hand Sanitizer", price: "RM 7", image: "https://www.bigpharmacy.com.my/site_media/img/10022231_20250708161133_bigpharmacy.png" },
        // { id: 978, name: "Bandages", price: "RM 3", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2FColesPharmacy%2Fimages%2Fproduct%2Fproduct-4625010%2Fcached%2F8LgjLjoY67372754d48bb_1731667796_420x420.jpg&w=3840&q=75" },
        // { id: 11, name: "Thermometer", price: "RM 20", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2FColesPharmacy%2Fimages%2Fproduct%2Fproduct-6123121%2Fcached%2FtEqti3Ch68ac1398522e1_1756107672_420x420.jpg&w=3840&q=75" },
        // { id: 12, name: "Eye Drops", price: "RM 9", image: "https://cdn1.sgliteasset.com/ColesPharmacy/images/product/product-4084386/cached/4j3BCaXu665c351bbf197_1717318939_420x420.jpg" },
        // { id: 13, name: "Hand Sanitizer", price: "RM 7", image: "https://filebroker-cdn.lazada.com.my/kf/S585ccc3298414013a0dd628bc289e570U.jpg" },
        // { id: 14, name: "Hand Sanitizer", price: "RM 20", image: "https://www.bigpharmacy.com.my/site_media/img/125539EA-9314057015063_DifflamHextra-Front_20230824181440_bigpharmacy.png" },
        // { id: 15, name: "Hand Sanitizer", price: "RM 10", image: "https://aapharmacy.com.my/cdn/shop/files/Slide1_4ef78735-81e4-4295-b7aa-c8b552fa54ee_533x.jpg?v=1715758350" },
        // { id: 16, name: "Hand Sanitizer", price: "RM 10", image: "https://aapharmacy.com.my/cdn/shop/files/ssmy.zone-1763624199-Slide7_533x.jpg?v=1763624357" },
        // { id: 17, name: "Hand Sanitizer", price: "RM 7", image: "https://filebroker-cdn.lazada.com.my/kf/S585ccc3298414013a0dd628bc289e570U.jpg" },
        // { id: 18, name: "Hand Sanitizer", price: "RM 20", image: "https://www.bigpharmacy.com.my/site_media/img/125539EA-9314057015063_DifflamHextra-Front_20230824181440_bigpharmacy.png" },
        // { id: 19, name: "Hand Sanitizer", price: "RM 10", image: "https://aapharmacy.com.my/cdn/shop/files/Slide1_4ef78735-81e4-4295-b7aa-c8b552fa54ee_533x.jpg?v=1715758350" },
        // { id: 20, name: "Hand Sanitizer", price: "RM 10", image: "https://aapharmacy.com.my/cdn/shop/files/ssmy.zone-1763624199-Slide7_533x.jpg?v=1763624357" },
    ];

    const healthfood = [
        { id: 1, name: "Papaya (Betik)", price: "RM 8", image: "https://media.post.rvohealth.io/wp-content/uploads/2020/09/papaya-benefits-732x549-thumbnail.jpg" },
        { id: 2, name: "Watermelon (Tembikai)", price: "RM 12", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR2eBUKsjuLAl0oqz7YvkZJFU1C3znejG4g&s" },
        { id: 3, name: "Mango (Mangga)", price: "RM 15", image: "https://www.melissas.com/cdn/shop/files/4-pounds-image-of-honey-mangos-fruit-1125637415_512x512.jpg?v=1738768090" },
        { id: 4, name: "Pineapple (Nenas)", price: "RM 10", image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg" },
        { id: 5, name: "Banana (Pisang)", price: "RM 5", image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
        { id: 6, name: "Dragon Fruit (Buah Naga)", price: "RM 20", image: "https://cdn1.npcdn.net/images/0e4b0fd6733746707cdb9f67dc398f8b_1721026243.webp?md5id=d2fb7247a8585505ca84d40afe37eea6&new_width=1000&new_height=1000&w=-62170008925&from=png&type=9" },
        { id: 7, name: "Papaya (Red)", price: "RM 9", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Papaya.jpg" },
        { id: 11, name: "Grapes (Anggur)", price: "RM 18", image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg" },
    ]

    
    const RealEstatelist = [
        {
          name: "canary melon (Tembikai Kuning)",
          images: [
            "https://earmata.com/wp-content/uploads/2024/11/canary-melons.jpg",
            "https://cdn11.bigcommerce.com/s-tevsl/images/stencil/1280x1280/products/3886/7792/2283_Canary_Yellow_Melon__47803.1760552163.jpg?c=2",
            "https://media.istockphoto.com/id/1131207167/photo/canary-melon.jpg?s=170667a&w=0&k=20&c=0vXLhgjXtTKnwO88Ota9x7wmtG71dQ54GkSBbtIq51g=",
          ],
          price: "RM 15",
          description: "Sweet and refreshing, perfect for hot days",
        },
        {
          name: "cherry's (Ceri)",
          images: [
            "https://static01.nyt.com/newsgraphics/2014/06/16/bittman-eat-cherry/ed5c4f4c098cd142650d7c00014e71abf85d2f86/eatopener_cherry.jpg",
            "https://media.istockphoto.com/id/477924422/photo/fresh-cherrys.jpg?s=612x612&w=0&k=20&c=f48Z8d3uo3Oldy4FPCuwNIOZkwHHDNXTGkoTaNyxq-o=",
            "https://media.istockphoto.com/id/1251326242/photo/cherrys-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=4Hi0l509-Z1cmU5LUwdQlq2_Wu0li1r8HMgXlUYRYyI=",
            "https://cdn.mos.cms.futurecdn.net/rC423pYNHAyGnivFvYxDdK.jpg",
          ],
          price: "RM 20",
          description: "Sweet and juicy, perfect for desserts",
        },
        {
          name: "Batumi, Georgia",
          images: [
            "https://ui.lukacho.com/_next/static/media/1.3a5bf91d.webp",
            "https://ui.lukacho.com/_next/static/media/2.6a8dd51d.webp",
            "https://ui.lukacho.com/_next/static/media/3.d95288b3.webp",
            "https://ui.lukacho.com/_next/static/media/4.0de1e023.webp",
          ],
          price: "RM 200",
          description: "5000 Kilometers away",
        },
        {
          name: "Batumi, Georgia",
          images: [
            "https://ui.lukacho.com/_next/static/media/1.3a5bf91d.webp",
            "https://ui.lukacho.com/_next/static/media/2.6a8dd51d.webp",
            "https://ui.lukacho.com/_next/static/media/3.d95288b3.webp",
            "https://ui.lukacho.com/_next/static/media/4.0de1e023.webp",
          ],
          price: "RM 200",
          description: "5000 Kilometers away",
        },
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
                            Other fruits
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
                                src={'https://place.matcha-jp.com/resize/1280x2000/2023/01/17-16-17-53-10012cb8deb8ccc4e1fb7e1432247f700a68.webp?w=656'}
                                alt={'poster2'}
                                className="w-full h-40 sm:h-48 md:h-75 object-cover mb-3 select-none"
                                draggable={false}
                            />
                        </div>
                        <div>
                            <img
                                src={'https://www.johornow.com/wp-content/uploads/2016/09/Desaru-Fruit-Farm-Tour.jpg'}
                                alt={'poster1'}
                                className="w-full h-40 sm:h-48 md:h-75 object-cover mb-3 select-none"
                                draggable={false}
                            />
                        </div>
                        <div>
                            <img
                                src={'https://img.freepik.com/premium-photo/marian-plum-fruit-marian-plum-tree-garden-tropical-fruit-orchard-name-thailand-sweet-yellow-marian-plum-maprang-plango-mayong-chid_73523-8966.jpg'}
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

                <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {RealEstatelist.map((item, index) => (
                    <RealEstateCard key={index} items={item} />
                  ))}
                </div>
            </main>
        </div>
    );
}
