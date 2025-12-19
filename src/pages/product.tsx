import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Productdetails() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const { addToCart } = useCart();

    // 🔴 先 mock data（之后换 API）
    const product = {
        id,
        name: "Paracetamol 500mg",
        branch: "Paracetamol",
        price: "RM 12.90",
        sold: 245,
        rating: 4,
        images: [
            "https://media.istockphoto.com/id/1386911707/vector/supplement-bottle-packaging-cosmetic-package-product-design-beauty-label-3d-supplement.jpg?s=612x612&w=0&k=20&c=-aLLMvs8W3GoVxlxKzyHD-LOw4JgXa3e6nv_Md0gVD8=",
            "https://static.vecteezy.com/system/resources/previews/007/003/801/non_2x/supplement-bottle-packaging-cosmetic-package-product-design-product-label-3d-supplement-bottle-3d-white-plastic-pills-box-vector.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5EVu6PXHUPFc3xTIAHJDSbJoN-niE9qEqEA&s",
            "https://static.vecteezy.com/system/resources/previews/033/243/126/non_2x/supplement-bottle-packaging-cosmetic-package-product-design-beauty-label-3d-supplement-bottle-3d-white-plastic-pills-box-white-medical-container-healthcare-bottle-realistic-mock-up-vector.jpg",
        ],
        description:
            "Paracetamol is used to relieve mild to moderate pain and fever.",
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const QuantityonChange = (type: "add" | "subtract") => {
        setQuantity((prev) => {
            if (type === "add") return prev + 1;
            if (type === "subtract") return prev > 1 ? prev - 1 : 1;
            return prev;
        });
    };

    const handleAddToCart = () => {
        addToCart(
            {
                id: Number(product.id),
                name: product.name,
                price: Number(product.price.replace("RM", "")),
                image: product.images[0],
            },
            quantity
        );
        setShowToast(true);

        // 2.5 秒后自动消失
        setTimeout(() => {
            setShowToast(false);
        }, 2500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="max-w-[1400px] mx-auto p-6 bg-white">
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50">
                    <div className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg animate-slide-in">
                        <span className="text-xl">✅</span>
                        <div className="text-sm font-semibold">
                            Added to cart successfully
                        </div>
                    </div>
                </div>
            )}
            {/* Breadcrumb */}
            <div className="text-sm text-black mb-4 flex flex-row gap-2">
                <div className="hover:text-green-500 cursor-pointer hover:underline" onClick={() => navigate("/")}>Home</div>
                / <div className="hover:text-green-500 cursor-pointer hover:underline" onClick={() => navigate("/ProductShareLayout/medical-care")}>Product</div>
                / <div className="hover:text-green-500 cursor-pointer hover:underline">{product.name}</div>
            </div>

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left - Images */}
                <div>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full rounded-xl border"
                    />

                    <div className="flex gap-3 mt-4">
                        {product.images.map((img, idx) => (
                            <img
                                onClick={() => {
                                    const imgElement = document.querySelector(
                                        "img"
                                    ) as HTMLImageElement;
                                    imgElement.src = img;
                                }}
                                key={idx}
                                src={img}
                                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:border-green-500"
                            />
                        ))}
                    </div>
                </div>

                {/* Right - Info */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <h2 className="text-xl text-gray-400 font-semibold hover:text-green-500 cursor-pointer hover:underline">{product.branch}</h2>
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={18}
                                className={
                                    star <= product.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                }
                            />
                        ))}
                        <span className="text-sm text-gray-400">
                            {product.sold} sold
                        </span>
                    </div>

                    {/* Price */}
                    <div className="text-3xl font-bold text-green-600">
                        {product.price}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center">
                        <span className="font-semibold mr-3">Quantity</span>
                        <div className="w-8 px-2 py-1 border border-gray-300 
                            hover:bg-gray-100 text-center
                            disabled:opacity-40 cursor-pointer"
                            onClick={() => QuantityonChange("subtract")}>-</div>
                        <div className="w-15 px-2 py-1 border-y border-gray-300 text-center">{quantity}</div>
                        <div className="w-8 px-2 py-1 border border-gray-300 text-center
                            hover:bg-gray-100 cursor-pointer" onClick={() => QuantityonChange("add")}>+</div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button onClick={handleAddToCart} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                            Add to Cart
                        </button>
                        <button className="flex-1 border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-3">Product Description</h2>
                <p className="text-gray-600 leading-relaxed">
                    {product.description}
                </p>
            </div>
        </motion.div>
    );
}
