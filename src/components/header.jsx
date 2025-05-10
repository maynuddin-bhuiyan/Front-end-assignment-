"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";
import { CartDrawer } from "./cart-drawer";
import CategoryDropdown from "./reuseable/category-dropdown";
import LanguageDropdown from "./reuseable/language-dropdown";


export default function Header() {
 const [isCartOpen, setIsCartOpen] = useState(false)

  const navMenuList = [
    { id: 1, menuItem: "Home", href: "/" },
    { id: 2, menuItem: "Contact", href: "/contact" },
    { id: 3, menuItem: "About", href: "/about" },
    { id: 4, menuItem: "Sign Up", href: "/sign-up" },
  ];

  const [isScroll, setIsScroll] = useState(false);
  const [isopenMenu, setIsOpenMenu] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const handleScroll = () => {
    setIsScroll(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isopenMenu) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isopenMenu]);


  return (
    <div className="relative">
      <div className="bg-black py-3">
        <div className="container">
          <div className="relative">
            <p className="text-[12px] lg:text-sm text-secondary lg:text-center lg:w-full w-[250px]">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
              <span className="font-semibold">ShopNow</span>
            </p>
            <div className="absolute right-0 lg:-top-3 top-0 z-20">
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          className={`
          ${isScroll
              ? "fixed top-0 left-0 w-full h-16 z-40 shadow-gray-300 bg-secondary shadow-md translate-y-0 pb-28 lg:pb-0"
              : "relative translate-y-0"
            }
          smooth
        `}
        >
          <div className="container">
            <div className="flex justify-between pt-3 pb-1 lg:pb-2">
              <div>
                <Link href={"/"}>
                  <h2 className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
                    Exclusive
                  </h2>
                </Link>
              </div>
              <nav className="hidden lg:block">
                <ul className="flex space-x-6">
                  {navMenuList.map((item) => (
                    <li key={item.id}>
                      <Link className="paragraph !text-black" href={item.href}>
                        {item.menuItem}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex lg:gap-5 gap-3">
                <div className="hidden bg-secondary rounded px-5 py-2 lg:flex gap-2 items-center lg:w-[260px]">
                  <input
                    type="search"
                    placeholder="What are you looking for?"
                    className="text-sm bg-transparent outline-none w-full"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="cursor-pointer"
                  >
                    <path
                      d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex justify-center lg:gap-5 gap-3">
                  <Link href={"/wish-list"}>
                    <Image
                      src={"/wishlist.svg"}
                      alt="wishlist"
                      width={32}
                      height={32}
                    />
                  </Link>
                  <button onClick={() => setIsCartOpen(true)}>
                    <Image
                      src={"/cart.svg"}
                      alt="wishlist"
                      width={32}
                      height={32}
                    />
                  </button>
                  <Link href={"/admin"}>
                  <FaRegUser />
                  </Link>
                </div>

                {/* mobile menu btn */}
                <div className="lg:hidden text-3xl ">
                  <button onClick={() => {
                    setIsOpenMenu(true);
                    setOpenCategory(false);
                  }}>
                    <HiMiniBars3 />
                  </button>
                </div>
              </div>
            </div>
            {/* ------- mobile categorylist & search ------- */}
            <div className="flex items-center gap-2 sm:gap-4 relative !z-50 lg:hidden">
              <div>
                <CategoryDropdown />
              </div>
              {/* mobile search */}
              <div className="bg-transparent flex-1">
                <div className="bg-secondary rounded px-5 py-1 sm:py-2 flex gap-2 items-center mb-3 border">
                  <input
                    type="search"
                    placeholder="What are you looking for?"
                    className="text-sm bg-transparent outline-none w-full"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="cursor-pointer"
                  >
                    <path
                      d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile nav */}
        <div className={`${isopenMenu && 'fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50'}`}>
          <div
            className={`lg:hidden w-72 h-screen fixed top-0 right-0 bg-secondary z-50 text-black transform ${isopenMenu ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out`}
          >
            <h2 className="text-center bg-slate-600 text-title py-4">Menu</h2>
            <div className="absolute top-3 left-2 text-title text-3xl ">
              <button onClick={() => setIsOpenMenu(false)}>
                <FaRegRectangleXmark />
              </button>
            </div>
            <nav className="w-full mt-16">
              <ul className="text-center px-5">
                {navMenuList.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="text-[16px] border-b py-2 block"
                      onClick={() => setIsOpenMenu(false)}
                      href={item.href}
                    >
                      {item.menuItem}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
}
