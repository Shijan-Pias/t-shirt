import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { ShoppingCart, Heart, Truck, ShieldCheck, RefreshCcw, Star, Minus, Plus } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const TShirtDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth(); 

  // --- States ---
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc'); 

  const { data: tshirt, isLoading, isError } = useQuery({
    queryKey: ['tShirt', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tShirts/${id}`);
      return res.data;
    }
  });

 
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['related', tshirt?.category],
    enabled: !!tshirt?.category, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/tShirts?category=${tshirt.category}`);
      return res.data.filter(item => item._id !== id).slice(0, 4);
    }
  });

  const addToCartMutation = useMutation({
    mutationFn: async (cartData) => {
      return await axiosSecure.post('/carts', cartData);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Added to Cart!",
        text: `${tshirt.title} has been added.`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
        toast: true
      });
    },
    onError: (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response?.data?.message || 'Something went wrong',
        });
    }
  });

  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to add items to your cart',
        showCancelButton: true,
        confirmButtonText: 'Login Now'
      }).then((result) => {
        if (result.isConfirmed) navigate('/login');
      });
      return;
    }

    // Validation
    if ((tshirt.sizes && !selectedSize) || (tshirt.colors && !selectedColor)) {
      Swal.fire({
        icon: 'warning',
        title: 'Selection Missing',
        text: 'Please select a Size and Color.',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    const cartItem = {
      userEmail: user.email,
      sellerEmail: tshirt.sellerEmail,
      tShirtId: tshirt._id,
      title: tshirt.title,
      brand: tshirt.brand,
      image: tshirt.image,
      price: tshirt.discountPrice || tshirt.price,
      selectedSize,
      selectedColor,
      quantity,
      status: "pending",
    };

    addToCartMutation.mutate(cartItem);
  };

  if (isLoading) return <div className="h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;
  if (isError) return <div className="text-center text-red-500 mt-20 text-xl">Product not found or removed.</div>;

  // Destructure Data
  const { title, image, price, discount, discountPrice, description, category, brand, stockStatus, sizes, colors } = tshirt;

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-black transition">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">{title}</span>
        </nav>

        {/* --- MAIN PRODUCT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* LEFT: Product Image (Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm relative group">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div>
            {/* Title & Reviews */}
            <div className="mb-6">
                <span className="text-gray-400 text-sm tracking-widest uppercase font-semibold">{brand}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-2">{title}</h1>
                <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor"/>)}
                    </div>
                    <span className="text-sm text-gray-500">(124 Reviews)</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className={`text-sm font-medium ${stockStatus === 'In Stock' ? 'text-green-600' : 'text-red-500'}`}>
                        {stockStatus || 'In Stock'}
                    </span>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
               <span className="text-3xl font-bold text-gray-900">৳{discountPrice || price}</span>
               {discount > 0 && (
                 <span className="text-xl text-gray-400 line-through">৳{price}</span>
               )}
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Selectors */}
            <div className="space-y-6">
                
                {/* Colors */}
                {colors && (
                    <div>
                        <span className="block text-sm font-bold text-gray-900 mb-2">Color: <span className="font-normal text-gray-500">{selectedColor}</span></span>
                        <div className="flex gap-3">
                            {colors.split(',').map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedColor(c)}
                                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === c ? 'border-black ring-1 ring-black' : 'border-transparent ring-1 ring-gray-200'}`}
                                    style={{ backgroundColor: c.toLowerCase() }} // Assuming color names are valid CSS colors
                                    title={c}
                                >
                                    {/* Handle white color visibility */}
                                    {c.toLowerCase() === 'white' && <div className='w-full h-full rounded-full border border-gray-200'></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sizes */}
                {sizes && (
                    <div>
                        <span className="block text-sm font-bold text-gray-900 mb-2">Size: <span className="font-normal text-gray-500">{selectedSize}</span></span>
                        <div className="flex flex-wrap gap-3">
                            {sizes.split(',').map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSize(s)}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
                                    ${selectedSize === s 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-black'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quantity */}
                <div>
                     <span className="block text-sm font-bold text-gray-900 mb-2">Quantity</span>
                     <div className="flex items-center w-32 border border-gray-300 rounded-lg">
                        <button 
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                            <Minus size={16} />
                        </button>
                        <input 
                            type="text" 
                            readOnly 
                            value={quantity} 
                            className="w-12 text-center text-gray-900 font-bold border-x border-gray-300 h-10 focus:outline-none"
                        />
                         <button 
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
                            onClick={() => setQuantity(q => q + 1)}
                        >
                            <Plus size={16} />
                        </button>
                     </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
                <button 
                    onClick={handleAddToCart}
                    disabled={stockStatus === 'Out of Stock' || addToCartMutation.isPending}
                    className="flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                    {addToCartMutation.isPending ? <span className="loading loading-spinner"></span> : <ShoppingCart size={20} />}
                    Add to Cart
                </button>
                <button className="w-14 h-14 border border-gray-300 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors">
                    <Heart size={24} />
                </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100 text-center">
                <div className="flex flex-col items-center gap-2">
                    <Truck size={24} className="text-gray-400"/>
                    <span className="text-xs font-semibold text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ShieldCheck size={24} className="text-gray-400"/>
                    <span className="text-xs font-semibold text-gray-600">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <RefreshCcw size={24} className="text-gray-400"/>
                    <span className="text-xs font-semibold text-gray-600">Easy Returns</span>
                </div>
            </div>
          </div>
        </div>

        {/* --- TABS SECTION (Description & Info) --- */}
        <div className="mb-20">
            <div className="flex border-b border-gray-200 mb-8">
                {['desc', 'reviews', 'shipping'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 px-8 text-sm font-bold uppercase tracking-wider transition-all border-b-2 
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        {tab === 'desc' ? 'Description' : tab === 'reviews' ? 'Reviews (0)' : 'Shipping'}
                    </button>
                ))}
            </div>

            <div className="prose max-w-none text-gray-600 leading-relaxed">
                {activeTab === 'desc' && (
                    <div className="animate-fadeIn">
                        <p className="mb-4 text-lg">{description}</p>
                        <h4 className="font-bold text-black mt-6 mb-2">Product Details</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Brand: {brand}</li>
                            <li>Category: {category}</li>
                            <li>100% Premium Cotton</li>
                            <li>Machine Washable</li>
                        </ul>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="py-10 text-center bg-gray-50 rounded-xl">
                        <p>No reviews yet. Be the first to review this product!</p>
                    </div>
                )}
                {activeTab === 'shipping' && (
                    <div className="animate-fadeIn">
                         <p>We offer free shipping on all orders over ৳1500. Standard delivery takes 3-5 business days. Express delivery options are available at checkout.</p>
                    </div>
                )}
            </div>
        </div>

        {/* --- RELATED PRODUCTS SECTION --- */}
        {relatedProducts.length > 0 && (
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {relatedProducts.map((item) => (
                        <Link to={`/tshirt/${item._id}`} key={item._id} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-xl bg-gray-100 mb-4 h-64 relative">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                                {item.discount > 0 && (
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">-{item.discount}%</span>
                                )}
                            </div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.category}</p>
                            <p className="font-bold text-gray-900 mt-1">৳{item.discountPrice || item.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default TShirtDetails;