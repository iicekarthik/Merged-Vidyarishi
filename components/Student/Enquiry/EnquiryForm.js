"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EnquiryForm = ({ courseId, courseName, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("+91"); // default India

  // ---------- styles ----------
  const fieldWrapperStyle = {
    marginBottom: "14px",
    minHeight: "74px", // 🔥 FIXED HEIGHT PER FIELD
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "6px",
    border: "1px solid #d0d5dd",
    fontSize: "14px",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "6px",
    display: "block",
  };

  const errorStyle = {
    minHeight: "12px",
    fontSize: "10px",
    color: "red",
    marginTop: "2px",
    transition: "opacity 0.2s ease",
  };

  // --------------------------------------------
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd,flags"
        );
        const data = await res.json();

        const formatted = data
          .filter(c => c.idd?.root)
          .map(c => ({
            name: c.name.common,
            code: `${c.idd.root}${c.idd.suffixes?.[0] || ""}`,
            flag: c.flags.svg,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formatted);
      } catch (err) {
        console.error("Failed to load country codes");
      }
    };

    fetchCountries();
  }, []);

  // ✅ Validation
  const validate = () => {
    const newErrors = {}; if (!form.name.trim()) { newErrors.name = "Full name is required"; }
    if (!form.email.trim()) { newErrors.email = "Email is required"; }
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) { newErrors.email = "Enter a valid email"; }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.length < 7 || form.phone.length > 15) {
      newErrors.phone = "Enter a valid phone number";
    }
    // if (!form.phone.trim()) { newErrors.phone = "Phone number is required"; }
    // else if (!/^[6-9]\d{9}$/.test(form.phone)) { newErrors.phone = "Enter valid 10-digit mobile number"; }
    setErrors(newErrors); return Object.keys(newErrors).length === 0;
  };

  const handleDownload = async () => {
    const res = await fetch(
      `/api/dashboard/course/download-brochure?courseId=${courseId}`
    );

    if (!res.ok) throw new Error("Download failed");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${courseName}-Brochure.pdf`;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      await axios.post("/api/dashboard/enquiry", {
        ...form,
        phone: `${countryCode}${form.phone}`,
        courseName,
      });

      await handleDownload();   // ✅ THIS
      toast.success("Brochure download started!");
      onSuccess?.();
    } catch (err) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Course */}
      <label style={{ ...labelStyle, marginBottom: "4px" }}>
        Course
      </label>
      <input
        value={courseName}
        readOnly
        style={{
          ...inputStyle,
          background: "#f9fafb",
          marginBottom: "14px",
          color: "#101828",
          cursor: "default",
        }}
      />

      {/* Name */}
      <div style={fieldWrapperStyle}>
        <label style={labelStyle}>Full Name*</label>
        <input
          style={inputStyle}
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <div style={errorStyle}>{errors.name || ""}</div>
      </div>

      {/* Email */}
      <div style={fieldWrapperStyle}>
        <label style={{ ...labelStyle, marginTop: "12px" }}>
          Email*
        </label>
        <input
          style={inputStyle}
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <div style={errorStyle}>{errors.email || ""}</div>
      </div>

      {/* Phone */}
      <div style={fieldWrapperStyle}>
        <label style={{ ...labelStyle, marginTop: "12px" }}>
          Mobile Number*
        </label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {/* Country Code */}
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            style={{
              height: "40px",
              width: "80px",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #d0d5dd",
              fontSize: "14px",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {countries.map((c, i) => (
              <option key={i} value={c.code}>
                {c.code} {c.name}
              </option>
            ))}
          </select>

          {/* Phone */}
          <input
            style={{ ...inputStyle, flex: 1 }}
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>

        <div style={errorStyle}>{errors.phone || ""}</div>
      </div>

      {/* Phone 
      <div style={fieldWrapperStyle}>
        <label style={{ ...labelStyle, marginTop: "12px" }}>
          Mobile Number*
        </label>
        <input
          style={inputStyle}
          placeholder="10-digit mobile number"
          maxLength={10}
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
        />
        <div style={errorStyle}>{errors.phone || ""}</div>
      </div> */}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          background: loading
            ? "#9b87f5"
            : "linear-gradient(90deg,#4f46e5,#7c3aed)",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {loading ? "Submitting..." : "Submit & Download"}
      </button>
    </form>
  );
};

export default EnquiryForm;
