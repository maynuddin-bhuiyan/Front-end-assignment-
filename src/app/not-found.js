import Link from "next/link";
import HeaderBreadCrumb from "../components/reuseable/header-break-crumb";

export default function NotFound() {
  const breadcrumbItems = [{ title: "Home" }, { title: "404 Error" }];
  return (
    <>
      <div className="container">
        <HeaderBreadCrumb items={breadcrumbItems} />
      </div>

      <div className="container">
        <div className="py-20 flex justify-center items-center flex-col">
          <h2 className="text-3xl lg:text-8xl inte font-medium">
            404 Not Found
          </h2>
          <p className="paragraph !text-black mt-5">
            Your visited page not found. You may go home page.
          </p>
          <button type="submit" className="main-btn mt-10">
            <Link href={"/"}>Back to home page</Link>
          </button>
        </div>
      </div>
    </>
  );
}
