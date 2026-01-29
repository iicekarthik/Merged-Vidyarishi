import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import Contact from "@/components/Contacts/Contact";
import ContactForm from "@/components/Contacts/Contact-Form";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import FooterOne from "@/components/Footer/Footer-One";
import FooterThree from "@/components/Footer/Footer-Three";

const ContactPage = () => {
  return (
    <>
      <PageHead
        title="Contact Us – Vidyarishi | Connect with Our Team"
        description="Have questions or need assistance? Reach out to Vidyarishi for support, inquiries, and guidance on online education programs across India."
        keywords="Vidyarishi contact, contact Vidyarishi, Vidyarishi contact us, contact us Vidyarishi, online education help, support Vidyarishi, education helpline India, connect with Vidyarishi, student inquiries, online course questions"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/contact"
        canonical="https://vidyarishi.com/contact"

        ogData={{
          title: "Contact Vidyarishi – We're Here to Help",
          description:
            "Reach out to Vidyarishi for admissions help, course inquiries, guidance, and support related to online education in India.",
          image: "/images/vidya/logo/VR_logo2.png",
          url: "https://vidyarishi.com/contact",
          type: "website",
          siteName: "Vidyarishi",
        }}

        twitterData={{
          card: "summary_large_image",
          title: "Contact Vidyarishi – Connect With Our Support Team",
          description:
            "Need help? Contact Vidyarishi for assistance with online and distance education programs across India.",
          image: "/images/vidya/logo/VR_logo2.png",
        }}

        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Vidyarishi",
          url: "https://vidyarishi.com/contact",
          description:
            "Get in touch with Vidyarishi for inquiries, guidance, and support regarding online courses and digital learning.",
          publisher: {
            "@type": "Organization",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
            },
          },
        }}
      />


      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />

          <div className="rbt-conatct-area bg-gradient-11 rbt-section-gap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center mb--60">
                    <span className="subtitle bg-secondary-opacity">
                      Contact Us
                    </span>
                    <h2 className="title">
                      {/* Vidyarishi Contact
                      <br /> join with us. */}
                      {/* Contact With Vidyarishi <br /> */}
                      Have questions? <br /> Vidyarishi has the answers.
                    </h2>
                  </div>
                </div>
              </div>
              <Contact />
            </div>
          </div>

          <ContactForm />

          <div className="rbt-google-map bg-color-white rbt-section-gapTop">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.368783367026!2d72.8451663!3d19.1185194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c1eef5f321%3A0xc917394a1d28f9c6!2sVidyarishi!5e1!3m2!1sen!2sin!4v1740728574780!5m2!1sen!2sin"
              width="600"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}

            <iframe
              className="w-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.368783367026!2d72.8451663!3d19.1185194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c1eef5f321%3A0xc917394a1d28f9c6!2sVidyarishi!5e1!3m2!1sen!2sin!4v1740728574780!5m2!1sen!2sin"
              height="300"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d393.2954581892295!2d72.84602615332942!3d19.118788253298685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7e5798e8331%3A0xc3659c74dafd926c!2sIndian%20Institute%20Of%20Correspondence%20Education!5e1!3m2!1sen!2sin!4v1739165691295!5m2!1sen!2sin"
              className="w-100"
              height="450"
              style={{ border: "0px" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}
          </div>

          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default ContactPage;
