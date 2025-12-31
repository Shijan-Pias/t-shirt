import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Verified Buyer",
    comment: "The fabric quality is just amazing! Delivery was super fast within Dhaka. Will order again.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sumaiya Islam",
    role: "Fashion Lover",
    comment: "Loved the packaging and the t-shirt fit is perfect. The print quality is top-notch.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Arafat Hossain",
    role: "Regular Customer",
    comment: "Best collection in BD. I bought the oversized hoodie and it's very comfy for winter.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 px-4 md:px-12">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold tracking-widest text-xs uppercase">What They Say</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">Customer Stories</h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative group">
              
              {/* Quote Icon Background */}
              <div className="absolute top-4 right-8 text-gray-100 group-hover:text-orange-100 transition-colors">
                <Quote size={60} fill="currentColor" />
              </div>

              {/* Stars */}
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                "{review.comment}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Trust Badge (Optional) */}
        <div className="mt-12 text-center border-t border-gray-200 pt-8">
           <p className="text-gray-500 font-medium">Trusted by <span className="text-gray-900 font-bold">5,000+</span> happy customers across Bangladesh.</p>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;