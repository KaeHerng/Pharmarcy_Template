// src/pages/Category.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { type Product, getProducts } from "../api";

export default function Category() {
    const { id } = useParams(); // 分类 id
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then((data) => {
            // 假设根据 categoryId 过滤
            const categoryProducts = data.filter((p) => p.id % 2 === Number(id)); // 假逻辑
            setProducts(categoryProducts);
            setFilteredProducts(categoryProducts);
        });
    }, [id]);

    const handleFilterChange = (sortBy: string) => {
        let sorted = [...products];
        if (sortBy === "price-asc") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            sorted.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(sorted);
    };

    return (
        <div>
            <Header />
            <main className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Category {id}</h1>
                <CategoryFilter onFilterChange={handleFilterChange} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
            </main>
            <Footer />
        </div>
    );
}
