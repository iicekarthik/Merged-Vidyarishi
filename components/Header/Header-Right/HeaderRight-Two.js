import Link from "next/link";

import { useSelector } from "react-redux";

import User from "../Offcanvas/User";
import { useAppContext } from "@/context/Context";
import Nav from "../Nav";
import { useEffect, useState } from "react";
import PopupForm from "@/components/PopupForm/PopupForm";
import AuthenticationPopup from "@/components/Student/StudentAuthentication/AuthenticationPopup";
import UserProfileButton from "@/components/Student/StudentAuthentication/UserProfileButton";
import AdminProfileButton from "@/components/Admin/Profile/AdminProfileButton";


const HeaderRightTwo = ({ btnClass, btnText, userType }) => {
  const {
    mobile,
    setMobile,
    search,
    setSearch,
    setCourses,
    cartToggle,
    setCart,
    isOpen,
    setIsOpen,

    IsOpenLoginModal,
    setIsOpenLoginModal,
    IsPhoneNumber,
    setIsPhoneNumber,
    user,
    setUser
  } = useAppContext();

  const { total_items } = useSelector((state) => state.CartReducer);

  useEffect(() => {
    setIsOpen(false);

    const fetchUser = async () => {
      try {
        // 🔑 Try Admin first
        let res = await fetch("/api/admin/profile", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser({
            ...data.admin,
            role: "admin",
          });
          return;
        }

        // 👤 Else try Student
        res = await fetch("/api/dashboard/profile/profileroute", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser({
          ...data,
          role: "student",
        });
      } catch (err) {
        setUser(null);
      }
    };


    fetchUser();
  }, [IsOpenLoginModal]);

  return (
    <div className="header-right">
      {/* Navigation */}
      <div className="rbt-main-navigation d-none d-xl-block">
        <Nav />
      </div>

      <ul className="account-access quick-access">
        <li className="account-access rbt-user-wrapper d-none d-xl-block">
          <div className="rbt-btn-wrapper d-none d-xl-block">
            <Link href="/all-courses" className="rbt-btn3">
              Compare University
            </Link>
          </div>
        </li>

        {/* BUTTONS */}
        <li>
          {/* Enquiry Popup Button */}
          <div className="rbt-btn-wrapper d-none d-xl-block">
            <button onClick={() => setIsOpen(true)} className="rbt-btn3">
              Enquire Now
            </button>
          </div>
        </li>

        {/* Login/Register */}
        <li>
          <div className="rbt-button-group">
            {user ? (
              user.role === "admin" ? (
                <AdminProfileButton admin={user} />
              ) : (
                <UserProfileButton user={user} />
              )

            ) : (
              <button
                className="rbt-btn3 btn-gradient"
                style={{ marginLeft: "24px" }}
                onClick={() => setIsOpenLoginModal(true)}
              >
                Sign Up
              </button>
            )}

          </div>
        </li>
      </ul>

      {/* Mobile Menu only */}
      <div className="mobile-menu-bar d-block d-xl-none">
        <div className="hamberger">
          <button
            className="hamberger-button rbt-round-btn"
            onClick={() => setMobile(!mobile)}
          >
            <i className="feather-menu"></i>
          </button>
        </div>
      </div>

      {/* Enquiry Popup */}
      {isOpen && (
        <>
          <PopupForm TimeOutSeconds={100} />
        </>
      )}
      {IsOpenLoginModal && <AuthenticationPopup />}
    </div>
  );
};

export default HeaderRightTwo;
