import { useRef, useState, useEffect } from "react";
import { ArrowLeft , ArrowRight } from "lucide-react";

const Carousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const images = [
    "../assets/logoAnantvaa.jpg",
    "../assets/logoAnantvaa.jpg",
    "../assets/logoAnantvaa.jpg",
  ];
  const totalSlides = images.length; 
  const updateCarousel = (index) => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    updateCarousel(currentIndex);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className="w-full flex-shrink-0 object-cover h-64"
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white"
      >
        <ArrowLeft   size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white"
      >
        <ArrowRight   size={20} />
      </button>
    </div>
  );
};

export default Carousel;
