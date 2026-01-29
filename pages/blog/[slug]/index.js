import PageHead from "@/pages/Head";
import BlogPost from "@/components/VidyaBlog/Components/BlogPost";
import EnquiryForm from "@/components/Contacts/EnquiryForm";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import axios from "axios";
import Link from "next/link";
import RecentBlog from "@/components/VidyaBlog/Components/RecentBlog";
import TopUniversities from "@/components/VidyaBlog/Components/TopUniversities";
import { useScreenSize } from "@/hooks/screenSize";

const BlogPostSlug = ({ post, allPost }) => {
  const ScreenSize = useScreenSize();

  const filteredPosts = allPost?.filter(
    (p) => p?.slug && p?.slug !== post?.slug
  );

  const isMobile =
    ScreenSize === "xs" || ScreenSize === "sm" || ScreenSize === "md";
  const isTablet = ScreenSize === "md";
  const isDesktop = !isMobile && !isTablet;

  return (
    <>
      <PageHead
        title={post.metaTitle || post.title}
        description={post.metaDescription}
        keywords={
          post.metaKeywords ||
          "Vidyarishi blog, Online university rankings India, future of education, online learning insights, digital education India, skill-based learning, e-learning trends 2025, UGC courses, career insights, virtual learning tips"
        }
        image={post.thumbnailUrl}
        url={`https://vidyarishi.com/blog/${post.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.shortDescription,
          image: post.thumbnail,
          author: {
            "@type": "Person",
            name: post.author?.fullname || "Vidyarishi Team",
          },
          publisher: {
            "@type": "Organization",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
            },
          },
          datePublished: post.createdAt,
          mainEntityOfPage: `https://vidyarishi.com/blog/${post.slug}`,
        }}
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "18px",
              gap: "0.5rem",
              padding: isMobile ? "8px 24px" : "1rem 1rem 0 1rem",
              color: "black",
            }}
          >
            <Link href="/">Home</Link>
            <span>&gt;</span>
            <Link href="/blog">Blog</Link>
            <span>&gt;</span>
            <span>{post?.title}</span>
          </div>

          {/* Main Layout */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              backgroundColor: "white",
              padding: isMobile ? "1rem" : isTablet ? "1rem 2rem" : "2rem 4rem",
              gap: isMobile ? "2rem" : "1.5rem",
              boxSizing: "border-box",
            }}
          >
            {/* Main Blog Section */}
            <main
              style={{
                flex: isMobile ? "1 1 100%" : isTablet ? "1 1 70%" : "1 1 72%",
                maxWidth: isMobile ? "100%" : "900px",
                margin: "0 auto",
                textAlign: "justify",
                order: 1,
              }}
            >
              <span
                style={{
                  display: isMobile ? "block" : "none",
                }}
              >
                {/* Enquiry Form */}
                <EnquiryForm
                  buttonName="Enquire Now"
                  InputFontSize="14px"
                  Inputheight="36px"
                  SelectPadding="0px 10px"
                  isEnquiryButton={false}
                  isEnquiryContactButton={false}
                  isEnquiryblogButton={true}
                  isFormInputMarginTop="10"
                />
              </span>

              {/* Blog Content */}
              {post?.isPublished &&
                post?.status === "PUBLISHED" &&
                post?.approvalActionedBy?._id && <BlogPost data={post} />}
            </main>

            {/* Sidebar (automatically moves below on mobile) */}
            <aside
              style={{
                flex: isTablet ? "0 0 30%" : "0 0 25%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                width: isMobile ? "100%" : "auto",
                order: isMobile ? 2 : 0,
              }}
            >
              <span
                style={{
                  display: isMobile ? "none" : "block",
                }}
              >
                {/* Enquiry Form */}
                <EnquiryForm
                  buttonName="Enquire Now"
                  InputFontSize="14px"
                  Inputheight="36px"
                  SelectPadding="0px 10px"
                  isEnquiryButton={false}
                  isEnquiryContactButton={false}
                  isEnquiryblogButton={true}
                  isFormInputMarginTop="10"
                />
              </span>

              {/* Recent Blog Section */}
              {filteredPosts?.length > 0 && (
                <div style={{ width: "100%" }}>
                  <RecentBlog slug={post?.slug} post={post} />
                </div>
              )}

              {/* Top Universities Section */}
              <div style={{ width: "100%" }}>
                <TopUniversities slug={post?.slug} post={post} />
              </div>
            </aside>
          </div>

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

// Static Paths
export async function getStaticPaths() {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_BLOG_ROUTE}/blog/published`
    );

    const paths =
      data?.map((post) => ({
        params: { slug: post.slug },
      })) || [];

    return { paths, fallback: "blocking" };
  } catch (err) {
    console.error("getStaticPaths error:", err.message);
    return { paths: [], fallback: "blocking" };
  }
}

// Static Props
export async function getStaticProps({ params }) {
  try {
    const [postRes, allPostsRes] = await Promise.all([
      axios.get(`${process.env.NEXT_BLOG_ROUTE}/blog/one/${params.slug}`),
      axios.post(`${process.env.NEXT_BLOG_ROUTE}/blog/published`),
    ]);

    if (!postRes?.data) {
      return { notFound: true };
    }

    return {
      props: {
        post: postRes.data,
        allPost: allPostsRes?.data || [],
      },
      revalidate: 120,
    };
  } catch (error) {
    console.error("Blog fetch error:", error.message);
    return { notFound: true };
  }
}

export default BlogPostSlug;
