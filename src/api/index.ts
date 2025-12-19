// src/api/index.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

// 假数据
const fakeProducts: Product[] = [
    { id: 1, name: "Vitamin C 500mg", price: 25, image: "/images/product1.jpg" },
    { id: 2, name: "Omega-3 Capsules", price: 40, image: "/images/product2.jpg" },
    { id: 3, name: "Herbal Shampoo", price: 15, image: "/images/product3.jpg" },
    { id: 4, name: "Face Moisturizer", price: 30, image: "/images/product4.jpg" },
    { id: 5, name: "Hand Sanitizer", price: 8, image: "/images/product5.jpg" },
    { id: 6, name: "Essential Oils Set", price: 50, image: "/images/product6.jpg" },
];

export async function getProducts(): Promise<Product[]> {
    // 模拟网络延迟
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakeProducts), 500);
    });
}
