"use client";
import { useState } from "react";

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    id: 1,
    label: "English",
    value: "en",
  });

  const languageItem = [
    {
      id: 1,
      label: "English",
      value: "en",
    },
    {
      id: 2,
      label: "Bangla",
      value: "bd",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectLanguage = (language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative z-[999]">
      {/* Custom dropdown button */}
      <button
        onClick={toggleDropdown}
        className="bg-[#0D0D0D] text-white px-4 py-2 capitalize flex items-center gap-1"
        aria-expanded={isOpen}
      >
        {currentLanguage.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12.3645 12.95L17.3145 8L18.7285 9.414L12.3645 15.778L6.00051 9.414L7.41451 8L12.3645 12.95Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 bg-secondary text-black shadow-lg rounded-md w-full"
          role="menu"
        >
          {languageItem.map((item) => (
            <div
              key={item.id}
              className="flex smooth items-center gap-2 px-4 py-2 capitalize cursor-pointer rounded-md hover:bg-primary/20"
              role="menuitem"
              onClick={() => selectLanguage(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
