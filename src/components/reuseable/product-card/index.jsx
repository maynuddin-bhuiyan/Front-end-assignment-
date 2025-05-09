"use client"
import fill_eye from "@/assets/icons/fill-eye.svg";
import wishlist from "@/assets/icons/fill-heart.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


// Dynamic import to avoid SSR issues
const showToast = async (title, quantity, isExisting) => {
  const { notification } = await import("antd");
  
  notification.success({
    message: isExisting ? "update product quantity." : "Added to Cart",
    description: isExisting 
      ? `${title} quantity is now ${quantity}`
      : `${title} was added to your cart`,
    placement: "topRight",
    style: {
      backgroundColor: '#f0fff3',
      border: '1px solid #52c41a',
      borderRadius: '8px',
    },
    icon: <span style={{ color: '#52c41a' }}>✓</span>,
  });
};

export default function ProductCard({ data }) {
  
   const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex(
      (item) => item.slug === data.slug
    );

    let quantity = 1;
    let isExisting = false;

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
      quantity = existingCart[existingProductIndex].quantity;
      isExisting = true;
    } else {
      existingCart.push({
        ...data,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCartItems(existingCart);
    
    // Show antd notification
    showToast(data.title, quantity, isExisting);
  };
  
  
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
          fill={i < data?.rating ? "#FFAD33" : "none"} // Fill star if i < rating
          stroke="#FFAD33"
        >
          <path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" />
        </svg>
      );
    }
    return stars;
  };

  const router = useRouter();
  return (
    <div
      className="w-[270px] lg:m-0 m-auto"
      onClick={() => router.push(`/product/${data?.slug}`)}
    >
      <div className="bg-secondary  p-10 w-full relative rounded group">
        <div className="w-[140px] h-[160px] relative overflow-hidden m-auto">
          <Image
            src={data?.image}
            alt="product"
            width={0}
            height={0}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="absolute top-3 right-2">
          <Image src={wishlist} alt="icon" width={30} height={30} />
        </div>
        <div className="absolute top-12 right-2">
          <Image src={fill_eye} alt="icon" width={30} height={30} />
        </div>
        {data?.discount && (
          <button className="bg-primary text-white text-[12px] rounded py-1 px-3 absolute top-3 left-3">
            {data?.discount}
          </button>
        )}

        {data?.discount && (
          <button className="bg-primary text-white text-[12px] rounded py-1 px-3 absolute top-3 left-3">
            {data?.discount}
          </button>
        )}
        {data?.new_product && (
          <button className="bg-success text-white text-[12px] rounded py-1 px-3 absolute top-3 left-3">
            {data?.new_product}
          </button>
        )}

        <button   onClick={handleAddToCart} className="absolute bottom-1 left-0 py-2 px-4 w-full bg-black text-white rounded opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out">
          Add to Cart
        </button>
      </div>
      <h3 className="paragraph !text-black font-medium mt-2">{data?.title}</h3>
      <div className="flex gap-1 items-center">
        <span className="paragraph">
          {"$"}
          {data?.price}
        </span>{" "}
        {data?.preview_price && (
          <div className="flex gap-2 items-center">
            <span className="!text-black/50 line-through ml-3">
              {"$"}
              {data?.preview_price}
            </span>
            <div className="flex space-x-1 items-center">
              {renderStars()}{" "}
              <p className="text-sm text-black/50 font-semibold">{`(${data?.reviews})`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
