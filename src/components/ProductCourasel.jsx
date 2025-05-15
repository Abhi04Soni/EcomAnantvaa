import React from "react";
import image1 from '../assets/image1.jpg';

const products = [
  {
    id: 1,
    name: "Handcrafted Kurta",
    image: image1,
    price: "₹2,499",
  },
  {
    id: 2,
    name: "Embroidered Saree",
    image: image1,
    price: "₹3,999",
  },
  {
    id: 3,
    name: "Jutti Sandals",
    image: image1,
    price: "₹1,299",
  },
  {
    id: 4,
    name: "Boho Dupatta",
    image: image1,
    price: "₹999",
  },
  {
    id: 5,
    name: "Silk Lehenga",
    image: image1,
    price: "₹5,499",
  },
  {
    id: 6,
    name: "Silk Lehenga",
    image: image1,
    price: "₹5,99",
  },
  
];

const ProductCard = ({ product }) => (
    <div className="w-[45%] sm:w-[20%] max-w-[220px] bg-white rounded-xl shadow p-3 mx-2 flex-shrink-0 snap-start">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 text-sm font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.price}</p>
    </div>
  );
  
  const NewArrivalsCarousel = () => {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
  
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex space-x-4 snap-x snap-mandatory scroll-smooth w-max">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  };
export default NewArrivalsCarousel;
