"use client";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/Context";
import { checkUserAPI, verifyOtpAPI, registerUserAPI } from "@/vidyarishiapi/utils/authapi";
import AllCoursesVidya from "@/data/vidya/VidyaCourses.json";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import IndianStates from "@/data/indianStates.json";
import { handlePostLoginAction } from "@/vidyarishiapi/utils/handlePostLoginAction";

const LoginRegisterForm = ({ buttonName = "Continue", Inputheight = 50, InputFontSize = 15 }) => {
  const {
    IsOpenLoginModal,
    setIsOpenLoginModal,
    IsPhoneNumber,
    setIsPhoneNumber,

    IsUserExist,
    setIsUserExist,

    IsCurrentStep,
    setIsCurrentStep,
    user,
    setUser
  } = useAppContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [course, setCourse] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);
  const [all_Courses, setAllCourses] = useState([]);
  const otpRefs = Array.from({ length: 4 }, () => useRef(null));
  const otpValues = useRef(["", "", "", ""]);
  const [refreshOtpUI, setRefreshOtpUI] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpFilled, setOtpFilled] = useState(false);

  const [timer, setTimer] = useState(30);
  const [resendAvailable, setResendAvailable] = useState(false);
  const timerRef = useRef(null);
  const router = useRouter();


  // Timer helpers
  const startTimer = () => {
    setTimer(30);
    setResendAvailable(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setResendAvailable(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (timer === 0) {
      const joinedOtp = otpValues.current.join("");
      setOtpFilled(joinedOtp.length === 4);
    }
  }, [timer]);

  useEffect(() => {
    // when entering OTP step for any flow, start timer
    if (IsCurrentStep === 2) startTimer();
    else stopTimer();
  }, [IsCurrentStep]);

  useEffect(() => {
    setAllCourses(AllCoursesVidya?.all_Courses || []);
  }, []);

  // Block scroll while modal open
  useEffect(() => {
    document.body.style.overflow = IsOpenLoginModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [IsOpenLoginModal]);

  // Step progress helpers
  const showStepBar = () => !IsUserExist && (IsCurrentStep === 3 || IsCurrentStep === 4);
  const progressPercent = () => {
    if (!showStepBar()) return 0;
    if (IsCurrentStep === 3) return 50;
    if (IsCurrentStep === 4) return 100;
    return 0;
  };

  // Phone handlers
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setIsPhoneNumber(val);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    if (!IsPhoneNumber || IsPhoneNumber.length !== 10) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    const result = await checkUserAPI(IsPhoneNumber);

    if (result?.error) {
      alert("Something went wrong. Try again.");
      return;
    }

    // 👤 STUDENT FLOW (OTP)
    setIsUserExist(result.exists);
    setIsCurrentStep(2);
    startTimer();
  };


  // OTP handlers
  const handleOTPChange = (val, index) => {
    if (!/^\d?$/.test(val)) return;
    otpValues.current[index] = val;

    // ✅ THIS LINE FIXES EVERYTHING
    setOtpFilled(otpValues.current.join("").length === 4);

    if (val && index < 3) otpRefs[index + 1].current?.focus();
    if (!val && index > 0) otpRefs[index - 1].current?.focus();
  };

  const handleBackspace = (value, index) => {
    if (!value && index > 0) otpRefs[index - 1].current?.focus();
  };

  const handleVerifyOtp = async () => {
    if (verifyingOtp) return;
    setVerifyingOtp(true);

    try {
      const enteredOtp = otpValues.current.join("");
      if (enteredOtp.length !== 4) {
        alert("Enter 4-digit OTP");
        return;
      }

      const result = await verifyOtpAPI(IsPhoneNumber, enteredOtp);

      if (result?.status === "login_success") {
        setIsOpenLoginModal(false);
        const redirectedTo = await handlePostLoginAction(router);

        // only go to dashboard if NO post-login action existed
        if (!redirectedTo) {
          router.push("/dashboard");
        }
        return; // ✅ STOP execution
      }

      if (result?.status === "continue_registration") {
        setIsCurrentStep(3);
        return;
      }

      alert(result?.message || "Invalid OTP");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const resendOtp = async () => {
    if (!resendAvailable) return;

    await checkUserAPI(IsPhoneNumber);

    otpValues.current = ["", "", "", ""];
    setOtpFilled(false); // ✅ ADD THIS
    setRefreshOtpUI((prev) => !prev);

    otpRefs[0].current?.focus();
    startTimer();
  };

  // const resendOtp = async () => {
  //   if (!resendAvailable) return;
  //   await checkUserAPI(IsPhoneNumber);
  //   otpValues.current = ["", "", "", ""];
  //   setRefreshOtpUI((prev) => !prev);
  //   otpRefs[0].current?.focus();
  //   startTimer();
  // };

  // Registration handlers
  const handleCourseNext = () => {
    if (!course) {
      alert("Please select a course");
      return;
    }
    setIsCurrentStep(4);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const data = {
      phone: IsPhoneNumber,
      fullName,
      email,
      dob,
      gender,
      qualification,
      state,
      city,
      course,
      whatsapp,
    };

    const res = await registerUserAPI(data);

    setUser(res.user);
    if (res?.status === "success") {
      const redirectedTo = await handlePostLoginAction(router);

      if (!redirectedTo) {
        router.push("/dashboard");
      }
      return; // ✅ stop here
    }

    alert(res?.message || "Registration failed");
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div>
            <h3 className={styles.title}>Welcome to VidyaRishi</h3>
            <p className={styles.subtitle}>
              {IsCurrentStep === 1 && "Enter your phone number"}
              {IsCurrentStep === 2 && "We sent an OTP to your phone"}
              {IsCurrentStep === 3 && "Choose a course"}
              {IsCurrentStep === 4 && "Complete your registration"}
            </p>
          </div>
        </header>

        {showStepBar() && (
          <div className={styles.stepbarWrapper}>
            <div className={styles.pillRow}>
              <div className={styles.pill} data-active={IsCurrentStep > 2}>
                <span className={styles.pillNum}>1</span>
                <span className={styles.pillLabel}>Details</span>
              </div>

              <div className={styles.stepLine}>
                <div className={styles.stepProgress} style={{ width: `${progressPercent()}%` }} />
              </div>

              <div className={styles.pill} data-active={IsCurrentStep > 3}>
                <span className={styles.pillNum}>2</span>
                <span className={styles.pillLabel}>Finish</span>
              </div>
            </div>
          </div>
        )}

        <div className={styles.body}>
          {/* STEP 1: PHONE INPUT */}
          {IsCurrentStep === 1 && (
            <form onSubmit={handlePhoneSubmit} className={styles.form}>
              <div className={styles.dividerLine} />

              <div className={styles.field}>
                <label className={styles.floatingLabel}>
                  <input
                    className={styles.input}
                    onChange={handlePhoneChange}
                    value={IsPhoneNumber}
                    type="tel"
                    placeholder="Phone Number"
                    style={{ height: Inputheight, fontSize: InputFontSize }}
                  />
                </label>
              </div>

              <button type="submit" className={`${styles.btn} rbt-btn3 btn-gradient`}>
                {buttonName}
              </button>
            </form>
          )}

          {/* STEP 2: OTP INPUT */}
          {IsCurrentStep === 2 && (
            <div className={styles.otpContainer}>
              <div className={styles.dividerLine} />

              <p className={styles.otpTitle}>Enter OTP</p>

              <div className={styles.otpRow} key={String(refreshOtpUI)}>
                {otpRefs.map((ref, i) => (
                  <input
                    key={i}
                    ref={ref}
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => handleOTPChange(e.target.value, i)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") handleBackspace(e.target.value, i);
                    }}
                    className={styles.otpBox}
                    aria-label={`OTP digit ${i + 1}`}
                  />
                ))}
              </div>

              <div className={styles.timerRow}>
                {timer > 0 ? (
                  <p className={styles.timerText}>Resend OTP in <b>00:{String(timer).padStart(2, "0")}</b></p>
                ) : (
                  <p className={styles.resendText} onClick={resendOtp}>Resend OTP</p>
                )}
              </div>

              <div className={styles.actionsRow}>
                <button
                  className={styles.btnPrimary}
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || !otpFilled}
                >
                  {verifyingOtp ? "Verifying..." : "Verify OTP"}
                </button>

                {/* <button
                  className={styles.btnPrimary}
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || otpValues.current.join("").length !== 4}
                >
                  {verifyingOtp ? "Verifying..." : "Verify OTP"}
                </button> */}

                <button className={styles.btnGhost} onClick={() => setIsCurrentStep(1)}>
                  Change Phone
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: COURSE SELECT */}
          {IsCurrentStep === 3 && (
            <div className={styles.courseStep}>
              <label className={styles.floatingLabelSelect}>
                <select required value={course} onChange={(e) => setCourse(e.target.value)} className={styles.courseselectInput}>
                  <option value="">Select Course Interested</option>
                  {all_Courses
                    ?.filter((c) => {
                      const type = String(c?.course_type || "").toLowerCase();
                      return type === "online" || type === "distance";
                    })
                    .map((course) => (
                      <option key={course.course_link} value={course.course_link}>
                        {course.course_name} ({course.course_type})
                      </option>
                    ))}
                </select>
              </label>

              <div className={styles.actionsRow}>
                <button className={styles.btnPrimary} onClick={handleCourseNext}>Next →</button>
                <button className={styles.btnGhost} onClick={() => { setIsCurrentStep(2); startTimer(); }}>
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REGISTRATION FORM */}
          {IsCurrentStep === 4 && (
            <form onSubmit={handleRegisterSubmit} className={styles.regForm}>
              <div className={styles.regSection}>
                <div className={styles.left}>
                  <label className={styles.floatingLabel}>
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={styles.input}
                    />
                  </label>

                  <label className={styles.floatingLabel}>
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                    />
                  </label>

                  <label className={styles.floatingLabel}>
                    <select required value={qualification} onChange={(e) => setQualification(e.target.value)} className={styles.input}>
                      <option value="">Highest Qualification</option>
                      <option>10th</option>
                      <option>12th</option>
                      <option>Diploma</option>
                      <option>Undergraduate (UG)</option>
                      <option>Postgraduate (PG)</option>
                      <option>Working Professional</option>
                    </select>
                  </label>
                </div>

                <div className={styles.regDivider} />

                <div className={styles.right}>
                  <div className={styles.regRowInline}>

                    <label className={styles.floatingLabel}>
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className={styles.genderinput}>
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </label>

                    <label className={styles.floatingLabel}>
                      <input
                        type="date"
                        placeholder=" "
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className={styles.input}
                      />
                    </label>
                  </div>

                  <div className={styles.stateCityRow}>
                    <label className={styles.floatingLabel} style={{ flex: 1 }}>
                      <select required value={state} onChange={(e) => setState(e.target.value)} className={styles.input}>
                        <option value="">Select State</option>
                        {IndianStates.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>

                    </label>

                    <label className={styles.floatingLabel} style={{ flex: 1 }}>
                      <input type="text" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)} className={styles.input} />

                    </label>
                  </div>
                </div>
              </div>

              <label className={styles.regCheckbox}>
                <input type="checkbox" name="whatsapp" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} />
                <span className={styles.checkboxBox}>{whatsapp && <span className={styles.checkboxTick}></span>}</span>
                <span className={styles.checkboxText}>Send me WhatsApp updates</span>
              </label>

              <div className={styles.regActions}>
                <button className={`${styles.btnPrimary}`} type="submit">Complete Registration →</button>
                <button type="button" className={styles.btnGhost} onClick={() => { setIsCurrentStep(3); startTimer(); }}>← Back</button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default LoginRegisterForm;
