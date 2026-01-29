import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BusinessForm = ({ isPopUpBusinessForm, setisPopUpBusinessForm }) => {
  const [Loading, setLoading] = useState();
  const [Error, setError] = useState();
  const [PartnerFormData, setPartnerFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    model: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartnerFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // console.log("Form Data:", PartnerFormData); // Log
  //   const { name, email, phone, state, model } = PartnerFormData;

  //   if (!name?.trim() || !email || !phone || !state || !model) {
  //     toast.warning("Please fill all required fields before submitting!");
  //     return;
  //   }

  //   const nameParts = name.trim().split(" ");
  //   const firstName = nameParts[0] || "";
  //   const lastName =
  //     nameParts.length > 1 ? nameParts.slice(1).join(" ") : "N/A";

  //   setLoading(true);
  //   setError(null);

  //   const apiKey = process.env.NEXT_PUBLIC_BIZIVERSE_APIKEY;

  //   // **Double Stringify `data` as per API requirement**
  //   const apiParams = JSON.stringify([
  //     {
  //       moduleID: 25,
  //       actionType: "setLead",
  //       data: JSON.stringify([
  //         {
  //           companyName: "N/A",
  //           title: "Mr/Ms",
  //           firstName,
  //           lastName,
  //           email,
  //           mobile: phone,
  //           designation: model + "Designation",
  //           city: state + ", City N/A",
  //           state,
  //           needs: model,
  //           subject: "Business Associate Partner Inquiry",
  //           source: "Vidyarishi Website - Associate Form",
  //         },
  //       ]),
  //     },
  //   ]);

  //   // **Properly Encode API Data for application/x-www-form-urlencoded**
  //   const formData = new URLSearchParams();
  //   formData.append("apiKey", apiKey);
  //   formData.append("apiParams", apiParams); // ✅ Double-stringified JSON

  //   try {
  //     const response = await axios.post(
  //       "https://biziverse.com/PremiumAPI.asmx/setAPI",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     );

  //     let responseText = response.data;

  //     // ✅ Use Regex to Detect Error Codes in XML Response
  //     const match = responseText.match(/<errorCode>(\d+)<\/errorCode>/);
  //     const errorCode = match ? match[1] : null;

  //     // console.log("errorCode", responseText); // Log errorCode

  //     if (errorCode === "200") {
  //       toast.info("Please Try After Some Times");
  //     } else if (errorCode === "305") {
  //       toast.warning("This Mobile Number Already Used.");
  //     } else if (errorCode === "304") {
  //       toast.warning("Please enter a valid mobile number");
  //     } else if (errorCode === "201") {
  //       toast.warning("Missing required data. Please fill all fields.");
  //     } else if (responseText.includes("-1")) {
  //       toast.success("We Will Contact You Shortlyyy!");
  //       setTimeout(() => {
  //         setPartnerFormData({
  //           name: "",
  //           email: "",
  //           phone: "",
  //           state: "",
  //           model: "",
  //         });
  //         if (isPopUpBusinessForm) {
  //           setisPopUpBusinessForm(false);
  //         }
  //       }, 1500);
  //     } else {
  //       toast.error("There was an error processing your request.");
  //     }
  //   } catch (error) {
  //     toast.error("Error sending data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, state, model } = PartnerFormData;

    if (!name || !email || !phone || !state || !model) {
      toast.warning("Please fill all required fields before submitting!");
      return;
    }

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : "N/A";

    setLoading(true);

    try {
      const response = await axios.post("/api/biziverse/set-lead", {
        apiParams: [
          {
            moduleID: 25,
            actionType: "setLead",
            data: [
              {
                companyName: "N/A",
                title: "Mr/Ms",
                firstName,
                lastName,
                email,
                mobile: phone,
                designation: model,
                city: "N/A",
                state,
                needs: model,
                subject: "Business Associate Partner Inquiry",
                source: "Vidyarishi Website - Associate Form",
              },
            ],
          },
        ],
      });

      const responseText = response.data.data;
      const match = responseText.match(/<errorCode>(-?\d+)<\/errorCode>/);
      const errorCode = match ? match[1] : null;

      if (errorCode === "-1") {
        toast.success("We Will Contact You Shortly!");
        setPartnerFormData({
          name: "",
          email: "",
          phone: "",
          state: "",
          model: "",
        });
        if (isPopUpBusinessForm) setisPopUpBusinessForm(false);
      } else if (errorCode === "305") {
        toast.warning("This Mobile Number Already Used.");
      } else if (errorCode === "304") {
        toast.warning("Please enter a valid mobile number.");
      } else {
        toast.error("There was an error processing your request.");
      }
    } catch (error) {
      toast.error("Error sending data");
    } finally {
      setLoading(false);
    }
  };

  const states = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div
      style={{
        // maxWidth: "500px",
        // margin: "0px auto",
        marginTop: "-50px",
        padding: "20px 30px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      }}
    >
      {isPopUpBusinessForm && (
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => setisPopUpBusinessForm(false)}
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              backgroundColor: "transparent",
              border: "none",
              //   borderRadius: "50%",
              width: "25px",
              height: "40px",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#f44336",
              cursor: "pointer",
              //   boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}

      <h3
        style={{
          marginTop: isPopUpBusinessForm && "10px",
          marginBottom: "25px",
          color: "#333",
          fontSize: "20px",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Become Vidyarishi Partner
      </h3>

      <span style={{ color: "red" }}>{Error}</span>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={PartnerFormData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={PartnerFormData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={PartnerFormData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="state"
          value={PartnerFormData.state}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          name="model"
          value={PartnerFormData.model}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="select" selected>
            Which Collaboration Model Would You Like to Choose?
          </option>
          <option value="Lead Only">Lead Only</option>
          <option value="Admission">Admission</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "14px 20px",
            backgroundColor: "#7b42f6",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#652dc1")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#7b42f6")
          }
        >
          {Loading ? "Loading......" : "Submit"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px",
  width: "100%",
  outline: "none",
};

export default BusinessForm;
