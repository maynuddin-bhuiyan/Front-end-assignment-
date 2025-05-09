// import Countdown from "react-countdown";

export default function Breadcrumb({
  title,
  label,
}) {
  // const targetDate = new Date("2024-12-12T00:00:00");
  return (
    <div>
      {label && (
        <div className="flex items-center gap-1 lg:gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="35"
            viewBox="0 0 20 40"
            fill="none"
          >
            <rect width="20" height="40" rx="4" fill="#DB4444" />
          </svg>
          <h2 className="text-primary font-semibold inte text-sm lg:text-base">
            {label}
          </h2>
        </div>
      )}

      <div className="lg:mt-5 flex items-center justify-between">
        <h2 className="title text-black font-semibold">{title}</h2>
      </div>
    </div>
  );
}
