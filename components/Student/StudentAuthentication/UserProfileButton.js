import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { logoutUserAPI } from "@/vidyarishiapi/utils/authapi";
import { useAppContext } from "@/context/Context";
import sidebarData from "@/data/dashboard/student/student-sidebar.json";
import { useDispatch } from "react-redux";

const UserProfileButton = ({ user }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef();
  const { setUser, cartToggle, setCart } = useAppContext();

  const toggleDropdown = () => setOpen(!open);

  // Logout handler
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUserAPI();

      // 🔥 RESET REDUX CART (VERY IMPORTANT)
      dispatch({ type: "RESET_CART" });

      // clear user context
      setUser(null);

      // redirect
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const profileImage = user?.profileImage?.url;

  const menuItems = sidebarData.siderbar; // from JSON

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        zIndex: 999999,
        pointerEvents: "auto",
      }}
    >
      {/* PROFILE BUTTON */}
      <div
        className="user-profile-box"
        onClick={toggleDropdown}
        style={{
          marginLeft: "24px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {user.fullName?.charAt(0)?.toUpperCase()}
          </div>
        )}

        <div style={{ lineHeight: "1.1" }}>
          <div style={{ fontWeight: 600 }}>{user.fullName}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Student</div>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      <div
        className={`profile-dropdown ${open ? "open" : ""}`}
        style={{
          position: "absolute",
          top: "55px",
          right: 0,
          width: "240px",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
          padding: "10px 0",
          zIndex: 999999,
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0px)" : "translateY(10px)",
          transition: "all 0.18s ease",
        }}
      >
        {menuItems.map((item, index) => {

          // 🛒 VIEW CART
          // if (item.action === "view_cart") {
          //   return (
          //     <DropdownItem
          //       key={index}
          //       icon={item.icon}
          //       label={item.text}
          //       onClick={() => {
          //         setOpen(false);
          //         setCart(!cartToggle);
          //       }}
          //     />
          //   );
          // }

          // 🚪 LOGOUT
          if (item.action === "logout") {
            return (
              <DropdownItem
                key={index}
                icon={item.icon}
                label={item.text}
                onClick={handleLogout}
                color="red"
              />
            );
          }

          // 🔗 NORMAL ROUTES (ONLY if link exists)
          if (item.link) {
            return (
              <DropdownItem
                key={index}
                icon={item.icon}
                label={item.text}
                onClick={() => {
                  setOpen(false);
                  router.push(item.link);
                }}
              />
            );
          }

          return null;
        })}

      </div>
    </div>
  );
};

const DropdownItem = ({ icon, label, onClick, color }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px 18px",
        cursor: "pointer",
        fontSize: "15px",
        color: color || "#333",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.background = "#f5f5f5")}
      onMouseLeave={(e) => (e.target.style.background = "transparent")}
    >
      <i className={icon}></i>
      {label}
    </div>
  );
};

export default UserProfileButton;
