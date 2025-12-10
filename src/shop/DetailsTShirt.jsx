import React, { useState } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaShoppingCart, FaHeart, FaShippingFast, FaUndo } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';

const TShirtDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  // Local State for user selections
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Mock User (Replace with your Auth Context)
  const user = { email: "user@example.com", name: "Rahat" };

  // 1. Fetch Single T-Shirt Data
  const { data: tshirt, isLoading, isError } = useQuery({
    queryKey: ['tShirt', id],
    queryFn: async () => {
      // Assuming your backend supports: GET /tShirts/:id
      const res = await axios.get(`http://localhost:5000/tShirts/${id}`);
      return res.data;
    }
  });

  // 2. Add to Cart Mutation
  const addToCartMutation = useMutation({
    mutationFn: async (cartData) => {
      return await axios.post('http://localhost:5000/carts', cartData);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Added to Cart!",
        text: "Check your cart to checkout.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });

  const handleAddToCart = () => {
    // Validation: User must select Size and Color
    if (!selectedSize || !selectedColor) {
      Swal.fire({
        icon: 'warning',
        title: 'Selection Required',
        text: 'Please select a Size and Color before adding to cart.',
      });
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    const cartItem = {
      menuId: tshirt._id,
      email: user.email,
      title: tshirt.title,
      image: tshirt.image,
      price: tshirt.discountPrice || tshirt.price,
      selectedSize,
      selectedColor,
      quantity,
    };

    addToCartMutation.mutate(cartItem);
  };

  if (isLoading) return <div className="h-screen flex justify-center items-center"><span className="loading loading-spinner text-primary loading-lg"></span></div>;
  if (isError) return <div className="text-center text-error mt-10">Product not found.</div>;

  // Destructure for cleaner code
  const { title, image, price, discount, discountPrice, description, category, brand, stockStatus, sizes, colors } = tshirt;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Breadcrumbs for navigation */}
      <div className="text-sm breadcrumbs mb-6 text-gray-500">
        <ul>
          <li><a onClick={() => navigate('/')}>Home</a></li>
          <li><a onClick={() => navigate('/shop')}>Shop</a></li>
          <li className="font-semibold text-white   text-4xl">{title}</li>
        </ul>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        
        {/* --- LEFT SIDE: IMAGE --- */}
        <figure className="lg:w-1/2 relative bg-gray-50">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-center max-h-[600px]" 
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 badge badge-secondary badge-lg p-4 font-bold">
              -{discount}% OFF
            </div>
          )}
        </figure>

        {/* --- RIGHT SIDE: DETAILS --- */}
        <div className="card-body lg:w-1/2 p-6 lg:p-10">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="badge badge-outline badge-primary  text-xl mb-2">{category}</div>
              <h1 className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">{title}</h1>
              <p className="text-white font-medium">Brand: <span className="text-cyan-50">{brand}</span></p>
            </div>
            
            
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 my-4">
            <span className="text-4xl font-bold text-primary">{discountPrice || price} tk</span>
            {discount > 0 && (
              <span className="text-xl text-gray-400 line-through mb-1">{price} tk</span>
            )}
          </div>

          <p className="py-4 text-red-500 leading-relaxed border-b border-base-200">
            {description}
          </p>

          {/* --- SELECTORS --- */}
          <div className="space-y-6 mt-6">
            
            {/* Color Selector */}
            {colors && (
              <div>
                <h3 className="font-bold mb-3">Color: <span className="font-normal text-fuchsia-600">{selectedColor || 'Select a color'}</span></h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`btn btn-sm lg:btn-md ${selectedColor === color ? 'btn-neutral' : 'btn-outline'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizes && (
              <div>
                <h3 className="font-bold mb-3">Size: <span className="font-normal text-gray-500">{selectedSize || 'Select a size'}</span></h3>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <div 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border rounded-lg cursor-pointer transition-all 
                        ${selectedSize === size ? 'bg-primary text-white border-primary shadow-lg' : 'hover:border-primary text-gray-600'}`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="font-bold mb-3">Quantity:</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="btn btn-square btn-sm btn-outline"
                >-</button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="btn btn-square btn-sm btn-outline"
                >+</button>
              </div>
            </div>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div className="card-actions mt-8 flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={stockStatus === 'Out of Stock' || addToCartMutation.isPending}
              className="btn btn-primary flex-1 text-white text-lg shadow-lg shadow-primary/30"
            >
               {addToCartMutation.isPending ? <span className="loading loading-spinner"></span> : <FaShoppingCart />}
               {stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          

        </div>
      </div>
    </div>
  );
};

export default TShirtDetails;