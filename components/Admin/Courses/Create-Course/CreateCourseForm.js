"use client";
import { useState } from "react";
import styles from "../coursebtn.module.css";
import { toast } from "react-toastify";

export default function CreateCourseForm({ close, refresh }) {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // ✅ FIX
  const [Published, setPublished] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    courseType: "popular",
    isPublished: false,
    coursePrice: "",
    offerPrice: "",
    courseImg: "",
    // lectures: 0,
  });

  const submit = async () => {
    if (loading) return;

    if (!form.title.trim()) {
      toast.error("Course title is required");
      return;
    }

    if (Number(form.offerPrice) > Number(form.coursePrice)) {
      toast.error("Offer price cannot be greater than course price");
      return;
    }

    setLoading(true);

    try {
      // ❗ remove image before JSON submit
      const { courseImg, ...formWithoutImage } = form;

      const res = await fetch("/api/admin/courses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formWithoutImage),
      });

      if (!res.ok) throw new Error("Create failed");

      const data = await res.json();

      // 🖼️ upload image AFTER course created
      if (courseImg) {
        const fd = new FormData();
        fd.append("courseImg", courseImg);
        fd.append("courseId", data.course.courseId);

        await fetch("/api/admin/courses/upload-img/upload-image", {
          method: "POST",
          body: fd,
        });
      }

      toast.success("Course created successfully 🚀");
      refresh();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create course ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="row g-4">
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

        {/* <div className="col-md-6">
          <label>Lectures</label>
          <input
            type="number"
            className={styles["form-control"]}
            value={form.lectures}
            onChange={(e) =>
              setForm({ ...form, lectures: e.target.value })
            }
          />
        </div> */}

        <div>
          <label>Course Image</label>
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
              disabled={!form.courseImg}
            >
              Preview
            </button>
          </div>
        </div>

        {/* 🖼️ Preview */}
        {showPreview && form.courseImg && (
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
                onClick={() => setShowPreview(false)}
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
                src={URL.createObjectURL(form.courseImg)}
                alt="Thumbnail Preview"
                style={{ width: "220px", borderRadius: "6px" }}
              />
            </div>
          </div>
        )}

        <div className="col-md-12">
          <label>Description</label>
          <textarea
            rows={3}
            className={styles["form-control"]}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

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
              Publish Course
            </label>
          </div>
        </div>

      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          className={styles["vr-btn"]}
          onClick={close}
        >
          Cancel
        </button>

        <button
          className={`${styles["vr-btn"]} ${styles["vr-btn-primary"]}`}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </div>
    </>
  );
}