import PageHead from "../Head";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import MobileMenu from "@/components/Header/MobileMenu";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import FooterThree from "@/components/Footer/Footer-Three";
import TeamHead from "@/components/Team/TeamHead";
import UniversityHome from "@/components/Category/universityHome";

const Ourpartners = () => {
  return (
    <>
      <PageHead
        title="Our Partners"
        description="Discover Vidyarishi’s trusted education partners and collaborators. We work together to deliver quality online learning and empower future-ready students."
        keywords="Vidyarishi partners, education collaborations, academic partners India, online learning alliances, university partnerships, edtech collaborations"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/our-partner"
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <div className="container mt--10 mb--80">
            <div className="row">
              <TeamHead
                isTheme={"theme2"}
                // subTitle="Our Partners"
                BeforeJointtitle={"Our "}
                title="Partners"
                Jointtitle={""}
                // desc="We Offer world-class education, cutting-edge research, and unparalleled opportunities for personal and professional growth. Explore a diverse range of universities renowned for their excellence in academic programs, innovative teaching methodologies, and global recognition."
              />
            </div>

            <div className="row" style={{ marginTop: "-40px" }}>
              <div className="col-lg-12">
                {/* <CategoryThreeSlider /> */}
                <UniversityHome Ourpartners={true} />
              </div>
            </div>
          </div>
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default Ourpartners;
