import DetailHeroSection from "../../../components/detail-hero-section";
import HeaderBreadCrumb from "../../../components/reuseable/header-break-crumb";
import productData from "../../../data/products.json";

export default function ProductDetail({ params }) {
  const {slug} = params;
  // console.log("product:", productData)
  const product = productData?.find((item) => item?.slug === slug);

  const slidesPerViewSettings = {
    320: { slidesPerView: 1 }, // Mobile
    640: { slidesPerView: 2 }, // Tablet
    1024: { slidesPerView: 4 }, // Desktop
  };

  const breadCrumbItems = [
    {title: 'Home'},
    {title: 'Product'},
    {title: `${product?.name}`},
  ];
  

  return (
    <div className="relative">     
      <div className="container">
      <HeaderBreadCrumb items={breadCrumbItems} />
      </div>
      <DetailHeroSection product={product} />
    </div>
  );
}