import Link from "next/link";

const CategoryBanner = ({ category }) => {
  return (
    <>
      <div className="rbt-banner-content-top" style={{ marginTop: "-50px" }}>
        <div className="container">
          {category && (
            <div className="row">
              <div className="col-lg-12">
                {/* <ul className="page-list">
                  <li className="rbt-breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <div className="icon-right">
                      <i className="feather-chevron-right"></i>
                    </div>
                  </li>
                  <li className="rbt-breadcrumb-item active">
                    {category && category.category
                      ? category.category
                      : "All Courses"}
                  </li>
                </ul> */}
                <div className=" title-wrapper">
                  <h3 className=" mb--0" style={{ marginLeft: "10px" }}>
                    {" "}
                    {category && category.category
                      ? category.category
                      : "All Courses"}
                  </h3>
                  {/* <button href="#" className="rbt-badge-2">
                    <div className="image">🎉</div>
                    {category && category.id} {category.length} Courses
                  </button> */}
                </div>
                {/* <p className="description">
                  {category && category.desc
                    ? category.desc
                    : "Courses that help beginner designers become true unicorns."}
                </p> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryBanner;
