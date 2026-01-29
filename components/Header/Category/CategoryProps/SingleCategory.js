"use client";
import Image from "next/image";
import Link from "next/link";
import demoImage from "@/public/images/image-demo.png";
import HoverButton from "@/components/Button/ButtonProps/HoverButton";

const SingleCategory = ({
  title,
  CategoryData,
  CategoryNum,
  isActive,
  image,
  HandleChangeCourse,
  ClickAbleCourse,
}) => {
  return (
    <li className={`dropdown-parent-list ${isActive ? "active" : ""}`}>
      <div className="wrapper">
        <div className="mega-category-item">
          <div
            className={`nav-category-item ${ClickAbleCourse === title ? (`rbt-btn7 btn-gradient icon-hover`) : ""}`}
            // style={{
            //   backgroundColor: ClickAbleCourse === title ? "rbt-btn-gradient-Color" : "",
            //   color: ClickAbleCourse === title ? " #fff" : "",
            // }}
            onClick={() => HandleChangeCourse(title)}
          >
            <div className="thumbnail">
              <div className="image">
                {image ? (
                  // <Image src={image} width={454} height={332} alt={title} />
                  <Image src={image} width={454} height={100} alt={title || "Image Not Available"} />
                ) : (
                  ""
                )}
              </div>
              <Link
                style={{
                  color: ClickAbleCourse === title ? " #fff" : "",
                }}
                href={""}
              >
                <span>{title}</span>
                <i
                  style={{
                    color: ClickAbleCourse === title ? " #fff" : "",
                  }}
                  className="feather-chevron-right"
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown-child-wrapper">
        {/* <div className="child-inner">
          {CategoryData &&
            CategoryNum.map((cate, index) => (
              <div className="child-item" style={{ padding: "10px 10px" }}>
                <div
                  className="dropdown-child-list"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      // gap: "5px",
                    }}
                  >
                    <Link
                      href={cate.link}
                      style={{
                        flexGrow: 1,
                        fontSize: "14px",
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "calc(25% - 10px)",
                        whiteSpace: "balance",
                      }}
                    >
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          fontSize: "12px",
                          fontWeight: "bold",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div>University Name</div>
                      </span>
                      <span
                        style={{
                          marginTop: "5px",
                          minwidth: "150px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Bachelors Of Course Name
                      </span>
                    </Link>
                  </div>
                </div>
                //  <div>
                //   <HoverButton
                //     mt={false}
                //     SwitchY="Explore"
                //     switchBtnTwo="btn-gradient rbt-switch-btn rbt-switch-y"
                //   />
                // </div> 

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    fontSize: "12px",
                    // width: "100%",
                    marginTop: "8px",
                  }}
                >
                  <div>
                    <Link
                      className="rbt-btn2 bg-secondary-opacity icon-hover"
                      href="#"
                    >
                      <span className="btn-text">Explore</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="rbt-btn2 bg-coral-opacity hover-icon-reverse"
                      href="#"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">View University</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    fontSize: "10px",
                    marginTop: "15px",
                  }}
                >
                  <div>
                    <Link
                      className="rbt-btn6 bg-secondary-opacity icon-hover"
                      href="#"
                    >
                      <span className="btn-text">Explore</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="rbt-btn5 bg-coral-opacity hover-icon-reverse"
                      href="#"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">View University</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div> */}

        {/* <div className="child-inner" >
          <div className="row g-4 pt--30 pb--60">
            <div className="col-lg-12">
              <div className="section-title">
                <h5 className="rbt-title-style-2">Our Top Course</h5>
              </div>
            </div>

            {CategoryNum.slice(0, 4).map((data, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                <div className="rbt-card variation-01 rbt-hover">
                  <div className="rbt-card-img">
                    <a href={`/course-details/${data.id}`}>
                      <Image
                        src={data.courseImg}
                        width={186}
                        height={128}
                        alt="Card image"
                      />
                    </a>
                  </div>
                  <div className="rbt-card-body">
                    <h5 className="rbt-card-title">
                      <a href={`/course-details/${data.id}`}>
                        {data.courseTitle}
                      </a>
                    </h5>
                    <div className="rbt-review">
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <span className="rating-count">
                        {" "}
                        ({data.review} Reviews)
                      </span>
                    </div>
                    <div className="rbt-card-bottom">
                      <div className="rbt-price">
                        <span className="current-price">$15</span>
                        <span className="off-price">$25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </li>
  );
};

export default SingleCategory;
