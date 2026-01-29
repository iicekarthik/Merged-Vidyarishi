"use client";
import { useEffect, useState } from "react";
import styles from "../coursebtn.module.css"
import { toast } from "react-toastify";

export default function UpdateCourseDetailsForm({ close, refresh, editData }) {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [existingImage, setExistingImage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    courseType: "popular",
    isPublished: false,
    coursePrice: "",
    offerPrice: "",
    lectures: 0,
    enrolledStudent: 0,
    // rating: 0,
    // totalReviews: 0,
    courseImg: null,
  });

  // Load edit data
  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        description: editData.description || "",
        courseImg: null, // only for NEW upload
      });

      // ✅ store existing cloudinary image
      setExistingImage(editData.courseImg?.url || "");
    }
  }, [editData]);



  const submit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // ❗ remove image before JSON update
      const { courseImg, ...formWithoutImage } = form;

      const res = await fetch("/api/admin/courses/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: editData.courseId,
          ...formWithoutImage,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      // 🖼️ upload new image if selected
      if (courseImg) {
        const fd = new FormData();
        fd.append("courseImg", courseImg);
        fd.append("courseId", editData.courseId);

        await fetch("/api/admin/courses/upload-img/upload-image", {
          method: "POST",
          body: fd,
        });
      }

      toast.success("Course updated successfully ✨");
      refresh();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>

      <div
        style={{
          maxHeight: "55vh",        // 🔥 controls scroll height
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        <div className="row g-4">

          {/* Title */}
          <div className="col-md-6">
            <label>Title</label>
            <input
              className={styles["form-control"]}
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label>Category</label>
            <input
              className={styles["form-control"]}
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          {/* Course Price */}
          <div className="col-md-6">
            <label>Course Price</label>
            <input
              type="number"
              className={styles["form-control"]}
              value={form.coursePrice}
              onChange={(e) =>
                setForm({ ...form, coursePrice: e.target.value })
              }
            />
          </div>

          {/* Offer Price */}
          <div className="col-md-6">
            <label>Offer Price</label>
            <input
              type="number"
              className={styles["form-control"]}
              value={form.offerPrice}
              onChange={(e) =>
                setForm({ ...form, offerPrice: e.target.value })
              }
            />
          </div>

          {/* Course Type */}
          <div className="col-md-6">
            <label>Course Type</label>
            <select
              className={styles["form-control"]}
              value={form.courseType}
              onChange={(e) =>
                setForm({ ...form, courseType: e.target.value })
              }
            >
              <option value="popular">Popular</option>
              <option value="featured">Featured</option>
              <option value="latest">Latest</option>
            </select>
          </div>

          {/* Thumbnail URL */}
          <div className="col-md-6">
            <label>Course Thumbnail</label>

            <div className="d-flex gap-2">
              <input
                type="file"
                accept="image/*"
                className={styles["form-control"]}
                onChange={(e) =>
                  setForm({ ...form, courseImg: e.target.files[0] })
                }
              />

              <button
                type="button"
                className={`${styles["vr-btn"]} ${styles["vr-btn-secondary"]}`}
                onClick={() => setShowPreview(true)}
                disabled={!form.courseImg && !existingImage}
              >
                Preview
              </button>

            </div>
          </div>

          {/* Thumbnail Preview */}
          {/* Thumbnail Preview */}
          {(showPreview || existingImage) && (
            <div className="col-md-12 mt-3">
              <div
                style={{
                  position: "relative",
                  padding: "12px",
                  border: "1px dashed #ddd",
                  borderRadius: "8px",
                  background: "#fafafa",
                  width: "fit-content",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowPreview(false);
                    setExistingImage("");
                  }}
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>

                <img
                  src={
                    form.courseImg
                      ? URL.createObjectURL(form.courseImg) // new upload
                      : existingImage                    // existing image
                  }
                  alt="Course Thumbnail"
                  style={{ width: "220px", borderRadius: "6px" }}
                />
              </div>
            </div>
          )}


          {/* Description */}
          <div className="col-md-12">
            <label>Description</label>
            <textarea
              rows={4}
              className={styles["form-control"]}
              placeholder="Enter course description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Published Checkbox */}
          <div className="col-md-6 d-flex align-items-center mt-2">
            <div className="form-check">
              <input
                type="checkbox"
                id="isPublished"
                className="form-check-input"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isPublished: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="isPublished"
                className="form-check-label"
                style={{ cursor: "pointer" }}
              >
                Published
              </label>
            </div>
          </div>

        </div>
        {/* Actions */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className={`${styles["vr-btn"]} ${styles["vr-btn-secondary"]}`}
            onClick={close}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className={`${styles["vr-btn"]} ${styles["vr-btn-primary"]}`}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Course"}
          </button>
        </div>
      </div>


    </>
  );
}
