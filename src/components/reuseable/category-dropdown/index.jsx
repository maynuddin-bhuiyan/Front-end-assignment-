'use client';

import { Dropdown, Menu, Space } from 'antd';
import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";


const CategoryDropdown = () => {

    const [toggleArrow, setToggleArrow] = useState(false);

    const categories = [
        {
            title: "Women's Fashion", href: "/", dropdown: [
                { title: "Jeans", href: "/jeans" },
                { title: "Tops", href: "/tops" },
                { title: "Dresses", href: "/dresses" },
                { title: "Shoes", href: "/shoes" }
            ]
        },
        {
            title: "Men's Fashion", href: "/", dropdown: [
                { title: "Jeans", href: "/jeans" },
                { title: "Shirts", href: "/shirts" },
                { title: "Shoes", href: "/shoes" }
            ]
        },
        { title: "Electronics", href: "/" },
        { title: "Home & Lifestyles", href: "/" },
        { title: "Medicine", href: "/" },
        { title: "Sports & Outdoor", href: "/" },
        { title: "Baby's & Toys", href: "/" },
        { title: "Groceries & Pets", href: "/" },
        { title: "Health & Beauty", href: "/" }
    ];



    // Render dropdown menu items
    const renderDropdownMenu = (dropdown) => {
        return dropdown ? dropdown.map(subcategory => (
            <Menu.Item key={subcategory.href}>
                <a href={subcategory.href}>
                    {subcategory.title}
                </a>
            </Menu.Item>
        )) : null;
    };

    // Creating the menu for the dropdown button
    const menu = (
        <Menu>
            {categories.map((category, index) => (
                category.dropdown && category.dropdown.length > 0 ? (
                    <Menu.SubMenu
                        key={category.title}
                        title={category.title}
                    >
                        {renderDropdownMenu(category.dropdown)}
                    </Menu.SubMenu>
                ) : (
                    <Menu.Item key={category.title}>
                        <a href={category.href}>{category.title}</a>
                    </Menu.Item>
                )
            ))}
        </Menu>
    );

    return (
        <div>
            {/* Dropdown for Categories */}
            <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space className='px-3 py-[7px] sm:py-[10px] border flex gap-1 rounded-sm !mb-[11px] cursor-pointer text-xs sm:text-sm' onClick={() => setToggleArrow(!toggleArrow)}>
                        Categories
                        <IoMdArrowDropdown className={`${toggleArrow ? 'rotate-180' : 'rotate-0'} mt-1 duration-150`} />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
};

export default CategoryDropdown;
