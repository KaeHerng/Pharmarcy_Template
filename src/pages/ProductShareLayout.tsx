// src/pages/ProductShareLayout.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

// 假设这是你的数据源，可以用 API 替代
const allProducts = [
    { id: 1, name: "Product A", price: "RM 10", sold: '100', Star: 5, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 2, name: "Product B", price: "RM 20", sold: '50', Star: 4, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 3, name: "Product C", price: "RM 30", sold: '12', Star: 3, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336649%2Fcached%2FLghw6ARU66d6713ccda9d_1725329724_420x420.png&w=3840&q=75" },
    { id: 4, name: "Product D", price: "RM 15", sold: '3', Star: 5, category: "Skin-care", image: "https://down-my.img.susercontent.com/file/my-11134207-7rasl-mb6i622evbqj87" },
    { id: 5, name: "Product A", price: "RM 10", sold: '700', Star: 5, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 6, name: "Product B", price: "RM 20", sold: '852', Star: 5, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 7, name: "Product C", price: "RM 30", sold: '452', Star: 5, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336645%2Fcached%2FuGmN0hyy66d66df616cbe_1725328886_420x420.png&w=3840&q=75" },
    { id: 8, name: "Product D", price: "RM 15", sold: '200', Star: 5, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 9, name: "Product A", price: "RM 10", sold: '54', Star: 5, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 10, name: "Product B", price: "RM 20", sold: '88', Star: 5, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 11, name: "Product C", price: "RM 30", sold: '75', Star: 3, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336645%2Fcached%2FuGmN0hyy66d66df616cbe_1725328886_420x420.png&w=3840&q=75" },
    { id: 12, name: "Product D", price: "RM 15", sold: '33', Star: 3, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 13, name: "Product A", price: "RM 10", sold: '18', Star: 3, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 14, name: "Product B", price: "RM 20", sold: '380', Star: 3, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 15, name: "Product C", price: "RM 30", sold: '148', Star: 3, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336645%2Fcached%2FuGmN0hyy66d66df616cbe_1725328886_420x420.png&w=3840&q=75" },
    { id: 16, name: "Product D", price: "RM 15", sold: '188', Star: 3, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 17, name: "Product A", price: "RM 10", sold: '24', Star: 3, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=ttbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 18, name: "Product B", price: "RM 20", sold: '55', Star: 3, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 19, name: "Product C", price: "RM 30", sold: '36', Star: 3, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336645%2Fcached%2FuGmN0hyy66d66df616cbe_1725328886_420x420.png&w=3840&q=75" },
    { id: 20, name: "Product D", price: "RM 15", sold: '77', Star: 3, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 21, name: "Product A", price: "RM 10", sold: '102', Star: 3, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 22, name: "Product B", price: "RM 20", sold: '55', Star: 3, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 23, name: "Product C", price: "RM 30", sold: '46', Star: 3, category: "Skin-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGEMcKIaTiblQlSsisS7D7-_DYuYPxMLp9XQ&s" },
    { id: 24, name: "Product D", price: "RM 15", sold: '33', Star: 5, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 25, name: "Product B", price: "RM 20", sold: '25', Star: 5, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 26, name: "Product C", price: "RM 30", sold: '78', Star: 5, category: "Skin-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT66KSofnPnS0b8qn0AIVDRwk72Ime5MXarg&s" },
    { id: 27, name: "Product D", price: "RM 15", sold: '25', Star: 5, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 28, name: "Product A", price: "RM 10", sold: '25', Star: 3, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 29, name: "Product B", price: "RM 20", sold: '25', Star: 3, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 30, name: "Product C", price: "RM 30", sold: '25', Star: 3, category: "Skin-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT66KSofnPnS0b8qn0AIVDRwk72Ime5MXarg&s" },
    { id: 31, name: "Product D", price: "RM 15", sold: '25', Star: 3, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 32, name: "Product A", price: "RM 10", sold: '25', Star: 3, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 33, name: "Product B", price: "RM 20", sold: '25', Star: 3, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 34, name: "Product C", price: "RM 30", sold: '25', Star: 3, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336645%2Fcached%2FuGmN0hyy66d66df616cbe_1725328886_420x420.png&w=3840&q=75" },
    { id: 35, name: "Product D", price: "RM 15", sold: '25', Star: 4, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 36, name: "Product B", price: "RM 20", sold: '25', Star: 4, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 37, name: "Product C", price: "RM 30", sold: '25', Star: 4, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336645%2Fcached%2FuGmN0hyy66d66df616cbe_1725328886_420x420.png&w=3840&q=75" },
    { id: 38, name: "Product D", price: "RM 15", sold: '25', Star: 4, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 39, name: "Product A", price: "RM 10", sold: '25', Star: 4, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 40, name: "Product B", price: "RM 20", sold: '25', Star: 4, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 41, name: "Product C", price: "RM 30", sold: '25', Star: 4, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336645%2Fcached%2FuGmN0hyy66d66df616cbe_1725328886_420x420.png&w=3840&q=75" },
    { id: 42, name: "Product D", price: "RM 15", sold: '25', Star: 4, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    { id: 43, name: "Product A", price: "RM 10", sold: '25', Star: 4, category: "medical-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0zF6NchAejJG9v9NFyxnETQ8pkl0XjIhe_g&s" },
    { id: 44, name: "Product B", price: "RM 20", sold: '25', Star: 4, category: "medical-care", image: "https://www.bigpharmacy.com.my/site_media/img/100921EA_20230830092708_bigpharmacy.png" },
    { id: 45, name: "Product C", price: "RM 30", sold: '25', Star: 4, category: "Skin-care", image: "https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Frpharmac%2Fimages%2Fproduct%2Fproduct-4336645%2Fcached%2FuGmN0hyy66d66df616cbe_1725328886_420x420.png&w=3840&q=75" },
    { id: 46, name: "Product D", price: "RM 15", sold: '25', Star: 4, category: "Skin-care", image: "https://stickercommunity.com/uploads/main/16-11-2021-01-16-242e4gn-sticker0.webp" },
    // ...更多产品
];

// 所有分类
const categories = [
    { "medical-care": ["Medical Care1", "Medical Care2", "Medical Care3"] },
    { "skin-care": [] },
    { "health-food": [] },
    { "supplements": ["Supplements1", "Supplements2", "Supplements3"] },
];

export default function ProductShareLayout() {
    const navigate = useNavigate();
    const { category } = useParams<{ category: string }>();
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [sortBy, setSortBy] = useState("popularity");
    const [pageSize, setPageSize] = useState(20);
    const [page, setPage] = useState(1);
    const [showCategories, setShowCategories] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    useEffect(() => {
        const filtered = allProducts.filter((p) => p.category === category);
        setFilteredProducts(filtered);
        setPage(1);
    }, [category]);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-high": return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
            case "price-low": return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
            default: return 0;
        }
    });

    const handleCategoryClick = (catName: string, hasSub: boolean) => {
        if (!hasSub) return; // 没有 sub 就不展开
        setExpandedCategory(expandedCategory === catName ? null : catName);
    };

    const totalPages = Math.ceil(sortedProducts.length / pageSize);
    const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="flex flex-col md:flex-row gap-3 p-4 w-full max-w-[1300px] mx-auto">
            {/* 左边分类 */}
            <div className="md:w-1/5">
                {/* Mobile toggle button */}
                <button
                    className="md:hidden mb-2 px-4 py-2 border rounded w-full text-left"
                    onClick={() => setShowCategories(!showCategories)}
                >
                    {showCategories ? "Close Categories" : "Show Categories"}
                </button>

                {/* Sidebar / Category list */}
                <div
                    className={`
                      md:block
                      fixed md:static top-0 left-0 h-full md:h-auto w-64 md:w-auto
                      bg-white shadow-lg md:shadow-none
                      transform transition-transform duration-300 ease-in-out
                      ${showCategories ? "translate-x-0" : "-translate-x-full"} 
                      md:translate-x-0
                      z-50
                      p-6 md:p-4 md:py-7
                      rounded-md border border-gray-200
                    `}>
                    <h3 className="font-bold mb-4">Categories</h3>
                    <ul>
                        {categories.map((catObj) => {
                            const catName = Object.keys(catObj)[0];
                            const subCategories = catObj[catName];
                            const hasSub = subCategories.length > 0;
                            const isExpanded = expandedCategory === catName;

                            return (
                                <li key={catName} className="mb-2">
                                    <div
                                        className={`cursor-pointer flex justify-between items-center ${catName === category ? "font-bold text-green-600" : ""
                                            }`}
                                        onClick={() => handleCategoryClick(catName, hasSub)}>
                                        {catName.replace("-", " ")}
                                        {hasSub && (
                                            <span className="ml-2">{isExpanded ? "-" : "+"}</span>
                                        )}
                                    </div>

                                    {/* Subcategories */}
                                    {hasSub && isExpanded && (
                                        <ul className="mt-2">
                                            {subCategories.map((sub: React.Key | null | undefined) => (
                                                <li key={sub} className="mb-1 cursor-pointer text-gray-400 hover:text-green-600">
                                                    {`> ${sub}`}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Overlay for mobile */}
                {showCategories && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                        onClick={() => setShowCategories(false)}
                    />
                )}
            </div>


            {/* 右边产品区域 */}
            <div className="md:w-4/5 flex-1 border border-gray-200 px-5 py-7 rounded-md bg-white">
                {/* 顶部信息和过滤器 */}
                <h3 className="font-bold mb-4">{category?.replace("-", " ")}</h3>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>{`${filteredProducts.length} Products`}</div>
                    <div className="flex gap-4 flex-wrap">
                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 px-2 py-1 rounded">
                            <option value="popularity">By Popularity</option>
                            <option value="new-arrival">New Arrival</option>
                            <option value="price-high">Highest Price</option>
                            <option value="price-low">Lowest Price</option>
                        </select>

                        {/* Page Size */}
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(parseInt(e.target.value))}
                            className="border border-gray-300 px-2 py-1 rounded"
                        >
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                            <option value={100}>100 per page</option>
                        </select>
                    </div>
                </div>

                {/* 产品 Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {paginatedProducts.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => navigate(`/product/${p.id}`)}
                            className="bg-white rounded-xl p-4 flex flex-col transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-green-500">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                            <div className="text-gray-700 text-md text-left">{p.name}</div>
                            <div className="text-green-600 font-bold text-md mt-1">{p.price}</div>
                            <div className="flex flex-row">
                                <div className="flex">
                                    {"★★★★★".split("").map((_, i) => (
                                        <span
                                            key={i}
                                            className={i < p.Star ? "text-yellow-400" : "text-gray-300"}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <div className="text-gray-400 text-sm ml-2">{`${p.sold} Sold`}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </div>
            </div>
        </div>
    );
}
