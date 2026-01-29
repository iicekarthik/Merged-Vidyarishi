import React from "react";
import Header from "./HeaderFooter/Header";
import Hero from "./components/Hero";
import AmityStatsAndHighlights from "./components/AmityStatsAndHighlights";
import About from "./components/About";
import Accreditations from "./components/Accreditations";
import Courses from "./components/Courses";
import WhyChoose from "./components/WhyChoose";
import Admissions from "./components/Admissions";
import StudentTestimonials from "./components/StudentTestimonials";
import FAQ from "./components/FAQ";
import Footer from "./HeaderFooter/Footer";
import CTCSection from "./contact-details/ContactBanner";

function AmityMarketingMain() {
  return (
    <div className="font-sans bg-white">
      <Header />
      <Hero />
      <AmityStatsAndHighlights />
      <About />
      <Accreditations />
      <Courses />
      <WhyChoose />
      <CTCSection />
      <Admissions />
      <StudentTestimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default AmityMarketingMain;
