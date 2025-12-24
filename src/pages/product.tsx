import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { 
    Star, 
    Minus, 
    Plus, 
    Share2, 
    Heart, 
    Truck, 
    ShieldCheck, 
    ChevronRight,
    ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    // Fake data logic (Stayed same as requested)
    const product = {
        id,
        name: "Paracetamol 500mg",
        branch: "HealthPlus Pharma",
        price: 12.90,
        originalPrice: 15.00,
        sold: 245,
        rating: 4.8,
        images: [
            "https://media.istockphoto.com/id/1386911707/vector/supplement-bottle-packaging-cosmetic-package-product-design-beauty-label-3d-supplement.jpg?s=612x612&w=0&k=20&c=-aLLMvs8W3GoVxlxKzyHD-LOw4JgXa3e6nv_Md0gVD8=",
            "https://static.vecteezy.com/system/resources/previews/007/003/801/non_2x/supplement-bottle-packaging-cosmetic-package-product-design-product-label-3d-supplement-bottle-3d-white-plastic-pills-box-vector.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5EVu6PXHUPFc3xTIAHJDSbJoN-niE9qEqEA&s",
            "https://static.vecteezy.com/system/resources/previews/033/243/126/non_2x/supplement-bottle-packaging-cosmetic-package-product-design-beauty-label-3d-supplement-bottle-3d-white-plastic-pills-box-white-medical-container-healthcare-bottle-realistic-mock-up-vector.jpg",
        ],
        description: "Paracetamol 500mg is a reliable and fast-acting medication used to provide effective relief from mild to moderate pain, including headaches, toothaches, and muscle aches. It is also highly effective in reducing fever and managing symptoms of cold and flu.",
        specs: [
            { label: "Active Ingredient", value: "Paracetamol 500mg" },
            { label: "Dosage Form", value: "Tablet" },
            { label: "Pack Size", value: "10 Tablets / Strip" },
            { label: "Regulatory", value: "MAL19910001X" }
        ]
    };

    const [selectedImg, setSelectedImg] = useState(product.images[0]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleAddToCart = () => {
        addToCart({
            id: Number(product.id),
            name: product.name,
            price: product.price,
            image: product.images[0],
        }, quantity);
        
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Elegant Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed bottom-10 left-1/2 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px]"
                    >
                        <div className="bg-emerald-500 p-1 rounded-full">
                            <ShoppingBag size={18} className="text-white" />
                        </div>
                        <span className="font-medium flex-1">Added {quantity} items to cart!</span>
                        <button onClick={() => navigate("/cart")} className="text-emerald-400 font-bold text-sm hover:underline underline-offset-4">VIEW CART</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1300px] mx-auto p-4 md:p-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <span onClick={() => navigate("/")} className="hover:text-emerald-600 cursor-pointer transition-colors">Home</span>
                    <ChevronRight size={14} />
                    <span onClick={() => navigate("/ProductShareLayout/medical-care")} className="hover:text-emerald-600 cursor-pointer transition-colors">Medical Care</span>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 font-semibold truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT: Image Gallery */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div 
                            layoutId="main-img"
                            className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden aspect-square flex items-center justify-center p-8 shadow-sm"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImg}
                                    src={selectedImg}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-contain"
                                />
                            </AnimatePresence>
                        </motion.div>

                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImg(img)}
                                    className={`relative w-24 h-24 flex-shrink-0 rounded-2xl border-2 transition-all p-2 bg-white ${
                                        selectedImg === img ? "border-emerald-500 shadow-md" : "border-transparent hover:border-slate-200"
                                    }`}
                                >
                                    <img src={img} className="w-full h-full object-contain rounded-lg" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-10 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                        In Stock
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200 shadow-sm"><Share2 size={20} className="text-slate-500" /></button>
                                        <button className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200 shadow-sm"><Heart size={20} className="text-slate-500" /></button>
                                    </div>
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 leading-tight">{product.name}</h1>
                                <p className="text-emerald-600 font-bold text-lg hover:underline cursor-pointer">{product.branch}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                                    <Star size={18} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-yellow-700">{product.rating}</span>
                                </div>
                                <span className="text-slate-400 text-sm font-medium">|</span>
                                <span className="text-slate-500 text-sm font-semibold">{product.sold}+ items sold</span>
                            </div>

                            <div className="py-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl font-black text-emerald-600 tracking-tighter">RM {product.price.toFixed(2)}</span>
                                    <span className="text-slate-400 line-through text-lg font-medium">RM {product.originalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Quantity Pill */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-800 uppercase tracking-wide">Select Quantity</label>
                                <div className="flex items-center w-fit bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-600 disabled:opacity-30"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={20} strokeWidth={3} />
                                    </button>
                                    <span className="w-12 text-center font-black text-xl text-slate-800">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-600"
                                    >
                                        <Plus size={20} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button 
                                    onClick={handleAddToCart}
                                    className="flex-[2] bg-emerald-600 text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    Add to Cart
                                </button>
                                <button className="flex-1 bg-slate-900 text-white h-14 rounded-2xl font-bold text-lg hover:bg-slate-800 active:scale-95 transition-all">
                                    Buy Now
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <Truck className="text-emerald-500" size={24} />
                                    <div className="text-[11px] leading-tight uppercase font-black text-slate-500">
                                        Free Delivery <br/><span className="text-emerald-600">Over RM50</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <ShieldCheck className="text-emerald-500" size={24} />
                                    <div className="text-[11px] leading-tight uppercase font-black text-slate-500">
                                        100% Authentic <br/><span className="text-emerald-600">Guaranteed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Tabs */}
                <div className="mt-20">
                    <div className="flex border-b border-slate-200 mb-8">
                        {["description", "specifications"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                                    activeTab === tab ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-emerald-600 rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-3xl">
                        {activeTab === "description" ? (
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-slate-600 leading-relaxed text-lg"
                            >
                                {product.description}
                            </motion.p>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                {product.specs.map((item, i) => (
                                    <div key={i} className="flex py-3 border-b border-slate-100">
                                        <span className="w-1/3 text-slate-400 font-bold text-sm uppercase">{item.label}</span>
                                        <span className="w-2/3 text-slate-800 font-semibold">{item.value}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}