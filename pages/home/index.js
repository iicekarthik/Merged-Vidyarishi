import PageHead from "../Head";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import MainDemo from "@/components/01-Main-Demo/01-Main-Demo";
import MobileMenu from "@/components/Header/MobileMenu";
import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import FooterThree from "@/components/Footer/Footer-Three";

const Home = () => {
  return (
    <>
      <PageHead
        title="Vidyarishi – Quality Education, Anytime, Anywhere!"
        description="Access India's top online universities and courses at Vidyarishi. Learn at your own pace with world-class content."
        keywords="Vidyarishi, online education, distance education, Indian universities, distance learning, e-learning, top online colleges, accredited online degrees, government-approved online courses, online learning platforms India, virtual university India, remote education, online degree programs, flexible learning, UGC recognized courses, online B.A., online MBA, online B.Com, skill development, career advancement, education from home, digital classroom, study anytime anywhere, online diploma, certification courses India"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com"

        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Vidyarishi",
          url: "https://vidyarishi.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://vidyarishi.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          publisher: {
            "@type": "Organization",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png"
            }
          }
        }}
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <div
            style={
              {
                // width: "100%",
                // overflowX: "hidden",
              }
            }
          >
            <MainDemo />
          </div>
          {/* <Cart /> */}

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default Home;
