const InitialAvatar = ({ name, size = 120 }) => {
  // const getInitials = (fullName = "") => {
  //   const parts = fullName.trim().split(" ");
  //   const first = parts[0]?.charAt(0) || "";
  //   const last = parts[1]?.charAt(0) || "";
  //   return (first + last).toUpperCase();
  // };
  const getInitials = (fullName = "") => {
    return fullName.trim().charAt(0).toUpperCase();
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size / 2.5,
        fontWeight: "700",
        textTransform: "uppercase",
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default InitialAvatar;
