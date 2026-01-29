import { toast } from "react-toastify";

export const handleBuyNow = ({
  user,
  course,
  router,
  setIsOpenLoginModal,
}) => {
  // ❌ Block admin
  if (user?.isAdmin || user?.role === "admin") {
    toast.error("Admins cannot enroll in courses");
    return;
  }

  // 🔐 Not logged in → login modal + post action
  if (!user) {
    localStorage.setItem(
      "postLoginAction",
      JSON.stringify({
        action: "buy_now",
        payload: { courseId: course.courseId },
        redirectTo: "/pay-online",
      })
    );

    setIsOpenLoginModal(true);
    return;
  }

  // ✅ Logged in student → payment
  router.push({
    pathname: "/pay-online",
    query: {
      courseId: course.courseId,  
      courseName: course.title,
      courseFee: course.offerPrice ?? course.coursePrice,
    },
  });
};
