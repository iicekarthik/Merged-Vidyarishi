import { useEffect, useState } from "react";
import CourseWidget from "./CourseWidget";
import api from "@/vidyarishiapi/lib/axios";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/api/dashboard/wishlist");
        setCourses(res.data?.data || []);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Please login to view your wishlist");
        } else {
          toast.error("Failed to load wishlist");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Remove course from UI after delete
  const removeFromUI = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.courseId !== courseId));
  };

  // // Normalize backend data → CourseWidget format
  // const normalizedWishlist = courses.map(item => ({
  //   // _id: item.courseId,
  //   courseId: item.courseId,
  //   title: item.courseTitle,
  //   isWishlisted: true,
  //   fromWishlist: true,
  // }));


  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Wishlist</h4>
        </div>

        {loading && <p>Loading wishlist...</p>}

        {!loading && courses.length === 0 && (
          <p>No courses in your wishlist yet.</p>
        )}
        <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: "8px" }}>
          <div className="row g-5">
            {courses.map((course) => (
              <div
                key={`wishlist-${course.courseId}`}
                className="col-lg-4 col-md-6 col-12"
              >
                <CourseWidget
                  data={{
                    ...course,
                    isWishlisted: true,
                    fromWishlist: true,
                  }}
                  courseStyle="two"
                  isProgress={false}
                  isCompleted={false}
                  showDescription={false}
                  showAuthor={false}
                  isEdit={false}
                  onRemove={removeFromUI}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
