import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="max-w-[1200px] mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto p-6 bg-white rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Cart Items */}
                <div className="md:col-span-8 space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 border border-gray-300 rounded-lg">
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />

                            {/* Info */}
                            <div className="flex-1 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2">
                                <div className="flex-1">
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p className="text-gray-500">RM {item.price.toFixed(2)}</p>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center">
                                    <span className="font-semibold mr-3">Quantity</span>
                                    <div className="w-8 px-2 py-1 border border-gray-300 
                            hover:bg-gray-100 text-center
                            disabled:opacity-40 cursor-pointer"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</div>
                                    <div className="w-15 px-2 py-1 border-y border-gray-300 text-center">{item.quantity}</div>
                                    <div className="w-8 px-2 py-1 border border-gray-300 text-center
                            hover:bg-gray-100 cursor-pointer" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</div>
                                </div>

                                {/* Subtotal */}
                                <div className="font-semibold">
                                    RM {(item.price * item.quantity).toFixed(2)}
                                </div>

                                {/* Remove */}
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="md:col-span-4 border border-gray-300 rounded-lg p-4 h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Items ({cart.length})</span>
                        <span>RM {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="border-t my-2" />
                    <div className="flex justify-between font-bold text-lg mb-4">
                        <span>Total</span>
                        <span>RM {totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-2"
                        onClick={() => alert("Proceed to Checkout")}
                    >
                        Checkout
                    </button>
                    <button
                        className="w-full border border-gray-400 py-2 rounded-lg hover:bg-gray-50 transition"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
