import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CreditCard, 
    Truck, 
    ShoppingBag, 
    ChevronLeft, 
    Lock, 
    Wallet, 
    Banknote 
} from "lucide-react";

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [paymentMethod, setPaymentMethod] = useState<"card" | "banking" | "cod">("card");
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        setLoading(true);
        setTimeout(() => {
            clearCart();
            navigate("/success");
        }, 2000);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="bg-gray-100 p-6 rounded-full">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
                <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-medium"
                >
                    <ChevronLeft size={20} />
                    Continue Shopping
                </button>
            </div>
        );
    }

    const inputClasses = "w-full border border-slate-200 px-4 py-3 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none placeholder:text-slate-400 text-slate-700";

    return (
        <div className="min-h-screen pb-20">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-[1400px] mx-auto p-4 md:p-8">
                {/* Header */}
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors mb-2">
                            <ChevronLeft size={18} />
                            Back to cart
                        </button>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Checkout</h1>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm font-medium bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        <Lock size={16} className="text-emerald-500" />
                        Secure Checkout
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN: Forms */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* Shipping Section */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                                    <Truck size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Shipping Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600 ml-1">Full Name</label>
                                    <input
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600 ml-1">Phone Number</label>
                                    <input
                                        placeholder="+60 12-345 6789"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-slate-600 ml-1">Email Address</label>
                                    <input
                                        placeholder="john@example.com"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-slate-600 ml-1">Shipping Address</label>
                                    <textarea
                                        placeholder="Enter your full street address, city, and postcode"
                                        rows={3}
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Payment Section */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                                    <CreditCard size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { id: 'card', label: 'Card', icon: <CreditCard size={20}/>, desc: 'Visa / Mastercard' },
                                    { id: 'banking', label: 'Banking', icon: <Wallet size={20}/>, desc: 'Online Transfer' },
                                    { id: 'cod', label: 'COD', icon: <Banknote size={20}/>, desc: 'Cash on Delivery' },
                                ].map((method) => (
                                    <label 
                                        key={method.id}
                                        className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                            paymentMethod === method.id 
                                            ? 'border-emerald-500 bg-emerald-50/50' 
                                            : 'border-slate-100 hover:border-slate-200 bg-white'
                                        }`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            className="sr-only"
                                            checked={paymentMethod === method.id}
                                            onChange={() => setPaymentMethod(method.id as any)}
                                        />
                                        <div className={`${paymentMethod === method.id ? 'text-emerald-600' : 'text-slate-400'} mb-3`}>
                                            {method.icon}
                                        </div>
                                        <span className="font-bold text-slate-800">{method.label}</span>
                                        <span className="text-xs text-slate-500">{method.desc}</span>
                                        
                                        {paymentMethod === method.id && (
                                            <motion.div 
                                                layoutId="active-indicator"
                                                className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"
                                            />
                                        )}
                                    </label>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-8 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100"
                            >
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>

                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-slate-800 line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-slate-500 font-medium">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">
                                                RM {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Subtotal</span>
                                        <span>RM {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Shipping</span>
                                        <span className="text-emerald-600 font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100">
                                        <span className="text-lg font-bold text-slate-900">Total</span>
                                        <span className="text-2xl font-black text-emerald-600 tracking-tight">
                                            RM {totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                    className="w-full mt-8 bg-slate-900 text-white py-4 rounded-xl font-bold text-lg
                                             hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50 
                                             disabled:cursor-not-allowed shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Place Order"
                                    )}
                                </button>

                                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                                    Secure 256-bit SSL encrypted payment
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}