import { useEffect, useState } from "react";

const EnquiryForm = ({ onClose, showClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    countryCode: "+91",
    level: "",
    course: "",
    consent: false,
  });

  const [submitHover, setSubmitHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  const courses = {
    UG: ["BA", "BCA", "BBA", "B.Com", "B.Sc"],
    PG: ["MBA", "MCA", "M.Com", "MA", "M.Sc"],
  };

  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "United States" },
    { code: "+44", country: "United Kingdom" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
    { code: "+971", country: "United Arab Emirates" },
    { code: "+65", country: "Singapore" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+880", country: "Bangladesh" },
    { code: "+92", country: "Pakistan" },
    { code: "+93", country: "Afghanistan" },
    { code: "+86", country: "China" },
    { code: "+7", country: "Russia" },
    { code: "+39", country: "Italy" },
    { code: "+34", country: "Spain" },
    { code: "+55", country: "Brazil" },
    { code: "+27", country: "South Africa" },
    { code: "+82", country: "South Korea" },
    { code: "+60", country: "Malaysia" },
    { code: "+64", country: "New Zealand" },
    { code: "+351", country: "Portugal" },
    { code: "+31", country: "Netherlands" },
    { code: "+90", country: "Turkey" },
    { code: "+254", country: "Kenya" },
    { code: "+20", country: "Egypt" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+62", country: "Indonesia" },
    { code: "+84", country: "Vietnam" },
    { code: "+63", country: "Philippines" },
    { code: "+45", country: "Denmark" },
    { code: "+46", country: "Sweden" },
    { code: "+47", country: "Norway" },
    { code: "+358", country: "Finland" },
    { code: "+41", country: "Switzerland" },
    { code: "+48", country: "Poland" },
    { code: "+43", country: "Austria" },
    { code: "+40", country: "Romania" },
    { code: "+380", country: "Ukraine" },
    { code: "+56", country: "Chile" },
    { code: "+57", country: "Colombia" },
    { code: "+52", country: "Mexico" },
    { code: "+598", country: "Uruguay" },
    { code: "+234", country: "Nigeria" },
    { code: "+212", country: "Morocco" },
    { code: "+251", country: "Ethiopia" },
    { code: "+36", country: "Hungary" },
    { code: "+420", country: "Czech Republic" },
    { code: "+421", country: "Slovakia" },
    { code: "+30", country: "Greece" },
    { code: "+386", country: "Slovenia" },
    { code: "+353", country: "Ireland" },
    { code: "+507", country: "Panama" },
    { code: "+505", country: "Nicaragua" },
    { code: "+595", country: "Paraguay" },
    { code: "+591", country: "Bolivia" },
    { code: "+58", country: "Venezuela" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" || type === "radio" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please agree to the consent before submitting.");
      return;
    }
    console.log("Form Submitted:", formData);
    alert("Thank you! We’ll contact you soon.");
  };

  const focusOn = (e) => (e.target.style.boxShadow = "0 0 0 2px #facc15");
  const focusOff = (e) => (e.target.style.boxShadow = "none");

  return (
    <div style={{
      position: "relative", background: "#fff", borderRadius: "1rem", padding: "1.5rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)", maxWidth: "28rem", width: "100%",
      boxSizing: "border-box", color: "#111827"
    }}>
      {showClose && (
        <button
          aria-label="Close"
          onClick={onClose}
          onMouseEnter={() => setCloseHover(true)}
          onMouseLeave={() => setCloseHover(false)}
          style={{ position: "absolute", top: "0.75rem", right: "0.75rem", border: "none", background: "transparent", cursor: "pointer", fontSize: "1.125rem", lineHeight: 1, color: closeHover ? "#ef4444" : "#4b5563", padding: "0.25rem" }}
        >
          ✕
        </button>
      )}
      <h3
        style={{
          fontSize: "1.25rem", // text-xl
          fontWeight: 600,     // font-semibold
          textAlign: "center", // text-center
          marginBottom: "1.5rem" // mb-6
        }}>Enquiry Now</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem" // space-y-4
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))", // grid grid-cols-2
            gap: "0.75rem" // gap-3
          }}
        >
          <div>
            <label
              style={{
                display: "block",           // block
                fontSize: "0.875rem",       // text-sm
                fontWeight: 500,            // font-medium
                color: "#374151",           // text-gray-700
                marginBottom: "0.25rem"    // mb-1

              }}
            >
              Full Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              style={{
                height: "26px",
                width: "100%",              // w-full
                border: "1px solid #d1d5db",// border-gray-300
                borderRadius: "0.75rem",    // rounded-xl
                padding: "0.5rem 0.75rem",  // py-2 px-3
                fontSize: "0.875rem",       // text-sm
                outline: "none",            // outline-none
                boxSizing: "border-box"
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 0 2px #facc15") // focus:ring-2 focus:ring-yellow-400
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",       // block
                fontSize: "0.875rem",   // text-sm
                fontWeight: 500,        // font-medium
                color: "#374151",       // text-gray-700
                marginBottom: "0.25rem" // mb-1
              }}
            >
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="abc@xyz.com"
              required
              style={{
                height: "26px",
                width: "100%",               // w-full
                border: "1px solid #d1d5db", // border-gray-300
                borderRadius: "0.75rem",     // rounded-xl
                padding: "0.5rem 0.75rem",   // py-2 px-3
                fontSize: "0.875rem",        // text-sm
                outline: "none",             // outline-none
                boxSizing: "border-box"
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 0 2px #facc15") // focus:ring-2 focus:ring-yellow-400
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

        </div>
        <div>
          <label
            style={{
              display: "block",       // block
              fontSize: "0.875rem",   // text-sm
              fontWeight: 500,        // font-medium
              color: "#374151",       // text-gray-700
              marginBottom: "0.25rem" // mb-1
            }}
          >
            Phone *
          </label>

          <div
            style={{
              display: "flex",               // flex
              border: "1px solid #d1d5db",   // border border-gray-300
              borderRadius: "0.75rem",       // rounded-xl
              overflow: "hidden"             // overflow-hidden
            }}
          >
            {/* Country Code Selector */}
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              style={{
                height: "26px",
                lineheight: " normal",
                width: "18%",
                padding: "3px",
                fontsize: "10px",
                background: "#f9fafb",       // bg-gray-50
                borderRight: "1px solid #d1d5db", // border-r border-gray-300
                outline: "none"              // outline-none
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 0 2px #facc15") // focus:ring-2 focus:ring-yellow-400
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              {countryCodes.map((c, idx) => (
                <option key={idx} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>

            {/* Phone Number Input */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              style={{
                height: "26px",
                flex: 1,                     // w-full
                padding: "0.5rem 0.75rem",   // px-3 py-2
                fontSize: "0.875rem",        // text-sm
                outline: "none",             // outline-none
                border: "none",              // remove double border
                boxSizing: "border-box"
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 0 2px #facc15") // focus:ring-2 focus:ring-yellow-400
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
        </div>

        <div  style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))", // grid grid-cols-2
            gap: "0.75rem" // gap-3
          }}>
          <div style={{ flex: "1 1 180px" , fontSize:"10px"}}>
            <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: "0.375rem" }}>Program Level *</label>
            <select name="level" value={formData.level} onChange={handleChange} onFocus={focusOn} onBlur={focusOff} required style={{
              width: "100%",
              border: "1px solid #d1d5db", borderRadius: "0.75rem", padding: "3px", fontSize: "10px", outline: "none", background: "#fff", boxSizing: "border-box", height: "26px"
            }}>
              <option value="">Select Level</option>
              <option value="UG">UG</option>
              <option value="PG">PG</option>
            </select>
          </div>
          <div style={{ flex: "1 1 180px" , fontSize:"10px"}}>
            <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: "0.375rem" }}>Program Course *</label>
            <select name="course" value={formData.course} onChange={handleChange} onFocus={focusOn} onBlur={focusOff} required style={{
              width: "100%",
              border: "1px solid #d1d5db", borderRadius: "0.75rem", padding: "3px", fontSize: "10px", outline: "none", background: "#fff", boxSizing: "border-box", height: "26px"
            }}>
              <option value="">Select Course</option>
              {formData.level && courses[formData.level].map((course, idx) => (
                <option key={idx} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.75rem", color: "#4b5563", lineHeight: 1.5 }}>
          <input type="radio" name="consent" checked={formData.consent} onChange={handleChange} required style={{
            marginTop: "0.125rem", opacity: "1",position: "relative", height: "10px", width: "10px" }} />
          <span>I agree that associates can contact me via Email, SMS, WhatsApp, and Voice calls as per the Privacy Policy. This consent overrides any DNC/NDNC registration.</span>
        </div>
        <button type="submit" onMouseEnter={() => setSubmitHover(true)} onMouseLeave={() => setSubmitHover(false)} style={{ width: "100%",
           background: submitHover ? "#1a3a6d" : "#002147", color: "#fff", padding: "0.75rem 1rem", borderRadius: "0.75rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "background 150ms ease-in-out" }}>SUBMIT</button>
      </form>
    </div>
  );
};

export default EnquiryForm;
