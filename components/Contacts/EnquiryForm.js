"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import AllCoursesVidya from "@/data/vidya/VidyaCourses.json";
import { useAppContext } from "@/context/Context";
import Loader from "./Loader";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../public/images/vidya/logo/VR_logo.png";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoWhatsapp,
  BiPhoneCall,
} from "react-icons/bi";
import Social from "../Socials";
import Link from "next/link";
import { useScreenSize } from "@/hooks/screenSize";

const EnquiryForm = ({
  gap,
  description,
  buttonName,
  Inputheight,
  InputFontSize,
  SelectPadding,
  isEnquiryButton,
  isEnquiryContactButton,
  isFormInputMarginTop,
  isSelectedCourse,
  isEnquiryblogButton,
  isEnquiryContactGet,
}) => {
  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  const { isOpen, setIsOpen, IsOpenSelectedCourse, setIsOpenSelectedCourse } =
    useAppContext();

  const [IndianAllStates, setIndianAllStates] = useState([
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Jammu and Kashmir",
    "Ladakh",
  ]);

  const [AllCourses, setAllCourses] = useState([]);
  const [degreeType, setDegreeType] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    setAllCourses(AllCoursesVidya?.all_Courses);
  }, []);

  const handleDegreeChange = (e) => {
    const value = e.target.value;
    setDegreeType(value);

    // reset selected course
    setContactForm((prev) => ({
      ...prev,
      course: "",
    }));

    if (!value) {
      setFilteredCourses(AllCourses);
    } else {
      const filtered = AllCourses.filter(
        (course) => course.degree_type === value
      );
      setFilteredCourses(filtered);
    }
  };


  const [ContactForm, setContactForm] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    state: "",
    course: "",
    city: "",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const HandleSubmitContactUsForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, state, course, city, gender } = ContactForm;

    if (!name?.trim() || !email || !phone || !state || !course) {
      toast.warning("Please fill all required fields before submitting!");
      return;
    }

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : "N/A";

    setLoading(true);
    setError(null);

    // const apiKey = process.env.NEXT_PUBLIC_BIZIVERSE_APIKEY;

    // **Double Stringify `data` as per API requirement**
    // const apiParams = JSON.stringify([
    //   {
    //     moduleID: 25,
    //     actionType: "setLead",
    //     data: JSON.stringify([
    //       {
    //         companyName: "N/A",
    //         title: gender === "Male" ? "Mr." : "Ms.",
    //         firstName,
    //         lastName,
    //         email,
    //         mobile: phone,
    //         designation: "N/A",
    //         city: city || "N/A",
    //         state,
    //         needs: course,
    //         subject: course,
    //         source: "Vidyarishi Website",
    //       },
    //     ]),
    //   },
    // ]);

    // // **Properly Encode API Data for application/x-www-form-urlencoded**
    // const formData = new URLSearchParams();
    // formData.append("apiKey", apiKey);
    // formData.append("apiParams", apiParams); // ✅ Double-stringified JSON

    try {
      const response = await axios.post(
        "/api/biziverse/set-lead",
        {
          apiParams: [
            {
              moduleID: 25,
              actionType: "setLead",
              data: [
                {
                  companyName: "N/A",
                  title: gender === "Male" ? "Mr." : "Ms.",
                  firstName,
                  lastName,
                  email,
                  mobile: phone,           // must be string digits
                  designation: "N/A",
                  city: city || "N/A",
                  state,
                  needs: course,
                  subject: course,
                  source: "Vidyarishi Website",
                },
              ],
            },
          ],
        }
      );

      const responseText = response.data.data;

      // ✅ Use Regex to Detect Error Codes in XML Response
      const match = responseText.match(/<errorCode>(-?\d+)<\/errorCode>/);
      const errorCode = match ? match[1] : null;

      if (errorCode === "200") {
        toast.info("Please Try After Some Times");
      } else if (errorCode === "305") {
        toast.warning("This Mobile Number Already Used.");
      } else if (errorCode === "201") {
        toast.warning("Missing required data. Please fill all fields.");
      } else if (errorCode === "-1") {
        toast.success("We Will Contact You Shortlyyy!");
        setTimeout(() => {
          setContactForm({
            name: "",
            email: "",
            gender: "",
            phone: "",
            state: "",
            course: "",
            city: "",
          });
          setIsOpen(false);
        }, 1500);
      } else {
        toast.error("There was an error processing your request.");
      }
    } catch (error) {
      toast.error("Error sending data");
    } finally {
      setLoading(false);
    }
  };

  const OnChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // If the input is "phone", allow only 10 digits
    if (name === "phone") {
      // Remove non-numeric characters and limit to 10 digits
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
      setContactForm((prev) => ({
        ...prev,
        [name]: phoneValue,
      }));
    } else {
      // For other fields, update normally
      setContactForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);

  return (
    <>
      {/* {isEnquiryButton && (
          <button
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: "white",
              width: "30px",
              height: "30px",
              color: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              textAlign: "right",
              marginBottom: "10px",
              padding: "5px",
              marginLeft: "auto", // Right side le jaane ke liye
            }}
          >
            <i className="feather-x"></i>
          </button>
        )} */}

      <div
        // className={`${
        //   isEnquiryButton ? "d-xxl-block d-xl-block p-0 m-0" : "d-block"
        // } `}
        style={{
          width: "100%",
          marginTop: isEnquiryButton ? "0px" : "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "20px 20px 20px rgba(255, 255, 255, 0.1)",
          padding:
            isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
              ? "8px 25px 25px 25px"
              : "15px 0px",
          paddingLeft:
            isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
              ? "20px 10px"
              : "60px",
          width:
            isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
              ? BigScreenLogic
                ? "100%"
                : "100%"
              : "auto",
        }}
      >
        {/* <div
          // className="rbt-contact-form contact-form-style-1"
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 10px 30px rgba(226, 219, 219, 0.1)",
            padding:
              isEnquiryButton || isEnquiryContactButton
                ? "8px 25px 25px 25px"
                : "15px 0px",
            paddingLeft:
              isEnquiryButton || isEnquiryContactButton ? "20px 10px" : "60px",
            width:
              isEnquiryButton || isEnquiryContactButton
                ? BigScreenLogic
                  ? "86%"
                  : "100%"
                : "auto",
          }}
        > */}
        <div style={{ width: "100%" }}>
          {isEnquiryButton && isEnquiryContactButton && (
            <div className="section-title text-start">
              <span className="subtitle bg-primary-opacity">
                Vidyarishi FOR EVERYONE
              </span>
            </div>
          )}

          {isEnquiryButton && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: BigScreenLogic ? "row" : "column",
                  justifyContent: BigScreenLogic
                    ? "space-around"
                    : "flex-start",
                  alignItems: BigScreenLogic ? "center" : "flex-start",
                  textAlign: BigScreenLogic ? "center" : "left",
                  padding: "10px",
                  marginBottom: BigScreenLogic ? "10px" : "0",
                  gap: BigScreenLogic ? "10px" : "2px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <Image
                    src={logo}
                    width={140}
                    height={40}
                    style={{ objectFit: "contain" }}
                    priority={true}
                    alt="Vidyarishi Logo"
                  />
                </div>
                <div style={{ textAlign: "left" }}>
                  <h6
                    style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}
                  >
                    Enquire Now
                  </h6>
                  <h6 style={{ margin: 0, fontSize: "14px" }}>
                    100% Free Counselling
                  </h6>
                </div>
              </div>
              <div
                style={{
                  marginTop: "0px",
                  marginBottom: "10px",
                  width: "100%",
                  height: "2.5px",
                  backgroundColor: "purple",
                }}
              ></div>
            </>
          )}

          {isEnquiryContactGet && <h4>Get in Touch with Us</h4>}

          {isEnquiryblogButton && (
            <div style={{ textAlign: "left", marginTop: "8px" }}>
              <h6 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                Enquire Now
              </h6>
              <h6 style={{ margin: 0, fontSize: "14px" }}>
                100% Free Counselling
              </h6>
            </div>
          )}

          {/* <h5 style={{ marginTop: "-20px" }}>
                  We Suggest the Best Course & University for You!
                </h5> */}
          {isEnquiryButton && isEnquiryContactButton ? (
            ""
          ) : (
            <h6 style={{ marginTop: "-10px" }}>{description}</h6>
          )}

          {isEnquiryContactButton && !isEnquiryButton && (
            <>
              <div
                style={{
                  // textAlign: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 8px",
                  marginTop: "4px",
                }}
              >
                <h6
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Reach Out Through
                </h6>
                <h6
                  style={{ margin: "0", fontSize: "14px", lineHeight: "1.5" }}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <ul
                        className={"social-icon social-default icon-naked"}
                        style={{ fontSize: "16px" }}
                      >
                        <li>
                          <Link href="https://www.facebook.com/">
                            <i className="feather-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.twitter.com">
                            <i className="feather-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.instagram.com/">
                            <i className="feather-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.linkdin.com/">
                            <i className="feather-linkedin"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </h6>
              </div>
              <div
                style={{
                  // textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: "0px 8px",
                  marginTop: "0px",
                  gap: "2px",
                }}
              >
                <h6
                  style={{
                    margin: "0px 0px 8px 0px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Enquire Now
                </h6>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  margin: "2px 0px 12px 0px",
                  backgroundColor: "purple",
                }}
              ></div>
            </>
          )}

          <form
            // id="contact-form"
            // method="POST"
            // action="mail.php"
            onSubmit={HandleSubmitContactUsForm}
            className="rainbow-dynamic-form max-width-auto"
          >
            <div
              className={
                isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
                  ? `${isFormInputMarginTop ? isFormInputMarginTop : "15"}`
                  : "form-group2 mt-10 mb--20"
              }
            >
              <input
                style={{
                  height: `${Inputheight}`,
                  fontSize: `${InputFontSize}`,
                }}
                name="name"
                onChange={OnChangeInput}
                value={ContactForm?.name}
                id="contact-name"
                type="text"
                placeholder="Name"
              />
              <span className="focus-border"></span>
            </div>

            <div
              className={
                isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
                  ? `form-group2 mt--${isFormInputMarginTop ? isFormInputMarginTop : "15"
                  }`
                  : "form-group2 mt--20 mb--20"
              }
            >
              <input
                style={{
                  height: `${Inputheight}`,
                  fontSize: `${InputFontSize}`,
                }}
                onChange={OnChangeInput}
                value={ContactForm?.phone}
                name="phone"
                type="number"
                placeholder="Phone"
              />
              <span className="focus-border"></span>
            </div>

            <div
              className={
                isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
                  ? `form-group2 mt--${isFormInputMarginTop ? isFormInputMarginTop : "15"
                  }`
                  : "form-group2 mt--20 mb--20"
              }
            >
              <input
                style={{
                  height: `${Inputheight}`,
                  fontSize: `${InputFontSize}`,
                }}
                onChange={OnChangeInput}
                value={ContactForm?.email}
                name="email"
                type="email"
                placeholder="Email"
              />
              <span className="focus-border"></span>
            </div>

            <div
              className={
                isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
                  ? `form-group2 mt--${isFormInputMarginTop ? isFormInputMarginTop : "15"
                  }`
                  : "form-group2 mt--20"
              }
            >
              <select
                style={{
                  height: `${Inputheight}`,
                  fontSize: `${InputFontSize}`,
                  padding: `${SelectPadding}`,
                }}
                value={ContactForm?.gender || ""}
                onChange={OnChangeInput}
                name="gender"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {["Male", "Female", "Other"]?.map((Gender, index) => (
                  <option key={index} value={Gender}>
                    {Gender}
                  </option>
                ))}
              </select>
              <span className="focus-border"></span>
            </div>

            <div
              className={
                isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
                  ? `form-group2 mt--${isFormInputMarginTop ? isFormInputMarginTop : "15"
                  }`
                  : "form-group2 mt--20"
              }
            >
              <select
                style={{
                  height: `${Inputheight}`,
                  fontSize: `${InputFontSize}`,
                  padding: `${SelectPadding}`,
                }}
                value={ContactForm?.state || ""}
                onChange={OnChangeInput}
                name="state"
              >
                <option value="" disabled>
                  Select State
                </option>
                {IndianAllStates?.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <span className="focus-border"></span>
            </div>

            <div
              className={
                isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
                  ? `form-group2 mt--${isFormInputMarginTop ? isFormInputMarginTop : "15"
                  }`
                  : "form-group2 mt--20 mb--20"
              }
            >
              <input
                style={{
                  height: `${Inputheight}`,
                  fontSize: `${InputFontSize}`,
                }}
                name="city"
                onChange={OnChangeInput}
                value={ContactForm?.city}
                id="contact-city"
                type="text"
                placeholder="City"
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-group2 mt--15">
              <select
                style={{
                  height: `${Inputheight}`,
                  fontSize: `${InputFontSize}`,
                  padding: `${SelectPadding}`,
                }}
                value={degreeType}
                onChange={handleDegreeChange}
              >
                <option value="">Select Degree Level</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="Undergraduate Diploma">Undergraduate Diploma</option>
                <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                <option value="UG Certification">UG Certification</option>
                <option value="PG Certification">PG Certification</option>
              </select>
              <span className="focus-border"></span>
            </div>

            <div className="form-group2 mt--15">
              <select
                style={{
                  height: `${Inputheight}`,
                  fontSize: `${InputFontSize}`,
                  padding: `${SelectPadding}`,
                }}
                name="course"
                value={ContactForm.course}
                onChange={OnChangeInput}
                disabled={!degreeType}
              >
                <option value="">
                  {degreeType ? "Select Course" : "Select Degree First"}
                </option>

                {filteredCourses.map((course, index) => (
                  <option key={index} value={course.course_name}>
                    {course.course_name}
                  </option>
                ))}
              </select>
              <span className="focus-border"></span>
            </div>

            <div
              className={`${isEnquiryButton || isEnquiryContactButton || isEnquiryblogButton
                ? `form-group2 mt--${isFormInputMarginTop ? isFormInputMarginTop : "15"
                }`
                : "form-submit-group mt--20"
                }`}
            >
              {loading ? (
                <button
                  name="submit"
                  id="submit"
                  className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">
                      {/* <Loader /> */}Loading......
                    </span>
                  </span>
                </button>
              ) : isEnquiryButton ||
                isEnquiryContactButton ||
                isEnquiryblogButton ? (
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <button
                    name="submit"
                    type="submit"
                    id="submit"
                    className={`${isEnquiryButton ||
                      isEnquiryContactButton ||
                      isEnquiryblogButton
                      ? "rbt-btn3 bg-violet-opacity hover-icon-reverse w-100 "
                      : "rbt-btn bg-violet-opacity hover-icon-reverse w-100"
                      }`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">{buttonName}</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  name="submit"
                  type="submit"
                  id="submit"
                  className={`${isEnquiryButton ||
                    isEnquiryContactButton ||
                    isEnquiryblogButton
                    ? "rbt-btn3 bg-violet-opacity hover-icon-reverse w-100 "
                    : "rbt-btn bg-violet-opacity hover-icon-reverse w-100"
                    }`}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">{buttonName}</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default EnquiryForm;

{
  /* <div className="form-group">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Your Subject"
                    />
                    <span className="focus-border"></span>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="contact-message"
                      id="contact-message"
                      placeholder="Message"
                    ></textarea>
                    <span className="focus-border"></span>
                  </div> */
}
