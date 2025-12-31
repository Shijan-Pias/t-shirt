import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

const categories = [
  {
    id: 1,
    title: "Men's Collection",
    subtitle: "Street & Classic",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1887&auto=format&fit=crop",
    link: "/shop?category=Men", 
    style: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    id: 2,
    title: "Women's Vibe",
    subtitle: "Soft & Bold",
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1887&auto=format&fit=crop",
    link: "/shop?category=Women", 
    style: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    id: 3,
    title: "Oversized & Hoodies",
    subtitle: "Cozy Comfort",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1887&auto=format&fit=crop",
    link: "/shop?category=Unisex", 
    style: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    id: 4,
    title: "Limited Edition",
    subtitle: "Drop 01 / 2025",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
    link: "/shop", 
    style: "col-span-1 md:col-span-2 row-span-1"
  }
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-white px-4 md:px-12">
      
      <div className="flex justify-between items-end mb-10">
        <div>
           <span className="text-orange-500 font-bold tracking-widest text-xs uppercase">Curated For You</span>
           <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">Shop by Style</h2>
        </div>
        <Link to="/shop" className="hidden md:flex items-center gap-2 font-semibold hover:gap-4 transition-all duration-300 border-b border-black text-black pb-1">
           View All Collections <ArrowUpRight size={18}/>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {categories.map((cat) => (
          <Link 
            to={cat.link} 
            key={cat.id} 
            className={`relative group overflow-hidden rounded-3xl cursor-pointer ${cat.style}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${cat.image})` }}
            ></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
            <div className="absolute bottom-6 left-6 text-white z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
               <p className="text-xs font-bold tracking-wider uppercase opacity-80 mb-1">{cat.subtitle}</p>
               <h3 className="text-2xl md:text-3xl font-bold leading-none">{cat.title}</h3>
            </div>
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;