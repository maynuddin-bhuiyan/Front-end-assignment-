"use client"
import products from '@/data/products.json';
import Breadcrumb from './reuseable/bread-crumb';
import ProductCard from './reuseable/product-card';

export default function ExplorepProducts() {

  return (
    <div className="my-10 lg:my-20">
      <div className="container">
        <div className="flex items-center justify-center mb-5 lg:mb-10">
          <Breadcrumb title={"Explore Our Products"} label={"Our Products"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              data={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
