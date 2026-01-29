"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/vidyarishiapi/lib/axios";
import { toast } from "react-toastify";
import styles from "./AdminAuth.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // STEP 1: EMAIL + PASSWORD
  const handleLogin = async () => {
    if (otpSent) return;

    if (!form.email || !form.password) {
      return toast.error("Email and password are required");
    }

    setLoading(true);

    try {
      await api.post("/api/admin/auth/login", {
        email: form.email,
        password: form.password,
      });

      setOtpSent(true);
      toast.success("OTP sent to email");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  // STEP 2: OTP VERIFY
  const verifyOtp = async () => {
    if (!/^\d{4}$/.test(form.otp)) {
      return toast.error("OTP must be a 4-digit number");
    }

    setLoading(true);

    try {
      await api.post(
        "/api/admin/auth/verify-otp",
        { email: form.email, otp: form.otp },
        { withCredentials: true }
      );

      toast.success("Login successful");
      router.push("/admin-dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };


  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 4) {
      setForm({ ...form, otp: value });
    }
  };

  const handleBack = () => {
    setOtpSent(false);
    setForm((prev) => ({ ...prev, otp: "" }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3 className={styles.title}>Admin Login</h3>

        {!otpSent && (
          <>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />

            <div className={styles.passwordWrapper}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
              />
              <span
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            <button
              type="button"
              className={styles.button}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
          </>
        )}
        {otpSent && (
          <>
            <input
              name="otp"
              placeholder="Enter 4-digit OTP"
              value={form.otp}
              onChange={handleOtpChange}
              maxLength={4}
              inputMode="numeric"
              className={styles.input}
            />

            <p className={styles.infoText}>
              Didn't receive a code? Go back and try again.
            </p>

            <div className={styles.buttonRow}>
              <button
                type="button"
                className={styles.button}
                disabled={loading}
                onClick={verifyOtp}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                className={`${styles.button} ${styles.buttonSecondary}`}
                onClick={handleBack}
                disabled={loading}
              >
                Back
              </button>
            </div>
          </>

        )}

      </div>
    </div>
  );
};

export default AdminAuth;
