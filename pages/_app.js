import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../public/amity/Amity.css";

// Import Bootstrap and global styles
import "bootstrap/scss/bootstrap.scss";
import "../public/scss/default/euclid-circulara.scss";

// ========= Plugins CSS START =========
import "../node_modules/sal.js/dist/sal.css";
import "../public/css/plugins/fontawesome.min.css";
import "../public/css/plugins/feather.css";
import "../public/css/plugins/odometer.css";
import "../public/css/plugins/animation.css";
import "../public/css/plugins/euclid-circulara.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
// ========= Plugins CSS END =========

import "../public/scss/styles.scss";
import "../styles/globals.css";
import "../styles/Amity.css";
import { useRouter } from "next/router";
// import { useScreenSize } from "@/hooks/screenSize";
import Script from "next/script";
// import "../public/scss/rtl-styles.scss";

import { Provider } from "react-redux";
import Context from "@/context/Context";
import store from "@/redux/store";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Load Bootstrap JS only on the client
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");

      // Load Plyr.js only on the client
      require("plyr");
    }
  }, []);

  // PAYMENT

  //   useEffect(() => {
  //     const script = document.createElement("script");
  //     script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
  //     script.async = true;
  //     script.onload = () => console.log("✅ Cashfree SDK loaded");
  //     script.onerror = () => console.error("❌ Failed to load Cashfree SDK");
  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);

  //   useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js";
  //   script.async = true;
  //   script.onload = () => console.log("Cashfree SDK Loaded");
  //   document.body.appendChild(script);
  // }, []);

  // const [loading, setLoading] = useState(false);
  // const [WelcomeLoading, setMainLoading] = useState(true);
  // const router = useRouter();
  // const screenSize = useScreenSize();

  // useEffect(() => {
  //   const handleContextMenu = (e) => e.preventDefault(); // Disable right-click
  //   const handleCopy = (e) => e.preventDefault(); // Disable Ctrl+C or right-click copy
  //   const handleSelect = (e) => e.preventDefault(); // Disable text selection

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("copy", handleCopy);
  //   document.addEventListener("selectstart", handleSelect);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("copy", handleCopy);
  //     document.removeEventListener("selectstart", handleSelect);
  //   };
  // }, []);

  return (
    <>
      {/* <Script
        strategy="afterInteractive"
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
      /> */}
      <Provider store={store}>
        <Context>
          <Component {...pageProps} />
        </Context> </Provider>

      {/* <Component {...pageProps} /> */}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

// useEffect(() => {
//   // Website load hone ke 2 seconds baad loader hatao
//   const timer = setTimeout(() => {
//     setMainLoading(false);
//   }, 1000);

//   return () => clearTimeout(timer); // Cleanup timeout
// }, []);

// useEffect(() => {
//   const handleStart = () => setLoading(true);
//   const handleComplete = () => setLoading(false);

//   router.events.on("routeChangeStart", handleStart);
//   router.events.on("routeChangeComplete", handleComplete);
//   router.events.on("routeChangeError", handleComplete);

//   return () => {
//     router.events.off("routeChangeStart", handleStart);
//     router.events.off("routeChangeComplete", handleComplete);
//     router.events.off("routeChangeError", handleComplete);
//   };
// }, []);

{
  /* {WelcomeLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <MainLoading />
        </div>
      ) : loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader />
        </div>
      ) : ( */
}

{
  /* )} */
}
