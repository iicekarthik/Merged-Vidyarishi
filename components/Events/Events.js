import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Pagination from "../Common/Pagination";

const Events = ({
  getEvents,
  parentClass,
  childClass,
  isPagination,
  start,
  end,
}) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const startIndex = (page - 1) * 6;

  const getSelectedEvent = events.slice(startIndex, startIndex + 6);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setEvents(getEvents.HowItIsWork);
    setTotalPages(Math.ceil(getEvents.events.length / 6));
  }, [setTotalPages, setEvents]);

  return (
    <>
      {/* <div className="row g-5">
        {getSelectedEvent.slice(start, end).map((data, index) => (
          <div className={`${childClass}`} key={index}>
            <div className={`rbt-card ${parentClass} variation-01 rbt-hover`}>
              <div className="rbt-card-img">
                <Link href={`/pages/event-details/${data.id}`}>
                  <Image
                    src={data.img}
                    width={355}
                    height={240}
                    priority
                    alt="Card image"
                  />
                  <div className="rbt-badge-3 bg-white">
                    <span>{data.badgeDate}</span>
                    <span>{data.badgeYear}</span>
                  </div>
                </Link>
              </div>
              <div className="rbt-card-body">
                <ul className="rbt-meta">
                  <li>
                    <i className="feather-map-pin"></i>
                    {data.location}
                  </li>
                  <li>
                    <i className="feather-clock"></i>
                    {data.time}
                  </li>
                </ul>
                <h4 className="rbt-card-title">
                  <Link href={`/pages/event-details/${data.id}`}>{data.title}</Link>
                </h4>

                <div className="read-more-btn">
                  <Link
                    className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                    href={`/pages/event-details/${data.id}`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Get Ticket</span>
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
          </div>
        ))}
      </div>

      {isPagination ? (
        <div className="row">
          <div className="col-lg-12 mt--60">
            <Pagination
              totalPages={totalPages}
              pageNumber={page}
              handleClick={handleClick}
            />
          </div>
        </div>
      ) : (
        ""
      )} */}
      <div className="row g-5">
        {/* 1st one */}
        {getSelectedEvent.slice(start, end).map((data, index) => (
          <div className={`${childClass}`} key={index}>
            <div
              className={`rbt-card2 variation-01 rbt-hover`}
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                flexDirection: "column",
                padding : "10px 20px"
              }}
            >
              {/* <div className="rbt-card-img">
                <Link href={`/pages/event-details/${data.id}`}>
                  <Image
                    src={data.img}
                    width={355}
                    height={240}
                    priority
                    alt="Card image"
                  />
                  <div className="rbt-badge-3 bg-white">
                    <span>{data.badgeDate}</span>
                    <span>{data.badgeYear}</span>
                  </div>
                </Link>
              </div> */}
              <div className="rbt-card-body" style={{ textAlign: "center" }}>
                <ul
                  className="rbt-meta"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <li>
                    {/* <i className="feather-map-pin"></i> */}
                    <Image
                      src={data.img}
                      style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                      width={305}
                      height={120}
                      alt="Image Not Available"
                    />
                  </li>
                  <li>
                    <span
                      style={{
                        fontWeight: "bold",
                        letterSpacing: "1.5px",
                        border: "2px solid #b966e7",
                      }}
                      className="rbt-badge variation-02 bg-secondary-opacity"
                    >
                      STEP {index + 1}
                    </span>
                  </li>
                </ul>

                <h5 style={{ marginTop: "5px" }}>
                  <Link href={`/pages/event-details/${data.id}`}>
                    {data.title}
                  </Link>
                </h5>

                <h6 style={{ marginTop: "-15px" }}>
                  <span>{data.desc}</span>
                </h6>

                {/* <div className="read-more-btn">
                  <Link
                    className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                    href={`/pages/event-details/${data.id}`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Get Ticket</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        ))}

        {/* 2nd one */}
        {getSelectedEvent.slice(4, 5).map((data, index) => (
          <div className={`col-lg-12 col-md-12 col-12`} key={index}>
            <div
              className={`rbt-card2 variation-01 rbt-hover`}
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                // flexDirection: "row",
              }}
            >
              {/* <div className="rbt-card-img">
                <Link href={`/pages/event-details/${data.id}`}>
                  <Image
                    src={data.img}
                    width={355}
                    height={240}
                    priority
                    alt="Card image"
                  />
                  <div className="rbt-badge-3 bg-white">
                    <span>{data.badgeDate}</span>
                    <span>{data.badgeYear}</span>
                  </div>
                </Link>
              </div> */}
              <div className="rbt-card-body pr--20" style={{ textAlign: "center" }}>
                <ul
                  className="rbt-meta"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  {/* Image */}
                  <li>
                    {/* <i className="feather-map-pin"></i> */}
                    <Image
                      src={data.img}
                      style={{ objectFit: "contain" }}
                      width={305}
                      height={120}
                      alt="Image Not Available"
                    />
                  </li>

                  {/* Details */}
                  <li style={{ textAlign: "left" }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        letterSpacing: "1.5px",
                        border: "2px solid #b966e7",
                      }}
                      className="rbt-badge variation-02 bg-secondary-opacity"
                    >
                      STEP {5}
                    </span>

                    <h5 style={{ marginTop: "15px" }}>
                      <Link href={`/pages/event-details/${data.id}`}>
                        {data.title}
                      </Link>
                    </h5>

                    <h6 style={{ marginTop: "-15px" }}>
                      <span>{data.desc}</span>
                    </h6>
                  </li>

                  {/* Enquiry Button */}

                    <span
                      style={{
                        fontWeight: "bold",
                        letterSpacing: "1.5px",
                      }}
                      // className="rbt-badge variation-02 bg-secondary-opacity"
                    >
                      <div className="rbt-button-group ml--20">
                        <Link
                          className="rbt-btn3 btn-gradient btn-gradient-3"
                          href="#"
                        >
                          <i className="feather-phone mr--10" ></i>
                        Enquire Now
                        </Link>
                      </div>
                    </span>
                </ul>

                {/* <div className="read-more-btn">
                  <Link
                    className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                    href={`/pages/event-details/${data.id}`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Get Ticket</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPagination ? (
        <div className="row">
          <div className="col-lg-12 mt--60">
            <Pagination
              totalPages={totalPages}
              pageNumber={page}
              handleClick={handleClick}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Events;
