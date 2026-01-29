import React from "react";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Store from "@/redux/store";
import VidyaBlog from "@/components/VidyarishiBlog/VidyaBlog";
import axios from "axios";

const BlogIndexPage = ({ posts }) => {
  return (
    <>
      <PageHead
        title="Vidyarishi Blog – Insights on Online Learning"
        description="Explore in-depth articles on higher education, career advice, online universities, and digital learning trends. Stay informed with the Vidyarishi Blog."
        keywords="Vidyarishi blog, education insights, online learning, career development, UGC universities, digital education India, e-learning 2025, student resources"
        image="https://vidyarishi.com/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Vidyarishi Blog",
          url: "https://vidyarishi.com/blog",
          description:
            "Explore insightful articles on online education, university rankings, digital learning, and student career tips from Vidyarishi experts.",
          publisher: {
            "@type": "Organization",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
            },
          },
          image: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
        }}
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <VidyaBlog AllBlogposts={posts} />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export async function getStaticProps() {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_BLOG_ROUTE}/blog/published`
    );
    return {
      props: { posts: data || [] },
      revalidate: 3600, // revalidate every 1 hour
    };
  } catch (err) {
    console.error("Blog fetch error:", err.message);
    return { props: { posts: [] }, revalidate: 120 };
  }
}

export default BlogIndexPage;