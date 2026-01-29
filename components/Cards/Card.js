import Image from "next/image";
import Link from "next/link";

const Card = ({
  start,
  end,
  col,
  mt,
  isDesc,
  isUser,
  categoryItems = [],
  title,
  maxItems = 12,
  maxItems2 = 12,
  maxItems3,
  isUniversity,
  Ourpartners,
}) => {
  return (
    <>
      {/* Leading universities */}
      {isUniversity ? (
        <div className="row g-4 pt--15 pb--10 ">
          {Array.isArray(categoryItems) && categoryItems.length > 0 ? (
            categoryItems.slice(0, maxItems2).map((data, index) => (
              <div className={`${col}`} key={index}>
                <div
                  className="rbt-card2 variation-01 rbt-hover"
                  style={{
                    border: "2px solid purple",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link href={`/${data?.link}`}>
                    <div
                      className="rbt-card-body pt--10 pb--10 pr-10 pl--10"
                      style={{ flex: "1 1 1" }}
                    >
                      <div
                        className="rbt-card-top"
                        style={{ display: "flex", justifyContent: "center" }}
                      ></div>
                      <Image
                        src={data?.image}
                        alt="Image Not Available"
                        width={128}
                        height={43}
                        className="mt--10"
                      />
                      <p
                        className="mt--10"
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data?.title}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>{title} Not Available</div>
          )}
        </div>
      ) : Ourpartners ? (
        // Our partners block
        <div className="row g-4 pt--15 pb--10 ">
          {Array.isArray(categoryItems) && categoryItems.length > 0 ? (
            categoryItems.slice(0, maxItems3).map((data, index) => (
              <div className={`${col}`} key={index}>
                <div
                  className="rbt-card2 variation-01 rbt-hover"
                  style={{
                    border: "2px solid purple",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link href={`/${data?.link}`}>
                    <div
                      className="rbt-card-body pt--10 pb--10 pr-10 pl--10"
                      style={{ flex: "1 1 1" }}
                    >
                      <div
                        className="rbt-card-top"
                        style={{ display: "flex", justifyContent: "center" }}
                      ></div>
                      <Image
                        src={data?.image}
                        alt="Image Not Available"
                        width={128}
                        height={43}
                        className="mt--10"
                      />
                      <p
                        className="mt--10"
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data?.title}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                        width: "100%",
                        fontWeight: "bold",
                        background: "#800080",
                        color: "#ffffff",
                        padding: "6px 0px",
                        borderRadius: "0px 0px 0px 0px",
                        cursor: "pointer",
                        marginTop: "auto",
                      }}
                    >
                      {data?.mode}
                    </p>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>{title} Not Available</div>
          )}
        </div>
      ) : (
        // Default course cards
        <div className="row g-4 pt--15 heightOverflowPadding2 d-flex justify-content-start">
          {Array.isArray(categoryItems) && categoryItems.length > 0 ? (
            categoryItems.slice(0, maxItems).map((data, index) => (
              <div className={`${col}`} key={index}>
                <div
                  className="rbt-card2 variation-01 rbt-hover"
                  style={{
                    border: "2px solid purple",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="rbt-card-body" style={{ flex: "1 1 auto" }}>
                    <div className="rbt-card-top"></div>
                    <Link
                      aria-label={`Learn more about ${data?.course_type} ${data?.course_link}`}
                      href={`/course/${data?.course_link}`}
                    >
                      <h5 className="ml--10 mr--5 mt--10">
                        {data?.shortName || "Course"}
                      </h5>
                      <h6
                        className="ml--10 mr--5"
                        style={{ marginTop: "-15px", fontSize: "16px" }}
                      >
                        {data?.course_name || "Course"}
                      </h6>
                    </Link>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      width: "100%",
                      fontWeight: "bold",
                      background: "#800080",
                      color: "#ffffff",
                      padding: "6px 0px",
                      borderRadius: "0px 0px 0px 0px",
                      cursor: "pointer",
                      marginTop: "auto",
                    }}
                  >
                    <Link href={`/course/${data?.course_link}`}>
                      View Course
                    </Link>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                width: "100vh",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>
                {title === "Doctorate/Ph.D."
                  ? "Doctorate/Ph.D Coming Soon"
                  : `${title} Not Available`}
              </h5>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Card;

{
  /* {CourseDetails &&
        CourseDetails.courseDetails.slice(start, end).map((data, index) => (
          <div
            className={`${col} ${mt}`}
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="800"
            key={index}
          >
            <div className="rbt-card variation-01 rbt-hover">
              <div className="rbt-card-img">
                <Link href={`/course-details/${data.id}`}>
                  <Image
                    src={data.courseImg}
                    width={355}
                    height={244}
                    alt="Card image"
                  />
                  {data.offPrice > 0 ? (
                    <div className="rbt-badge-3 bg-white">
                      <span>-{data.offPrice}%</span>
                      <span>Off</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
              <div className="rbt-card-body">
                <div className="rbt-card-top">
                  <div className="rbt-review">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="rating-count">
                      ({data.review} Reviews)
                    </span>
                  </div>
                  <div className="rbt-bookmark-btn">
                    <Link className="rbt-round-btn" title="Bookmark" href="#">
                      <i className="feather-bookmark"></i>
                    </Link>
                  </div>
                </div>

                <h4 className="rbt-card-title">
                  <Link href={`/course-details/${data.id}`}>
                    {data.courseTitle}
                  </Link>
                </h4>

                <ul className="rbt-meta">
                  <li>
                    <i className="feather-book"></i>
                    {data.lesson} Lessons
                  </li>
                  <li>
                    <i className="feather-users"></i>
                    {data.student} Students
                  </li>
                </ul>
                {isDesc ? <p className="rbt-card-text">{data.desc}</p> : ""}
                {isUser ? (
                  <div className="rbt-author-meta mb--10">
                    <div className="rbt-avater">
                      <Link href={`/profile/${data.id}`}>
                        <Image
                          src={data.userImg}
                          width={33}
                          height={33}
                          alt="Sophia Jaymes"
                        />
                      </Link>
                    </div>
                    <div className="rbt-author-info">
                      By{" "}
                      <Link href={`/profile/${data.id}`}>{data.userName}</Link>{" "}
                      In <Link href="#">{data.userCategory}</Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="rbt-card-bottom">
                  <div className="rbt-price">
                    <span className="current-price">${data.price}</span>
                    <span className="off-price">${data.offPrice}</span>
                  </div>
                  {data.button ? (
                    <Link
                      className="rbt-btn-link left-icon"
                      href={`/course-details/${data.id}`}
                    >
                      <i className="feather-shopping-cart"></i> Add To Cart
                    </Link>
                  ) : (
                    <Link
                      className="rbt-btn-link"
                      href={`/course-details/${data.id}`}
                    >
                      Learn More<i className="feather-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))} */
}
{
  /* {CourseDetails &&
        CourseDetails.courseDetails.slice(start, end).map((data, index) => (
          <div
            className={`${col} ${mt}`}
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="800"
            key={index}
          >
            <div
              className="rbt-card2 variation-01 rbt-hover"
              style={{ border: "2px solid purple", borderRadius: "8px" }}
            >
              <div className="rbt-card-img">
                <Link href={`/course-details/${data.id}`}>
                  <Image
                    src={data.courseImg}
                    width={355}
                    height={244}
                    alt="Card image"
                  />
                  {data.offPrice > 0 ? (
                    <div className="rbt-badge-3 bg-white">
                      <span>-{data.offPrice}%</span>
                      <span>Off</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
              </div>

              <div className="rbt-card-body">
                <div className="rbt-card-top">
                  <p
                    style={{
                      fontSize: "10px",
                      textAlign: "center",
                      // width: "",
                      fontWeight: "bold",
                      background: "green",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Online Course
                  </p>
                  <div className="rbt-review">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="rating-count">
                      ({data.review} Reviews)
                    </span>
                  </div>
                  <div className="rbt-bookmark-btn">
                    <Link className="rbt-round-btn" title="Bookmark" href="#">
                      <i className="feather-bookmark"></i>
                    </Link>
                  </div>
                </div>

                <Link href={`/course-details`}>
                  <h5 className="ml--10 mt--10">MBA</h5>
                  <h6 className="ml--10" style={{ marginTop: "-15px" }}>
                    Masters Of Business Administrator
                  </h6>
                </Link>

                <p
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    width: "-webkit-fill-available",
                    fontWeight: "bold",
                    background: "#800080",
                    color: "#ffffff",
                    padding: "4px 0px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Course
                </p>

                <ul className="rbt-meta">
                  <li>
                    <i className="feather-book"></i>
                    {data.lesson} Lessons
                  </li>
                  <li>
                    <i className="feather-users"></i>
                    {data.student} Students
                  </li>
                </ul>
                {isDesc ? <p className="rbt-card-text">{data.desc}</p> : ""}
                {isUser ? (
                  <div className="rbt-author-meta mb--10">
                    <div className="rbt-avater">
                      <Link href={`/profile/${data.id}`}>
                        <Image
                          src={data.userImg}
                          width={33}
                          height={33}
                          alt="Sophia Jaymes"
                        />
                      </Link>
                    </div>
                    <div className="rbt-author-info">
                      By{" "}
                      <Link href={`/profile/${data.id}`}>{data.userName}</Link>{" "}
                      In <Link href="#">{data.userCategory}</Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="rbt-card-bottom">
                  <div className="rbt-price">
                    <span className="current-price">${data.price}</span>
                    <span className="off-price">${data.offPrice}</span>
                  </div>
                  {data.button ? (
                    <Link
                      className="rbt-btn-link left-icon"
                      href={`/course-details/${data.id}`}
                    >
                      <i className="feather-shopping-cart"></i> Add To Cart
                    </Link>
                  ) : (
                    <Link
                      className="rbt-btn-link"
                      href={`/course-details/${data.id}`}
                    >
                      Learn More<i className="feather-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))} */
}

{
  /* {categoryItems?.length > 0 ? (
        categoryItems?.map((data, index) => (
          <div
            className={`${col} ${mt}`}
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="800"
            key={index}
          >
            <div
              className="rbt-card2 variation-01 rbt-hover"
              style={{ border: "2px solid purple", borderRadius: "8px" }}
            >
              <div className="rbt-card-body">
                <div className="rbt-card-top"></div>

                <Link href={`/course-details`}>
                  <h5 className="ml--10 mt--10">{data?.ShortCode}</h5>
                  <h6 className="ml--10" style={{ marginTop: "-15px" }}>
                    {data?.FullName}
                  </h6>
                </Link>

                <p
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    width: "-webkit-fill-available",
                    fontWeight: "bold",
                    background: "#800080",
                    color: "#ffffff",
                    padding: "4px 0px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Course
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div> Not Available</div>
      )} */
}
