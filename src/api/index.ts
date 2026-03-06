// src/api/index.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

// 假数据
const fakeProducts: Product[] = [
    { id: 1, name: "Papaya Juice", price: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm5Kw_7jfLT0tnREIO6XT4TaHYkBKPw0Jc7g&s" },
    { id: 2, name: "Watermelon Juice", price: 10, image: "https://www.rebootwithjoe.com/wp-content/uploads/2012/05/watermelon-pineapple-juice.jpg" },
    { id: 3, name: "Mango Smoothie", price: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDWm_mZBt00GyeV378zXvsbTKJz0FZv5KZ_w&s" },
    { id: 4, name: "Banana Milkshake", price: 8, image: "https://hungryhealthyhappy.com/wp-content/uploads/2022/03/Easy-Banana-Milkshake-featured.jpg" },
    { id: 5, name: "Pineapple Juice", price: 12, image: "https://www.dominicancooking.com/wp-content/uploads/recipe-pera-pina-rice-pineapple-drink-ClaraGon2177.jpg" },
    { id: 6, name: "Dragon Fruit Smoothie", price: 18, image: "https://veggiefunkitchen.com/wp-content/uploads/2022/08/Dragon-Fruit-Smoothie-5-scaled.jpg" },
];

export async function getProducts(): Promise<Product[]> {
    // 模拟网络延迟
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakeProducts), 500);
    });
}
