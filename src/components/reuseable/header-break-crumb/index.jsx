const HeaderBreadCrumb = ({ items }) => {
  return (
    <div className="flex flex-wrap pt-5 pb-2 lg:pb-10 lg:pt-5">
      {items?.map((item, index) => (
        <p key={index}>
          <span
            className={`${
              index === items.length - 1 ? "opacity-100" : "opacity-70"
            } capitalize`}
          >
            {item.title}
          </span>
          <span className="mx-2 opacity-70">
            {index < items.length - 1 && "/"}
          </span>
        </p>
      ))}
    </div>
  );
};

export default HeaderBreadCrumb;
