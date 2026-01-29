import { useScreenSize } from "@/hooks/screenSize";
import React, { useEffect, useState } from "react";
import CategorySlider from "../Category/CategoriesSlider";
import { CgSoftwareDownload } from "react-icons/cg";
import PrivacyFooter from "../termAndCondition/PrivacyFooter";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import countriesData from "country-codes-list/dist/countriesData";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/Context";

const PayOnlineComp = () => {
  const [copied, setCopied] = useState(false);
  const upiId = "vidyarishi@kotak";

  const handleCopy = () => {
    navigator.clipboard.writeText("vidyarishi@kotak");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ScreenSize = useScreenSize();
  const BigScreenSize = ["xxl", "xl", "lg"].includes(ScreenSize);

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = "/images/vidya/payment/qr.png";
    link.download = "Vidyarishi_QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: e.target.value,
    }));
  };

  // submit payment
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    email: "",
    countryCode: "91",
    phone: "",
    courseName: "",
    courseFee: "",
  });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phone, courseName, countryCode, courseFee } = formData;

    const fullPhoneNumber = `+${countryCode}${phone}`;

    if (
      !name ||
      !email ||
      !phone ||
      !courseName ||
      !courseFee ||
      !countryCode
    ) {
      alert("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const orderId = `ORDER_${Date.now()}`;

    try {
      const res = await fetch("/api/cashfree-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          orderAmount: courseFee,
          courseIds: selectedCourseIds,
          courseName,
          Name: name,
          Phone: fullPhoneNumber,
          Email: email,
        }),
      });

      const data = await res.json();
      // console.log("Cashfree Response:", data);

      if (!data?.paymentSessionId) {
        throw new Error("Missing payment session ID");
      }

      const cashfree = await load({
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE,
      });

      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE,
        redirectTarget: "_self", // optional
      };

      await cashfree.checkout(checkoutOptions);
    } catch (err) {
      // console.error("Payment Error:", err);
      alert("Payment initiation failed");
    }

    setLoading(false);
  };

  // Dynamically load SDK (if not already loaded)
  // const loadCashfreeSdk = () => {
  //   return new Promise((resolve, reject) => {
  //     if (document.getElementById("cashfree-sdk")) {
  //       resolve();
  //       return;
  //     }

  //     const script = document.createElement("script");
  //     script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
  //     script.id = "cashfree-sdk";
  //     script.onload = resolve;
  //     script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
  //     document.body.appendChild(script);
  //   });
  // };

  const { user } = useAppContext();
  const router = useRouter();
  const { courseIds, courseName, courseFee } = router.query;

  // const { courseName, courseFee } = router.query;

  // useEffect(() => {
  //   if (courseName || courseFee) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       courseName: courseName || "",
  //       courseFee: courseFee || "",
  //     }));
  //   }
  // }, [courseName, courseFee]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phone?.replace("+91", "") || "",
        countryCode: "91",
      }));
    }
  }, [user]);

  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  useEffect(() => {
    if (courseIds) {
      try {
        const parsed =
          typeof courseIds === "string"
            ? JSON.parse(courseIds)
            : courseIds;

        setSelectedCourseIds(parsed);
      } catch (err) {
        console.error("Invalid courseIds:", err);
        setSelectedCourseIds([]);
      }
    }
  }, [courseIds]);

  useEffect(() => {
    if (router.isReady) {
      setFormData((prev) => ({
        ...prev,
        courseName: courseName || "Selected Course",
        courseFee: courseFee || "",
      }));
    }
  }, [router.isReady, courseName, courseFee]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          padding: "0 24px",
          margin: "30px 0px 60px 0px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "10px",
            width: "100%",
          }}
        >
          {/* Pay Directly to Us */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              boxShadow: "0 0px 30px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              textAlign: "center",
              flex: "1",
              minWidth: "300px",
              maxWidth: "450px",
              // height : "60%"
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              PAY DIRECTLY TO US
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="/images/vidya/payment/qr.png"
                alt="QR Code"
                style={{ width: "160px", height: "160px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginTop: "14px",
              }}
            >
              <button
                onClick={handleDownloadQR}
                className="mt-1.5 rbt-btn2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  borderRadius: "8px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  // width: "50%",
                }}
              >
                <CgSoftwareDownload size={24} style={{ padding: "1.5px 0" }} />
                Download QR Code
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                margin: "25px 0px",
              }}
            >
              {[
                "/images/vidya/payment/phonepe.png",
                "/images/vidya/payment/gpay.png",
                "/images/vidya/payment/paytm.png",
                "/images/vidya/payment/bhimupi.png",
                "/images/vidya/payment/amazon.png",
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Payment Method"
                  style={{
                    width: "auto",
                    height: "45px",
                    padding: "1.5px",
                    borderRadius: "10%",
                    border: "1px solid lightgray",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              <input
                type="text"
                readOnly
                value={upiId}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px 6px",
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "50%",
                }}
              />
              <button
                onClick={handleCopy}
                className="rbt-btn3"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  borderRadius: "8px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {copied ? "UPI ID Copied" : "Copy UPI ID"}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginTop: "30px",
                color: "black",
                fontSize: "16px",
              }}
            >
              Scan, Pay, and Proceed – It's That Simple!
            </div>
          </div>

          {/* Pay Through Credit Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              boxShadow: "0 0px 30px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              flex: "1",
              minWidth: "300px",
              maxWidth: "450px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              PAY THROUGH CREDIT CARD
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "8px",
                  width: "100%",
                }}
                placeholder="Enter Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "8px",
                  width: "100%",
                }}
                placeholder="Enter Email"
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                {/* Country Code Select */}
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleCountryCodeChange}
                  defaultValue="91"
                  style={{
                    border: "1px solid #ccc",
                    padding: "0px 10px",
                    borderRadius: "8px",
                    width: "35%",
                    height: "50px",
                    minWidth: "100px",
                    fontSize: "14px",
                    backgroundColor: "#fff",
                    appearance: "none",
                  }}
                >
                  {countriesData
                    .sort((a, b) =>
                      a.countryNameEn.localeCompare(b.countryNameEn)
                    )
                    .map((country) => (
                      <option
                        style={{
                          padding: "0",
                          margin: "0",
                        }}
                        selected={country.countryCallingCode === "91"}
                        key={country.countryCode}
                        value={country.countryCallingCode}
                      >
                        {country.countryCode} (+{country.countryCallingCode})
                      </option>
                    ))}
                </select>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="12345 67890"
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    width: "100%",
                    fontSize: "14px",
                  }}
                />
              </div>

              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                readOnly
                required
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "8px",
                  width: "100%",
                }}
                placeholder="Enter Course Name"
              />
              <input
                type="number"
                name="courseFee"
                value={formData.courseFee}
                onChange={handleChange}
                readOnly
                required
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "8px",
                  width: "100%",
                }}
                placeholder="Enter Course Fee"
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#1d4ed8",
                  color: "#ffffff",
                  padding: "12px",
                  margin: "5px 0",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {loading ? <div>Loading......</div> : <div>Submit</div>}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ margin: "30px auto", width: "80%" }}>
        <CategorySlider />
      </div>
      <div style={{ margin: "60px  0 0 auto", width: "100%" }}>
        <PrivacyFooter />
      </div>
    </>
  );
};

export default PayOnlineComp;
