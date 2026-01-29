import React from "react";

const testimonials = [
  {
    name: "Ajimsha Puthur Abdul Hameed",
    course: "MBA, Student",
    text: "I'm Ajimsha from Oman, and completing my MBA from Amity Online was an incredible journey. Despite initial COVID concerns, the transition was seamless with excellent support. I'm proud to have referred two friends from Oman too.",
    img: "/images/Marketing//placement/s1.webp",
  },
  {
    name: "Himanshu Chhabra",
    course: "BBA, Student",
    text: "Studying at Amity Online has been transformative. The flexibility and global exposure prepared me for my career journey.",
    img: "/images/Marketing//placement/s2.webp",
  },
];

const StudentTestimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Heading */}
        <h2 className="testimonials-heading">
          Hear From Our Students And Where They Are Placed
        </h2>
        <p className="testimonials-subtitle">
          Discover the real-world impact of our education. From our students and
          alumni, learn about their thriving careers today!
        </p>

        {/* Testimonials */}
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              {/* Image */}
              <div className="testimonial-img-wrapper">
                <img src={t.img} alt={t.name} className="testimonial-img" />
              </div>

              {/* Text */}
              <p className="testimonial-text">“{t.text}”</p>

              {/* Name + Course */}
              <div>
                <h4 className="testimonial-name">{t.name}</h4>
                <p className="testimonial-course">{t.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
