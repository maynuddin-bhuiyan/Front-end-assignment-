import Link from "next/link";
import { GoDot } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

export default function Category({ title, href, dropdown = null }) {
  return (
    <div className="cursor-pointer capitalize group relative">
      <div className="flex justify-between gap-2 items-center">
        {/* Conditionally render title behavior */}
        {dropdown && dropdown.length > 0 ? (
          <p>{title}</p>
        ) : (
          <Link href={href}>
            <p>{title}</p>
          </Link>
        )}

        {/* Arrow icon, visible only if dropdown exists */}
        {dropdown && dropdown.length > 0 && (
          <IoIosArrowForward />
        )}
      </div>

      {/* Dropdown items with smooth open/close animation */}
      {
        dropdown &&
        <div
          className={`absolute -right-[125px] top-0 bg-white border shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible space-y-2 py-2 z-20 transition-all duration-200 rounded-md`}
        >
          {dropdown?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-2 px-4 py-1 hover:bg-slate-300 duration-200"
            >
              <GoDot />
              {item.title}
            </Link>
          ))}
        </div>
      }
    </div>
  );
}
