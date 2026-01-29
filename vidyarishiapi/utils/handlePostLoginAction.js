import api from "@/vidyarishiapi/lib/axios";
import { toast } from "react-toastify";

/**
 * Executes the stored post-login action (wishlist, cart, enroll)
 * @param {object} router - next router instance
 * @param {function} onDone - optional callback after success
 */
export const handlePostLoginAction = async (router, onDone) => {
  const stored = localStorage.getItem("postLoginAction");
  if (!stored) return null;

  try {
    const { action, payload, redirectTo } = JSON.parse(stored);

    switch (action) {
      case "add_to_cart":
        await api.post("/api/dashboard/view_cart", {
          courseId: payload.courseId,
        });
        toast.success("Added to cart");
        break;

      case "wishlist":
        await api.post("/api/dashboard/wishlist", payload);
        toast.success("Added to wishlist");
        break;

      case "enroll":
        try {
          await api.post("/api/dashboard/student/lms/enroll", {
            courseId: payload.courseId,
          });

          toast.success("Successfully enrolled 🎉");
        } catch (err) {
          const status = err.response?.status;
          const msg = err.response?.data?.message?.toLowerCase() || "";

          // 🎓 COMPLETED
          if (msg.includes("completed")) {
            toast.info("You have already completed this course 🎓");
          }
          // ℹ️ ALREADY ENROLLED
          else if (status === 409 || msg.includes("already")) {
            toast.info("You are already enrolled in this course");
          }
          // ❌ OTHER ERROR
          else {
            toast.error("Enrollment failed");
          }
        }
        break;



      default:
        console.warn("Unknown post-login action:", action);
    }

    localStorage.removeItem("postLoginAction");

    if (onDone) onDone();
    if (redirectTo) router.replace(redirectTo);

    return redirectTo;
  } catch (err) {
    console.error("Post-login action failed", err);
    toast.error(err.response?.data?.message || "Action failed after login");
    localStorage.removeItem("postLoginAction");
    return null;
  }
};
