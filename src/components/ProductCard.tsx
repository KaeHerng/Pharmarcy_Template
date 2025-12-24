// src/components/ProductCard.tsx
import { Link } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-green-700 font-bold">${product.price}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-2 block">View</Link>
        </div>
    );
}
