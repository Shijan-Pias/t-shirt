import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router"; 
import Swal from "sweetalert2";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import useAuth from "../hooks/useAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const ShopTShirts = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const sortFromUrl = searchParams.get("sort");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");

  const { data: tshirts = [], isLoading, error } = useQuery({
    queryKey: ["tshirts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tShirts");
      return res.data;
    },
  });

  useEffect(() => {
    if (categoryFromUrl) {
      const formattedCategory = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
      setSelectedCategory(formattedCategory);
    } else {
      setSelectedCategory("All");
    }
    if (sortFromUrl === 'newest') {
    setSortOption('newest');
  }
  }, [categoryFromUrl ,sortFromUrl]);

  const filteredProducts = tshirts
    .filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false; 
      }
      
      if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true; 
    })
    .sort((a, b) => {
      // C. Sorting Logic
      if (sortOption === "lowToHigh") return a.discountPrice - b.discountPrice;
      if (sortOption === "highToLow") return b.discountPrice - a.discountPrice;
      if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const handleAddCart = async (shirt) => {
    try {
      if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to add items to your cart",
        });
        return;
      }
      const cartItem = {
        userEmail: user.email,
        sellerEmail: shirt.sellerEmail ,
        tShirtId: shirt._id,
        title: shirt.title,
        brand: shirt.brand,
        price: shirt.discountPrice || shirt.price,
        quantity: 1,
        status: "pending",
        image: shirt.image 
      };
      await axiosSecure.post("/carts", cartItem);
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${shirt.title} added to cart!`,
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Failed", text: "Could not add item" });
    }
  };

  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <p className="text-center text-red-500 mt-10">Failed to load T-shirts</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Shop Collection</h2>
          <p className="text-gray-500 text-sm mt-1">Showing <span className="text-green-400">{filteredProducts.length}</span>  results</p>
        </div>

        {/* --- Filter Bar (Search & Sort) --- */}
        <div className="flex flex-wrap gap-3 items-center bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
            <input 
              type="text" 
              placeholder="Search t-shirts..." 
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-50  focus:outline-none focus:ring-2 focus:ring-gray-900 text-black text-sm w-40 md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Dropdown */}
          <select 
            className="p-2 rounded-lg bg-gray-50 text-sm font-medium border-none focus:ring-2 focus:ring-gray-900 text-black cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>

          {/* Sort Dropdown */}
          <select 
            className="p-2 rounded-lg text-black bg-gray-50 text-sm font-medium border-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

        </div>
      </div>

      {/* --- Product Grid --- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((shirt) => (
            <div key={shirt._id} className="group card bg-white shadow-sm hover:shadow-xl border border-gray-100 rounded-2xl transition-all duration-300">
              
              {/* Image Area */}
              <figure className="relative px-3 pt-3 overflow-hidden">
                <img
                  src={shirt.image}
                  alt={shirt.title}
                  className="rounded-xl h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Sale Badge */}
                {shirt.discount > 0 && (
                   <span className="absolute top-5 left-5 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                     -{shirt.discount}%
                   </span>
                )}
              </figure>

              <div className="card-body p-5">
                {/* Brand & Category */}
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                   <span className="uppercase tracking-wider">{shirt.brand}</span>
                   <span>{shirt.category}</span>
                </div>

                <h2 className="card-title text-lg font-bold text-gray-800 truncate" title={shirt.title}>
                  {shirt.title}
                </h2>

                {/* Price Display */}
                <div className="flex items-center gap-2 mt-1">
                  {shirt.discountPrice ? (
                    <>
                      <span className="text-xl font-bold text-gray-900">${shirt.discountPrice}</span>
                      <span className="text-sm line-through text-gray-400">${shirt.price}</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">${shirt.price}</span>
                  )}
                </div>

                {/* Buttons */}
                <div className="card-actions justify-between mt-4 items-center">
                  <Link to={`/tshirt/${shirt._id}`}>
                    <button className="text-gray-500 hover:text-gray-900 font-semibold text-sm transition-colors border-b border-transparent hover:border-gray-900">
                       View Details
                    </button>
                  </Link>

                  <button
                    onClick={() => handleAddCart(shirt)}
                    className="btn btn-sm bg-gray-900 text-white hover:bg-black border-none rounded-lg px-4 flex items-center gap-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Not Found State
        <div className="flex flex-col items-center justify-center py-20">
           <div className="bg-gray-100 p-6 rounded-full mb-4">
              <SlidersHorizontal size={32} className="text-gray-400"/>
           </div>
           <h3 className="text-xl font-bold text-gray-800">No products found</h3>
           <p className="text-gray-500">Try changing your search or filter.</p>
           <button 
             onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
             className="mt-4 text-blue-600 font-bold hover:underline"
           >
             Reset Filters
           </button>
        </div>
      )}
    </div>
  );
};

export default ShopTShirts;