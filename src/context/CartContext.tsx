import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">, quantity: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    // 🔹 Lazy init: 从 localStorage 初始化
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("cart");
                return saved ? JSON.parse(saved) : [];
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error);
                return [];
            }
        }
        return [];
    });

    // 🔹 Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: Omit<CartItem, "quantity">, quantity: number) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
                );
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
            )
        );
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
