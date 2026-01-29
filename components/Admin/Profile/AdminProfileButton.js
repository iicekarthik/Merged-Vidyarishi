import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/Context";
import adminSidebar from "@/data/dashboard/admin-dashboard/admin-sidebar.json";

const AdminProfileButton = ({ admin }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const router = useRouter();
  const { setUser } = useAppContext();

  const toggleDropdown = () => setOpen(!open);

  // 🚪 ADMIN LOGOUT
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Admin logout failed", err);
    }
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", zIndex: 999999 }}
    >
      {/* ADMIN PROFILE BUTTON */}
      <div
        onClick={toggleDropdown}
        style={{
          marginLeft: "24px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {admin.profilePhoto ? (
            <img
              src={admin.profilePhoto?.url}
              alt="Admin"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <span style={{ fontWeight: "bold" }}>
              {admin.fullName?.charAt(0)?.toUpperCase()}
            </span>
          )}
        </div>

        <div style={{ lineHeight: "1.1" }}>
          <div style={{ fontWeight: 600 }}>{admin.fullName}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Admin</div>
        </div>
      </div>

      {/* DROPDOWN */}
      <div
        style={{
          position: "absolute",
          top: "55px",
          right: 0,
          width: "240px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
          padding: "10px 0",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(10px)",
          transition: "0.18s ease",
        }}
      >
        {adminSidebar.sidebar.map((item, index) => {
          // 🚪 LOGOUT
          if (item.action === "logout") {
            return (
              <DropdownItem
                key={index}
                icon={item.icon}
                label={item.text}
                color="red"
                onClick={handleLogout}
              />
            );
          }

          // 🔗 ADMIN ROUTES
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

const DropdownItem = ({ icon, label, onClick, color }) => (
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
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
    onMouseLeave={(e) =>
      (e.currentTarget.style.background = "transparent")
    }
  >
    <i className={icon}></i>
    {label}
  </div>
);

export default AdminProfileButton;
