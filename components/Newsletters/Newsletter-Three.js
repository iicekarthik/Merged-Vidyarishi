import NewsletterData from "../../data/elements/newsletter.json";

const NewsletterThree = () => {
  const HandleSubmitNewsLetter = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    if (email) {
      // Handle the newsletter subscription logic here
      // console.log("Subscribed with email:", email);
      e.target[0].value = ""; // Clear the input field after submission
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="container pb--60 pt--60">
      <div className="row g-5 align-items-center">
        {NewsletterData &&
          NewsletterData.newsletterTwo.map((data, index) => (
            <div className="col-lg-5 col-md-12 col-12" key={index}>
              <div className="inner">
                <div className="section-title text-center text-lg-start">
                  <h4 style={{ color: "#FFFFFF" }} className="title">
                    <strong>{data.subTitle}</strong> <br />
                    <span className="w-400">{data.title}</span>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        <div className="col-lg-7 col-md-12 col-12 text-start text-sm-end">
          <form
            onSubmit={HandleSubmitNewsLetter}
            className="newsletter-form-1 me-0"
          >
            <input type="email" placeholder="Enter Your E-Email" />
            <button
              type="submit"
              className="rbt-btn btn-md btn-gradient hover-icon-reverse"
            >
              <span className="icon-reverse-wrapper">
                <span className="btn-text">Subscribe</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right"></i>
                </span>
                <span className="btn-icon">
                  <i className="feather-arrow-right"></i>
                </span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterThree;
