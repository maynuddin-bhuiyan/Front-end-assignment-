import React from 'react';
import Category from '../category';

const CategoryList = () => {

    const dataArray = [
        { title: "Jeans", href: "/jeans" },
        { title: "Tops", href: "/tops" },
        { title: "Dresses", href: "/dresses" },
        { title: "Shoes", href: "/shoes" },
    ];

    const categories = [
        { title: "Women's Fashion", href: "/", dropdown: dataArray },
        { title: "Men's Fashion", href: "/", dropdown: dataArray },
        { title: "Electronics", href: "/" },
        { title: "Home & Lifestyles", href: "/" },
        { title: "Medicine", href: "/" },
        { title: "Sports & Outdoor", href: "/" },
        { title: "Baby's & Toys", href: "/" },
        { title: "Groceries & Pets", href: "/" },
        { title: "Health & Beauty", href: "/" },
    ];

    return (
        <div>
            {/* category items */}
            <div className={`bg-white min-w-60 max-w-72 space-y-4 lg:border-r py-5 pl-3 lg:py-0 lg:pt-9 pr-4`}>
                {categories.map((category, index) => (
                    <Category
                        key={index}
                        title={category.title}
                        href={category.href}
                        dropdown={category.dropdown}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryList;