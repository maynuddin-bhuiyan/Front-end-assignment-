"use client";
import { useRef, useState } from "react";
// import Swiper from "swiper";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";

import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";

import detail_img_1 from "@/assets/images/detail-img-1.png";
import detail_img_2 from "@/assets/images/detail-img-2.png";
import detail_img_3 from "@/assets/images/detail-img-3.png";
import detail_img_4 from "@/assets/images/detail-img-4.png";
import detail_img from "@/assets/images/detail-img.png";

import { cn } from "@/lib/utils";
import { Button } from "antd";
import Image from "next/image";
import { FaHeart, FaMinus, FaPlus, FaTruck } from "react-icons/fa6";

const detailImages = [
  detail_img,
  detail_img_1,
  detail_img_2,
  detail_img_3,
  detail_img_4,
  detail_img_4,
  detail_img_4,
  detail_img_4,
  detail_img_4,
];

export default function DetailHeroSection({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("black");
  const swiperRef = useRef(null);
  const totalImg = detailImages?.length;
  const [zoomStyle, setZoomStyle] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [wishlist, setWishlist] = useState(false)
  const [showPostalCode, setShowPostalCode] = useState(false)
  const [postalCode, setPostalCode] = useState("")

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const toggleWishlist = () => {
    setWishlist(!wishlist)
  }

  const togglePostalCode = () => {
    setShowPostalCode(!showPostalCode)
  }


  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars?.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill={i < product?.rating ? "#FFAD33" : "none"} // Fill star if i < rating
          stroke="#FFAD33"
        >
          <path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" />
        </svg>
      );
    }
    return stars;
  };

  const handleMouseMove = (e, index) => {
    let x, y;
    const isTouchEvent = e.type === "touchmove";

    // Get event coordinates
    if (isTouchEvent) {
      const touch = e.touches[0];
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      x = ((touch.clientX - left) / width) * 100;
      y = ((touch.clientY - top) / height) * 100;
    } else {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      x = ((e.clientX - left) / width) * 100;
      y = ((e.clientY - top) / height) * 100;
    }

    setHoveredImageIndex(index); // Set the index of the hovered/touched image
    setZoomStyle({
      backgroundImage: `url(${detailImages[index].src})`, // Use the current image's src
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%", // Adjust zoom level
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle(null); // Reset zoom style when interaction ends
    setHoveredImageIndex(null); // Reset hovered/touched image index
  };



  return (
    <div className="relative lg:my-10 mt-2">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
          <div className="relative">        
             

             <Swiper
              loop={true}
              slidesPerView={1}
              allowTouchMove={false}
              onSwiper={(swiper) => {
                swiperRef.current = swiper; // Assign Swiper instance to ref
                // console.log(swiper);
              }}
            >
              <div className="absolute top-1/2 z-50 w-full">
                <div className="flex items-center justify-between gap-3 mx-2">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="bg-transparent border border-primary hover:bg-primary group w-[40px] h-[40px] rounded-full flex items-center justify-center smooth"
                  >
                    <MdOutlineArrowBackIosNew
                      size={20}
                      className="text-primary group-hover:text-white smooth"
                    />
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="bg-transparent border border-primary hover:bg-primary group w-[40px] h-[40px] rounded-full flex items-center justify-center smooth"
                  >
                    <MdArrowForwardIos
                      size={20}
                      className="text-primary group-hover:text-white smooth"
                    />
                  </button>
                </div>
              </div>
              {detailImages?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[350px] lg:h-[525px] bg-secondary flex justify-center items-center " onMouseMove={(e) => handleMouseMove(e, index)} // Pass index
                    onMouseLeave={handleMouseLeave}
                    onTouchMove={(e) => handleMouseMove(e, index)} // Pass index for touch
                    onTouchEnd={handleMouseLeave}
                  >
                    <div className="relative w-full h-[250px] md:h-[300px] rounded">
                      <Image
                        width={0}
                        height={0}
                        layout="fill"
                        objectFit="contain"
                        src={image}
                        alt={`Slide ${index + 1}`}
                      />
                      {zoomStyle && hoveredImageIndex === index && (
                        <div
                          className="absolute inset-0 bg-no-repeat bg-secondary cursor-zoom-in"
                          style={{
                            ...zoomStyle,
                            width: "100%",
                            height: "100%",
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                  <p className="block lg:hidden absolute bottom-3 right-1 px-4 py-1 rounded-2xl bg-secondary text-black text-sm">
                    {index + 1}/{totalImg}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="hidden lg:block">
              {/* Thumbnail Swiper */}
              <Swiper slidesPerView={4} spaceBetween={10}>
                {detailImages?.map((image, index) => (
                  <SwiperSlide key={index} className="mt-5">
                    <div className="bg-secondary relative w-[130px] h-[130px] rounded">
                      <Image
                        src={image}
                        width={0}
                        height={0}
                        layout="fill"
                        objectFit="contain"
                        className="p-2"
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="mt-3 lg:mt-0">          
            <h3 className="text-xl inte lg:text-4xl text-[#1D1D1D] font-medium my-3">
              {product?.name}
            </h3>
            <div className="flex lg:w-[240px] lg:justify-between items-center gap-4 lg:gap-0">
              <div className="flex space-x-1 items-center">
                {renderStars()}{" "}
                <p className="text-sm text-black/50 font-semibold ">{`(${product?.rating}.0) `}</p>
              </div>
              <span className="text-primary">
                {product?.reviews} {"reviews"}
              </span>
            </div>
            <h3 className="text-lg lg:text-2xl mt-2">$192.00</h3>
            <p className="my-4 lg:w-[500px]">PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.</p>
             <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="font-medium">Colours:</div>
          <div className="flex gap-2">
            <button
              className={cn("w-6 h-6 rounded-full border", selectedColor === "black" ? "ring-2 ring-gray-400" : "")}
              onClick={() => setSelectedColor("black")}
            >
              <span className="block w-full h-full rounded-full bg-white border border-gray-300"></span>
            </button>
            <button
              className={cn("w-6 h-6 rounded-full", selectedColor === "red" ? "ring-2 ring-gray-400" : "")}
              onClick={() => setSelectedColor("red")}
            >
              <span className="block w-full h-full rounded-full bg-red-400"></span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="font-medium mb-2">Size:</div>
          <div className="flex gap-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={cn(
                  "px-4 py-2 border rounded-md min-w-[40px] text-center",
                  selectedSize === size
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-black border-gray-300",
                )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex border border-gray-300 rounded-md">
            <button className="px-4 py-2 border-r border-gray-300" onClick={decreaseQuantity}>
              <FaMinus size={16} />
            </button>
            <div className="px-6 py-2 flex items-center justify-center min-w-[40px]">{quantity}</div>
            <button className="px-4 py-2 bg-red-500 text-white" onClick={increaseQuantity}>
              <FaPlus size={16} />
            </button>
          </div>

          <button className="main-btn !py-2 w-full">Buy Now</button>

          <button
            className={cn("p-2 border border-gray-300 rounded-md", wishlist ? "text-red-500" : "text-gray-500")}
            onClick={toggleWishlist}
          >
            <FaHeart className={wishlist ? "fill-red-500" : ""} size={20} />
          </button>
        </div>

        <div className="border border-gray-200 rounded-md">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <FaTruck size={24} />
              <div className="font-medium">Free Delivery</div>
            </div>
            {showPostalCode ? (
              <div className="mt-2">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter your postal code"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" onClick={togglePostalCode}>
                    Check
                  </Button>
                </div>
              </div>
            ) : (
              <button className="text-sm text-gray-700 mt-1" onClick={togglePostalCode}>
                Enter your postal code for Delivery Availability
              </button>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 8L17 4H3V20H21V8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 4V8H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12L7 14L9 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12L17 14L15 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="font-medium">Return Delivery</div>
            </div>
            <div className="text-sm text-gray-700 mt-1">
              Free 30 Days Delivery Returns. <span className="underline">Details</span>
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block fixed top-1/2 -translate-y-1/2 right-0 bg-primary text-center py-2 rounded-l-2xl px-3">
        <div className="flex justify-center mb-1">
          <HiOutlineShoppingBag size={20} color="#ffffff" />
        </div>
        <p className="text-[13px] leading-4 text-white w-[40px] mt-1">
          Your bag 0
        </p>
      </div>
    </div>
  );
}
