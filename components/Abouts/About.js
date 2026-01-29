import Image from "next/image";
import Link from "next/link";

import AboutData from "../../data/elements/about.json";
import { useParallax } from "react-scroll-parallax";

import aboutImg7 from "../../public/images/vidya/022.png";
import aboutImg8 from "../../public/images/vidya/033.png";
import aboutImg9 from "../../public/images/vidya/0111.png";
import CallToActionSix from "@/components/Call-To-Action/CallToAction-Six";
import { useAppContext } from "@/context/Context";
import { useScreenSize } from "@/hooks/screenSize";

const About = () => {
  const { isOpen, setIsOpen } = useAppContext();

  const { ref: ref1, style: style1 } = useParallax({
    translateY: [0, -20],
  });

  const { ref: ref2, style: style2 } = useParallax({
    translateY: [0, 20],
  });

  const { ref: ref3, style: style3 } = useParallax({
    translateY: [0, 20],
  });

  const ScreenSize = useScreenSize();
  const BigScreenSize = ["xxl", "xl", "lg"].includes(ScreenSize);

  return (
    <div className="container">
      {AboutData.aboutOne.map((data, index) => (
        <div className="row g-5 align-items-center" key={index}>
          <div className="col-lg-6">
            <div className="thumbnail-wrapper">
              <div className={`thumbnail image-1`} ref={ref1} style={style1}>
                <Image
                  src={aboutImg7}
                  alt="Education Images"
                  layout="responsive"
                  width={366}
                  height={490}
                />
              </div>
              <div className={`thumbnail image-2`} ref={ref2} style={style2}>
                <Image
                  src={aboutImg9}
                  width={308}
                  height={250}
                  layout="responsive"
                  // style={{boxShadow : "0 0 6px #ccc"}}
                  alt="Education Images"
                />
              </div>
              <div className={`thumbnail image-3`} ref={ref3} style={style3}>
                <Image
                  src={aboutImg8}
                  width={405}
                  height={490}
                  layout="responsive"
                  // style={{boxShadow : "0 0 6px #ccc"}}
                  alt="Education Images"
                />
              </div>
            </div>
          </div>

          <div className={`col-lg-6 ${BigScreenSize ? "mt-0" : "mt--70"} `}>
            <div className="inner pl--50 pl_sm--0 pl_md--0">
              <div className="section-title text-start">
                <span className="subtitle bg-coral-opacity">{data.tag}</span>
                <h2 className="title">
                  {data.title} <br /> {data.subTitle}
                </h2>
              </div>

              <p className="description mt--30">{data.desc}</p>

              <div className="rbt-feature-wrapper mt--20 ml_dec_20">
                {data.children.map((item, innerIndex) => (
                  <div
                    className="rbt-feature feature-style-2 rbt-radius"
                    key={innerIndex}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={`icon ${
                        item.isPrimary
                          ? "bg-primary-opacity"
                          : "bg-pink-opacity"
                      }`}
                    >
                      <i className={item.icon}></i>
                    </div>
                    <div className="feature-content">
                      <h6 className="feature-title">{item.title}</h6>
                      <p className="feature-description">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about-btn mt--25">
                <button
                  onClick={() => setIsOpen(true)}
                  className="rbt-btn btn-gradient hover-icon-reverse"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Enquire Now</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;

{
  /* <div
className="col-lg-6"
style={{marginTop : '95px'}}
>
<div className="inner pl--50 pl_sm--0 pl_md--0">
  <div className="section-title text-start">
    <span className="subtitle bg-coral-opacity">{data.tag}</span>
    <h2 className="title">
      {data.title} <br />
    </h2>
    <h3>{data.subTitle}</h3>
  </div>
  <p className="description">{data.desc}</p>
  // <br /> 
  //  <p className="description">{data.desc2}</p> 
  {data.children.map((item, innerIndex) => (
    <div className="rbt-feature-wrapper mt--40" key={innerIndex}>
      <div className="rbt-feature feature-style-1">
        <div
          className={`icon ${
            item.isPrimary
              ? "bg-primary-opacity"
              : "bg-pink-opacity"
          }`}
        >
          <i className={item.icon}></i>
        </div>
        <div className="feature-content">
          <h6 className="feature-title">{item.title}</h6>
          <p className="feature-description">{item.info}</p>
        </div>
      </div>
    </div>
  ))}

  <div className="about-btn mt--25">
    <Link
      className="rbt-btn btn-gradient hover-icon-reverse"
      href="#"
    >
      <span className="icon-reverse-wrapper">
        <span className="btn-text">Enquire Now</span>
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
</div> */
}
