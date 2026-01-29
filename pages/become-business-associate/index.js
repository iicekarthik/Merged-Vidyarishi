import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Store from "@/redux/store";
import BusinessAssociate from "@/components/BecomeBusinessAssociate/BecomeBusinessAssociate";

const BecomeBusinessAssociate = () => {
  return (
    <>
      <PageHead
        title="Become a Business Associate"
        description="Partner with Vidyarishi as a Business Associate and unlock growth opportunities in India’s booming online education sector. Join us to empower learners and expand your professional impact."
        keywords="Vidyarishi business associate, education franchise India, partner with Vidyarishi, edtech business, online education collaboration, education partnership, franchise opportunity, education entrepreneurs"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/become-business-associate"

        canonical="https://vidyarishi.com/become-business-associate"
        author="Vidyarishi"
        publisher="Vidyarishi"
        ogSiteName="Vidyarishi"
        ogLocale="en_IN"
        ogType="website"
        twitterSite="@vidyarishi"
        twitterCreator="@vidyarishi"

        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Become a Business Associate",
          description:
            "Partner with Vidyarishi as a Business Associate and unlock opportunities in India’s growing online education market.",
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

          <BusinessAssociate />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default BecomeBusinessAssociate;
