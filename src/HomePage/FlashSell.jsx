import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Eye, Timer, Star, Flame } from 'lucide-react';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const FlashSale = () => {
    const axiosSecure = UseAxiosSecure();
    const {user } =useAuth();
  
  const { data: tShirts = [], isLoading, isError, error } = useQuery({
    queryKey: ['flashSaleTShirts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tShirts');
      return res.data;
    }
  });

  const flashDeals = tShirts.filter(item => item.discount > 0);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

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
          sellerEmail: shirt.sellerEmail || "unknown@seller.com",
          tShirtId: shirt._id,
          title: shirt.title,
          brand: shirt.brand,
          price: shirt.discountPrice || shirt.price,
          quantity: 1,
          status: "pending",
        };
  
        await axiosSecure.post("/carts", cartItem);
  
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: `${shirt.title} added to cart!`,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not add item to cart",
        });
      }
    };

  if (isError) {
    return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Flame className="text-red-500 fill-red-500" /> Flash Sales
            </h2>
            {/* Timer (Static Mockup for visual urgency) */}
            <div className="hidden md:flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1 rounded-md border border-red-200">
               <Timer size={18} />
               <span className="font-mono font-bold tracking-widest">Ending in 12:45:00</span>
            </div>
          </div>
          <Link to='/shop'>
          <button className="text-gray-600 font-semibold hover:text-red-600 transition-colors border-b-2 border-transparent hover:border-red-600">
            View All Deals &rarr;
          </button>
          </Link>
        </div>

        {/* --- Product Grid --- */}
        {flashDeals.length === 0 ? (
          <p className="text-center text-gray-500">No active flash deals at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {flashDeals.slice(0, 4).map((product) => { 
               const totalStock = parseInt(product.quantity) + 10; 
               const soldPercentage = ((10 / totalStock) * 100).toFixed(0);

               return (
                <div key={product._id} className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                  
                  {/* Image Area */}
                  <div className="relative w-full h-[260px] bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                      -{product.discount}% OFF
                    </div>

                    {/* Stock Status Badge */}
                    {product.quantity < 5 && (
                       <div className="absolute bottom-3 right-3 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded">
                         LOW STOCK
                       </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                        {/* Category & Brand */}
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                          <span className="uppercase tracking-wider font-semibold">{product.brand || "Brand"}</span>
                          <span className="text-gray-400">{product.category}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-800 text-lg mb-1 truncate" title={product.title}>
                          {product.title}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl font-bold text-red-600">
                             ৳{parseFloat(product.discountPrice).toFixed(0)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                             ৳{product.price}
                          </span>
                        </div>

                        {/* Dynamic Stock Progress Bar */}
                        <div className="mb-4">
                           <div className="flex justify-between text-xs font-semibold mb-1">
                              <span className="text-gray-500">Available: <span className="text-gray-800">{product.quantity}</span></span>
                              <span className="text-red-500">{soldPercentage}% Sold</span>
                           </div>
                           <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                                style={{ width: `${soldPercentage}%` }} // Dynamic width
                              ></div>
                           </div>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Link to='/'>
                    <button 
                      className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-transform active:scale-95"
                      onClick={() => handleAddCart(product)}
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                    </Link>
                  </div>

                </div>
               );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashSale;