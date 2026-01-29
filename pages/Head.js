import Head from "next/head";

const PageHead = ({
  title,
  description,
  keywords,
  image,
  url = "https://vidyarishi.com/blog",
  structuredData,
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vidyarishi",
    url: url,
    logo: image,
    sameAs: [
      "https://www.instagram.com/vidyarishi_india",
      "https://www.facebook.com/vidyarishiindia",
      "https://in.linkedin.com/company/vidyarishi",
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="google-site-verification" content="googlebe6e30dfc2c30c8f" />
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Vidyarishi Team" />
      <meta httpEquiv="Content-Language" content="en" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || defaultStructuredData),
        }}
      />
    </Head>
  );
};

export default PageHead;
