"use client";
import Image from "next/image";

import img from "../../public/images/vidya/contact.png";
import { useEffect, useState } from "react";
import Category from "@/data/elements/category.json";
import EnquiryForm from "./EnquiryForm";

const ContactForm = ({ gap }) => {
  return (
    <>
      <div className={`rbt-contact-address ${gap}`}>
        <div className="container">
          <div className=" d-flex flex-xxl-row flex-xl-row flex-md-row flex-column justify-content-center align-items-start">
           
            <div className="col-lg-6 d-xxl-block d-xl-block d-none">
              <div className="thumbnail">
                <Image
                  className="radius-6"
                  src={img}
                  alt="Contact Images"
                />
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-12">
              <EnquiryForm
                description={
                  "Looking for the perfect course and university? We’re here to guide you! Contact us today and let our experts help you make the right choice for your future."
                }
                buttonName={"Let’s Connect"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;

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
