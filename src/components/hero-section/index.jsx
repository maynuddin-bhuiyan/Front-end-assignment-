"use client";
import bannerImg from "@/assets/images/banner.jpg";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryList from "../reuseable/category-list";

export default function HeroSection() {
  const heroBanner = [
    {
      id: 1,
      banner: bannerImg,
    },
    {
      id: 2,
      banner: bannerImg,
    },
    {
      id: 3,
      banner: bannerImg,
    },
    {
      id: 4,
      banner: bannerImg,
    },
    {
      id: 5,
      banner: bannerImg,
    },
  ];

  return (
    <div className="container">
      <div className="border-t">
        <div className="relative !z-0 lg:flex">
          <div className="hidden lg:block">
            <CategoryList />
          </div>

          {/* banner */}
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              clickable: true, // Enables clickable dots
            }}
            modules={[Pagination]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => {
              // console.log(swiper);
            }}
          >
            {heroBanner?.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="flex-1 pt-4 lg:pt-9 lg:pl-10">
                  <Image
                    src={product?.banner}
                    alt="Banner Image"
                    width={0}
                    height={0}
                    layout="responsive"
                    className="rounded"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
