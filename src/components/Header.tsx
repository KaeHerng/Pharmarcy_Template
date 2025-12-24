import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { Menu, X, ShoppingCart, MapPin, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const navigate = useNavigate();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    // 控制 Desktop Dropdown 的状态
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const { cartCount } = useCart();

    const pageLinks = [
        { label: "Home", to: "/" },
        { label: "Branch", to: "/branch" },
        { label: "Product", to: "/product" },
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" },
    ];

    // 定义子菜单内容
    const subPageLinks: Record<string, { label: string; to: string }[]> = {
        "Branch": [
            { label: "Kuala Lumpur (HQ)", to: "/branch/kl" },
            { label: "Selangor", to: "/branch/selangor" },
            { label: "Johor Bahru", to: "/branch/johor" },
            { label: "Penang", to: "/branch/penang" },
        ],
        "Product": [
            { label: "Medical Care", to: "/ProductShareLayout/medical-care" },
            { label: "Personal Care", to: "/ProductShareLayout/personal-care" },
            { label: "Vitamins & Supplements", to: "/ProductShareLayout/vitamins" },
            { label: "First Aid Kit", to: "/ProductShareLayout/first-aid" },
        ],
        // 如果 About Us 或其他没有子菜单，就不定义
    };

    const Card1 = "https://www.visa.co.in/dam/VCOM/regional/ap/india/global-elements/images/in-visa-gold-card-498x280.png"

    return (
        <header className="w-full z-[100] fixed top-0 left-0">
            {/* Desktop Version */}
            <div className="hidden md:block shadow-lg relative z-[110]">
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-[1600px] mx-auto relative flex items-center p-4">
                        {/* Logo */}
                        <div onClick={() => navigate("/")} className="text-2xl font-extrabold text-green-600 flex items-center gap-2 z-10 cursor-pointer">
                            <span className="bg-green-100 text-green-600 rounded-full p-1">💊</span>
                            KH PharmaShop
                        </div>

                        {/* Search Bar */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 z-0 mx-auto flex justify-center">
                            <SearchBar />
                        </div>

                        {/* Right Buttons */}
                        <div className="ml-auto flex items-center gap-4 z-10">
                            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
                                Sign In
                            </button>
                            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
                                Register
                            </button>
                            <div className="relative p-2 rounded-lg hover:bg-green-50 transition cursor-pointer" onClick={() => navigate("/cart")}>
                                <ShoppingCart size={24} className="text-green-600" />
                                {cartCount > 0 &&
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                }
                            </div>
                            <button className="p-2 rounded-lg hover:bg-green-50 transition">
                                <MapPin size={24} className="text-green-600" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Nav with Hover Logic */}
                    <nav
                        className="bg-gradient-to-r from-green-600 to-green-400 relative"
                        onMouseLeave={() => setActiveDropdown(null)}>
                        <div className="max-w-[1600px] mx-auto flex justify-center p-3 space-x-8 text-white font-semibold">
                            {pageLinks.map((link) => {
                                const hasSubmenu = subPageLinks[link.label]; 
                                return(
                                    <Link
                                    key={link.to}
                                    to={hasSubmenu ? '' : link.to}
                                    onMouseEnter={() => setActiveDropdown(link.label)}
                                    className="hover:text-yellow-300 transition-colors duration-200 relative py-1">
                                    {link.label}
                                    {/* 下划线指示器 */}
                                    {activeDropdown === link.label && (
                                        <motion.div layoutId="navline" className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300" />
                                    )}
                                </Link>
                                )
                            })}
                        </div>

                        {/* Full Page Dropdown Menu */}
                        <AnimatePresence>
                            {activeDropdown && subPageLinks[activeDropdown] && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setActiveDropdown(null)}
                                        className="fixed inset-0 top-[115px] bg-black/50 backdrop-blur-sm z-[-1]"
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, y: -30, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="absolute top-full left-0 w-full shadow-xl border-t border-gray-100 py-10 z-50 bg-black/60 backdrop-blur-sm min-h-screen">
                                        <div className="max-w-[1400px] mx-auto px-6 py-10 flex flex-row relative">
                                            <div className="grid grid-cols-4 gap-8">
                                                <div className="col-span-1">
                                                    <h3 className="text-2xl font-bold text-green-600 mb-2">{activeDropdown}</h3>
                                                    <p className="text-gray-200 text-md">Discover our {activeDropdown.toLowerCase()} and services tailored for you.</p>
                                                </div>

                                                <div>
                                                    {subPageLinks[activeDropdown].map((sub) => (
                                                        <Link
                                                            key={sub.to}
                                                            to={sub.to}
                                                            onClick={() => setActiveDropdown(null)}
                                                            className="flex items-center justify-between p-2 rounded-xl transition-all group">
                                                            <span className="relative inline-block text-gray-400 hover:text-white text-[23px] after:content-['']
                                                                after:absolute after:left-0 after:-bottom-1 after:h-[2px] 
                                                                after:w-0 after:bg-current after:transition-all 
                                                                after:duration-300 group-hover:after:w-full">
                                                                {sub.label}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                              onClick={() => setActiveDropdown(null)}
                                              className="absolute top-0 right-2 text-gray-400 hover:text-green-600 transition cursor-pointer z-10">
                                              <X size={38} />
                                            </button>
                                            {/* <div className="relative flex flex-col gap-2">
                                              <button
                                                onClick={() => setActiveDropdown(null)}
                                                className="absolute top-0 right-2 text-gray-400 hover:text-green-600 transition cursor-pointer z-10">
                                                <X size={38} />
                                              </button>
                                                                                            
                                              <img
                                                src={Card1}
                                                alt="Card1"
                                                draggable="false"
                                                className="w-full max-w-full object-cover pointer-events-none select-none rounded-lg mt-15"
                                              />
                                              <img
                                                src={Card1}
                                                alt="Card1"
                                                draggable="false"
                                                className="w-full max-w-full object-cover pointer-events-none select-none rounded-lg"
                                              />
                                            </div> */}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </nav>
                </div>
            </div>

            {/* Mobile Version (保持不变) */}
            <div className="md:hidden shadow-lg">
                <div className="bg-gradient-to-r from-green-600 to-green-400 p-4 flex justify-between items-center">
                    <div className="text-2xl font-extrabold text-white flex items-center gap-2">
                        <span className="bg-white text-green-600 rounded-full p-1">💊</span>
                        KH PharmaShop
                    </div>
                    <div className="flex items-center gap-2 relative">
                        <div className="relative">
                            <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="p-2 rounded-md bg-white text-green-600 hover:bg-green-100 transition">
                                <User size={24} />
                            </button>
                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
                                    <Link to="/signin" className="block px-4 py-2 text-gray-800 hover:bg-green-100" onClick={() => setUserDropdownOpen(false)}>Sign In</Link>
                                    <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-green-100" onClick={() => setUserDropdownOpen(false)}>Sign Up</Link>
                                </div>
                            )}
                        </div>
                        <button className="p-2 rounded-md bg-white text-green-600 hover:bg-green-100 transition relative" onClick={() => navigate("/cart")}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>}
                        </button>
                        <button className="p-2 rounded-md bg-white text-green-600 hover:bg-green-100 transition">
                            <MapPin size={24} />
                        </button>
                    </div>
                </div>

                <div className="bg-white flex items-center p-4 gap-2 border-b border-gray-100">
                    <button onClick={() => setMobileSidebarOpen(true)} className="p-2 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition">
                        <Menu size={24} />
                    </button>
                    <SearchBar />
                </div>

                {/* Mobile Sidebar */}
                <AnimatePresence>
                    {mobileSidebarOpen && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileSidebarOpen(false)} />
                            <motion.div initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6">
                                <button className="mb-6 flex items-center gap-2 text-green-600 font-bold" onClick={() => setMobileSidebarOpen(false)}>
                                    <X size={24} /> Close
                                </button>
                                <ul className="flex flex-col gap-4">
                                    {pageLinks.map((link) => {
                                        const hasSubmenu = subPageLinks[link.label];

                                        return (
                                            <li key={link.to}>
                                                {/* 主菜单 */}
                                                <button
                                                    onClick={() => {
                                                        if (hasSubmenu) {
                                                            setMobileOpenSubmenu(
                                                                mobileOpenSubmenu === link.label ? null : link.label
                                                            );
                                                        } else {
                                                            navigate(link.to);
                                                            setMobileSidebarOpen(false);
                                                        }
                                                    }}
                                                    className="w-full flex items-center justify-between text-gray-800 text-lg font-semibold py-2 hover:text-green-600 transition"
                                                >
                                                    <span>{link.label}</span>

                                                    {hasSubmenu && (
                                                        <ChevronRight
                                                            size={20}
                                                            className={`transition-transform duration-300 ${mobileOpenSubmenu === link.label ? "rotate-90" : ""
                                                                }`}
                                                        />
                                                    )}
                                                </button>

                                                {/* 子菜单 */}
                                                <AnimatePresence>
                                                    {hasSubmenu && mobileOpenSubmenu === link.label && (
                                                        <motion.ul
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                                            className="ml-4 mt-2 flex flex-col gap-2 overflow-hidden">
                                                            {subPageLinks[link.label].map((sub) => (
                                                                <li key={sub.to}>
                                                                    <Link
                                                                        to={sub.to}
                                                                        onClick={() => {
                                                                            setMobileSidebarOpen(false);
                                                                            setMobileOpenSubmenu(null);
                                                                        }}
                                                                        className="block text-gray-600 hover:text-green-600 transition">
                                                                        {sub.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}