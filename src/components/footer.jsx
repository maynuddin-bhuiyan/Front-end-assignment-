import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerLink = [
    {
      id: 1,
      title: "Account",
      item: [
        {
          id: 1,
          lable: "My Account",
          link: "/",
        },
        {
          id: 2,
          lable: "Login / Register",
          link: "/",
        },
        {
          id: 3,
          lable: "Cart",
          link: "/",
        },
        {
          id: 4,
          lable: "Wishlist",
          link: "/",
        },
        {
          id: 5,
          lable: "Shop",
          link: "/",
        },
      ],
    },
    {
      id: 2,
      title: "Quick Link",
      item: [
        {
          id: 1,
          lable: "Privacy Policy",
          link: "/",
        },
        {
          id: 2,
          lable: "Terms Of Use",
          link: "/",
        },
        {
          id: 3,
          lable: "FAQ",
          link: "/",
        },
        {
          id: 4,
          lable: "Contact",
          link: "/",
        },
      ],
    },
  ];
  return (
    <div className="bg-black pt-10 lg:pt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:gap-5 lg:gap-10 lg:pb-10">
          <div>
            <Link href={"/"}>
              <h2 className="text-xl lg:text-2xl font-semibold text-secondary">
                Exclusive
              </h2>
            </Link>
            <h2 className="lg:text-xl font-medium text-secondary lg:my-3 mt-2">
              Subscribe
            </h2>
            <p className="paragraph !text-secondary">
              Get 10% off your first order
            </p>

            <div className="border border-secondary flex justify-between px-3 py-2 rounded mt-2 lg:mt-5">
              <input
                type="email"
                placeholder="Enter your email"
                className="outline-none bg-transparent text-secondary"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.91199 11.9998H3.99999L2.02299 4.1348C2.01033 4.0891 2.00262 4.04216 1.99999 3.9948C1.97799 3.2738 2.77199 2.7738 3.45999 3.1038L22 11.9998L3.45999 20.8958C2.77999 21.2228 1.99599 20.7368 1.99999 20.0288C2.00201 19.9655 2.01313 19.9029 2.03299 19.8428L3.49999 14.9998"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="mt-7 lg:mt-0">
            <h2 className="lg:text-xl font-medium text-secondary mb-3 lg:mb-5">
              Support
            </h2>
            <p className="paragraph !text-secondary">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="my-1 lg:my-2">
              <Link
                className="paragraph !text-secondary"
                href="mailto:exclusive@gmail.com"
              >
                exclusive@gmail.com
              </Link>
            </p>
            <Link
              className="paragraph !text-secondary"
              href="tel:+88015888889999"
            >
              +88015-88888-9999
            </Link>
          </div>
          {footerLink.map((section) => (
            <div key={section.id}>
              <h2 className="lg:text-xl font-medium text-secondary mt-5 lg:mt-0 mb-3 lg:mb-5">
                {section.title}
              </h2>
              <ul>
                {section.item.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.link}
                      className="paragraph !text-secondary block mb-2"
                    >
                      {link.lable}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="lg:text-xl font-medium text-secondary mt-5 lg:mt-0 mb-3 lg:mb-5">
              Download App
            </h2>
            <p className="text-secondary text-[12px]">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-2 mt-2">
              <div>
                <Image
                  src={"/qr_code.png"}
                  alt="qr-code"
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <Image
                  src={"/google-play.png"}
                  alt="qr-code"
                  width={110}
                  height={40}
                />
                <Image
                  src={"/app-store.png"}
                  alt="qr-code"
                  width={110}
                  height={40}
                />
              </div>
            </div>
            <div className="flex gap-5 items-center mt-3 lg:mt-5 mb-3 lg:mb-0">
              <Image
                src={"/Icon-Facebook.svg"}
                alt="qr-code"
                width={24}
                height={24}
              />
              <Image
                src={"/icon-instagram.svg"}
                alt="qr-code"
                width={24}
                height={24}
              />
              <Image
                src={"/Icon-Twitter.svg"}
                alt="qr-code"
                width={24}
                height={24}
              />
              <Image
                src={"/Icon-Linkedin.svg"}
                alt="qr-code"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="!text-secondary/30 text-sm lg:text-base py-3 text-center">
          {" "}
          © Design by Codethinker. All rights reserved.
        </p>
      </div>
    </div>
  );
}
