import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Headset } from 'lucide-react'; // আইকন ইম্পোর্ট

const ServiceBar = () => {
  const services = [
    { icon: <Truck size={24} />, title: "Free Shipping", subtitle: "On orders over ৳1500" },
    { icon: <RefreshCcw size={24} />, title: "Easy Returns", subtitle: "7-day return policy" },
    { icon: <ShieldCheck size={24} />, title: "Secure Payment", subtitle: "100% protected payments" },
    { icon: <Headset size={24} />, title: "24/7 Support", subtitle: "Dedicated support" },
  ];

  return (
    <div className="w-full bg-white py-8 px-4 border-b border-gray-100">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="flex items-center gap-4 justify-center md:justify-start group cursor-pointer">
            <div className="p-3 bg-gray-50 rounded-full text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
              {service.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-800">{service.title}</h4>
              <p className="text-xs text-gray-500">{service.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBar;