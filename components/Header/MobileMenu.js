import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/vidya/logo/VR_logo.png";

import Nav from "./Nav";
import { useAppContext } from "@/context/Context";
import { IoCalendarNumberOutline } from "react-icons/io5";

const MobileMenu = () => {
  const { mobile, setMobile, setIsOpen } = useAppContext();

  const BookAppointment = () => {
    setIsOpen(true);
    setMobile(false);
  };

  const EnquireNow = () => {
    window.open("https://wa.me/919619535535", "_blank");
  };

  return (
    <>
      <div className={`popup-mobile-menu ${mobile ? "" : "active"}`}>
        <div className="inner-wrapper">
          <div className="inner-top">
            <div className="content">
              <div className="logo">
                <Link href="/">
                  <Image
                    src={logo}
                    width={180}
                    height={82}
                    style={{
                      objectFit: "contain",
                    }}
                    priority={true}
                    alt="Vidyarishi Logo"
                  />
                </Link>
              </div>
              <div className="rbt-btn-close">
                <button
                  className="close-button rbt-round-btn"
                  onClick={() => setMobile(!mobile)}
                >
                  <i className="feather-x"></i>
                </button>
              </div>
            </div>
            <p className="description" style={{ textAlign: "left" }}>
              Vidyarishi is a future-ready educational platform, partnering with
              top universities to offer a wide range of online and distance
              programs—bachelor’s, master’s, diplomas, and certificates. With a
              user-first approach, we simplify admissions into clear, actionable
              steps, ensuring a smooth and empowering learning journey.
            </p>
            <ul className="navbar-top-left rbt-information-list justify-content-start">
              <li>
                <Link href="mailto:hello@example.com">
                  <i className="feather-mail"></i>support@vidyarishi.com
                </Link>
              </li>
              <li>
                <Link href="tel:+919619535535">
                  <i className="feather-phone"></i>(+91) 9619 535 535
                </Link>
              </li>
            </ul>
            {/* <ul 
            style={{
              display : 'flex',
              alignItems : 'start',
              flexDirection : 'column',
              marginBottom : '0',
              marginTop : '10px'
            }}
            >
              <li className="has-child-menu rbt-btn2">
                <Link href={""}>Book Appointment</Link>
              </li>
              <li className="has-child-menu rbt-btn2">
                <Link href={""}>Book Appointment</Link>
              </li>
            </ul> */}
            <div className="row mt--30">
              <div className="col-lg-6">
                <div className="rbt-button-group">
                  <button
                    onClick={() => BookAppointment()}
                    className="rbt-btn3 btn-gradient icon-hover"
                    style={{ flex: "auto", textAlign: "left" }}
                  >
                    <span className="btn-text text-center">
                      <span>
                        <svg
                          style={{
                            marginTop: "-6px",
                            marginRight: "4px",
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="20"
                          height="18"
                          class="main-grid-item-icon"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <rect
                            height="18"
                            rx="2"
                            ry="2"
                            width="18"
                            x="3"
                            y="4"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                      </span>
                      Book Appointment{" "}
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </button>
                  <button
                    onClick={() => EnquireNow()}
                    className="rbt-btn3 btn-gradient icon-hover"
                    style={{ flex: "auto", textAlign: "left" }}
                  >
                    <span className="btn-text">
                      <i
                        style={{ marginRight: "10px" }}
                        className="feather-phone"
                      ></i>
                      Enquire Now
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Nav />

          <div className="mobile-menu-bottom">
            {/* <div className="rbt-btn-wrapper mb--20">
              <Link
                className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none w-100 justify-content-center text-center"
                href="#"
              >
                <span>Enroll Now</span>
              </Link>
            </div> */}

            <div className="social-share-wrapper">
              <span className="rbt-short-title d-block">Find With Us</span>
              <ul className="social-icon social-default transparent-with-border justify-content-start mt--20">
                <li>
                  <Link href="https://www.facebook.com/vidyarishiindia">
                    <i className="feather-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.twitter.com">
                    <i className="feather-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/vidyarishi_india">
                    <i className="feather-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://in.linkedin.com/company/vidyarishi">
                    <i className="feather-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
