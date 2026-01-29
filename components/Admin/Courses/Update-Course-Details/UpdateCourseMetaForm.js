"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../coursebtn.module.css";

export default function UpdateCourseMetaForm({
    courseId,
    meta = {},
    courseOverview = [],
    refresh,
}) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        eligibility: meta.eligibility || "",
        averageSalary: meta.averageSalary || "",
        emiAvailable: meta.emiAvailable || false,

        hero: {
            subtitle: meta.hero?.subtitle || "",
            placement: meta.hero?.placement || "",
            // bannerImage: meta.hero?.bannerImage || "",
        },

        careerScope: {
            title: meta.careerScope?.title || "",
            description: meta.careerScope?.description || "",
            roles: meta.careerScope?.roles || [],
        },

        faq: {
            title: meta.faq?.title || "Frequently Asked Questions",
            items: meta.faq?.items || [],
        },

        courseOverview: courseOverview.length
            ? courseOverview
            : [
                {
                    title: "What You Will Learn",
                    desc: "",
                    descTwo: "",
                    overviewList: [],
                },
            ],
    });

    /* ---------------- FAQ HELPERS ---------------- */

    const addFaq = () => {
        setForm({
            ...form,
            faq: {
                ...form.faq,
                items: [...form.faq.items, { q: "", a: "" }],
            },
        });
    };

    const removeFaq = (index) => {
        const updated = form.faq.items.filter((_, i) => i !== index);
        setForm({ ...form, faq: { ...form.faq, items: updated } });
    };

    /* -------------- OVERVIEW BULLET HELPERS -------------- */

    const addOverviewBullet = () => {
        const updated = [...form.courseOverview];
        updated[0].overviewList.push({ listItem: "" });
        setForm({ ...form, courseOverview: updated });
    };

    const removeOverviewBullet = (index) => {
        const updated = [...form.courseOverview];
        updated[0].overviewList = updated[0].overviewList.filter(
            (_, i) => i !== index
        );
        setForm({ ...form, courseOverview: updated });
    };

    const [bannerFile, setBannerFile] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [existingBanner, setExistingBanner] = useState(
        meta.hero?.bannerImage?.url || ""
    );
    const [brochureFile, setBrochureFile] = useState(null);
    const [existingBrochure, setExistingBrochure] = useState(
        meta.brochure?.url || ""
    );
    const [showBrochurePreview, setShowBrochurePreview] = useState(false);


    /* ---------------- SAVE ---------------- */

    const saveMeta = async () => {
        try {
            setLoading(true);

            // 1️⃣ Save meta + overview FIRST
            const res = await fetch("/api/admin/courses/update-meta", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseId,
                    meta: {
                        eligibility: form.eligibility,
                        averageSalary: form.averageSalary,
                        emiAvailable: form.emiAvailable,
                        hero: {
                            subtitle: form.hero.subtitle,
                            placement: form.hero.placement,
                        },
                        careerScope: form.careerScope,
                        faq: form.faq,
                    },
                    courseOverview: form.courseOverview,
                }),
            });

            // ❗ Always check response FIRST
            if (!res.ok) throw new Error("Meta update failed");

            // 2️⃣ Upload banner ONLY if meta saved
            if (bannerFile) {
                const fd = new FormData();
                fd.append("banner", bannerFile);
                fd.append("courseId", courseId);

                const bannerRes = await fetch(
                    "/api/admin/courses/upload-img/upload-banner",
                    {
                        method: "POST",
                        body: fd,
                    }
                );

                if (!bannerRes.ok) {
                    throw new Error("Banner upload failed");
                }
            }

            // 3️⃣ Upload brochure ONLY if selected
            if (brochureFile) {
                const fd = new FormData();
                fd.append("brochure", brochureFile);
                fd.append("courseId", courseId);

                const brochureRes = await fetch(
                    "/api/admin/courses/upload-doc/upload-brochure",
                    {
                        method: "POST",
                        body: fd,
                    }
                );

                if (!brochureRes.ok) {
                    throw new Error("Brochure upload failed");
                }
            }

            toast.success("Meta & overview saved ✅");
            refresh?.();
        } catch (err) {
            console.error(err);
            toast.error("Failed to save meta ❌");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{ maxHeight: "55vh", overflowY: "auto", paddingRight: "8px" }}>
            {/* Eligibility */}
            <label>Eligibility</label>
            <input
                className={styles["form-control"]}
                value={form.eligibility}
                onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
            />

            <label className="mt-3">Average Salary</label>
            <input
                className={styles["form-control"]}
                value={form.averageSalary}
                onChange={(e) => setForm({ ...form, averageSalary: e.target.value })}
            />

            {/* EMI Available */}
            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="emiAvailable"
                    checked={form.emiAvailable}
                    onChange={(e) =>
                        setForm({ ...form, emiAvailable: e.target.checked })
                    }
                />
                <label className="form-check-label" htmlFor="emiAvailable">
                    EMI Available
                </label>
            </div>


            <h6 className="mt-4">Career Scope</h6>

            {/* Title */}
            <input
                className={styles["form-control"]}
                placeholder="Career Scope Title (e.g. Career Opportunities)"
                value={form.careerScope.title}
                onChange={(e) =>
                    setForm({
                        ...form,
                        careerScope: {
                            ...form.careerScope,
                            title: e.target.value,
                        },
                    })
                }
            />

            {/* Description */}
            <textarea
                className={`${styles["form-control"]} mt-2`}
                placeholder="Career Scope Description"
                value={form.careerScope.description}
                onChange={(e) =>
                    setForm({
                        ...form,
                        careerScope: {
                            ...form.careerScope,
                            description: e.target.value,
                        },
                    })
                }
            />

            <h6 className="mt-3">Career Roles</h6>

            {form.careerScope.roles.map((role, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                    <input
                        className={styles["form-control"]}
                        placeholder="Career Role (e.g. Investment Banking Analyst)"
                        value={role}
                        onChange={(e) => {
                            const updated = [...form.careerScope.roles];
                            updated[index] = e.target.value;
                            setForm({
                                ...form,
                                careerScope: {
                                    ...form.careerScope,
                                    roles: updated,
                                },
                            });
                        }}
                    />

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                            const updated = form.careerScope.roles.filter((_, i) => i !== index);
                            setForm({
                                ...form,
                                careerScope: {
                                    ...form.careerScope,
                                    roles: updated,
                                },
                            });
                        }}
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                className="btn btn-outline-primary btn-sm"
                onClick={() =>
                    setForm({
                        ...form,
                        careerScope: {
                            ...form.careerScope,
                            roles: [...form.careerScope.roles, ""],
                        },
                    })
                }
            >
                + Add Career Role
            </button>

            {/* <h6 className="mt-4">Sample Certificate</h6>

        <div className="form-check mb-2">
            <input
                type="checkbox"
                className="form-check-input"
                id="certificateEnabled"
                checked={form.careerScope.certificateSample.enabled}
                onChange={(e) =>
                    setForm({
                        ...form,
                        careerScope: {
                            ...form.careerScope,
                            certificateSample: {
                                ...form.careerScope.certificateSample,
                                enabled: e.target.checked,
                            },
                        },
                    })
                }
            />
            <label className="form-check-label" htmlFor="certificateEnabled">
                Show Sample Certificate
            </label>
        </div>

        <input
            className={styles["form-control"]}
            placeholder="Certificate Label"
            value={form.careerScope.certificateSample.label}
            onChange={(e) =>
                setForm({
                    ...form,
                    careerScope: {
                        ...form.careerScope,
                        certificateSample: {
                            ...form.careerScope.certificateSample,
                            label: e.target.value,
                        },
                    },
                })
            }
            disabled={!form.careerScope.certificateSample.enabled}
        /> */}

            {/* Hero */}
            <h6 className="mt-4">Hero Section</h6>
            <input
                className={styles["form-control"]}
                placeholder="Subtitle"
                value={form.hero.subtitle}
                onChange={(e) =>
                    setForm({
                        ...form,
                        hero: { ...form.hero, subtitle: e.target.value },
                    })
                }
            />

            <input
                className={`${styles["form-control"]} mt-2`}
                placeholder="Placement Text"
                value={form.hero.placement}
                onChange={(e) =>
                    setForm({
                        ...form,
                        hero: { ...form.hero, placement: e.target.value },
                    })
                }
            />

            {/* BANNER + BROCHURE ROW */}
            <div className="d-flex gap-4 mt-3 align-items-start">

                {/* BANNER IMAGE */}
                <div style={{ flex: 1 }}>

                    <label className="mt-3">Banner Image</label>

                    <div className="d-flex gap-2 align-items-center">
                        <input
                            type="file"
                            accept="image/*"
                            className={styles["form-control"]}
                            onChange={(e) => {
                                setBannerFile(e.target.files[0]);
                                setShowPreview(false); // reset preview on new file
                            }}
                        // onChange={(e) => setBannerFile(e.target.files[0])}
                        />

                        <button
                            type="button"
                            className={`${styles["vr-btn"]} ${styles["vr-btn-secondary"]}`}
                            onClick={() => setShowPreview(true)}
                            disabled={!bannerFile && !existingBanner}
                        >
                            Preview
                        </button>
                    </div>
                    {(bannerFile || existingBanner) && (showPreview || existingBanner) && (
                        <div className="mt-3">
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
                                {/* ❌ CLOSE PREVIEW */}
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
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                    title="Close Preview"
                                >
                                    ✕
                                </button>

                                <img
                                    src={
                                        bannerFile
                                            ? URL.createObjectURL(bannerFile)
                                            : existingBanner
                                    }
                                    alt="Banner Preview"
                                    style={{ width: "320px", borderRadius: "6px" }}
                                />
                            </div>
                        </div>
                    )}


                </div>

                {/* COURSE BROCHURE */}
                <div style={{ flex: 1 }}>
                    <label>Course Brochure (PDF / Image)</label>


                    <div className="d-flex gap-2 align-items-center">
                        <input
                            type="file"
                            accept="application/pdf,image/*"
                            className={styles["form-control"]}
                            // onChange={(e) => setBrochureFile(e.target.files[0])}
                            onChange={(e) => {
                                setBrochureFile(e.target.files[0]);
                                setShowBrochurePreview(false);
                            }}
                        />

                        <button
                            type="button"
                            className={`${styles["vr-btn"]} ${styles["vr-btn-secondary"]}`}
                            onClick={() => setShowBrochurePreview(true)}
                            disabled={!brochureFile && !existingBrochure}
                        >
                            Preview
                        </button>
                    </div>

                    {(brochureFile || existingBrochure) && (showBrochurePreview || existingBrochure) && (
                        <div className="mt-3">
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
                                {/* ❌ CLOSE PREVIEW */}
                                <button
                                    type="button"
                                    onClick={() => setShowBrochurePreview(false)}
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
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ✕
                                </button>

                                {/* 🟡 EXISTING BROCHURE (NO PREVIEW) */}
                                {!brochureFile && existingBrochure && (
                                    <div
                                        style={{
                                            width: "320px",
                                            padding: "24px",
                                            textAlign: "center",
                                            fontWeight: "600",
                                            color: "#555",
                                        }}
                                    >
                                        📄 Brochure already exists
                                    </div>
                                )}

                                {/* 🟢 NEW UPLOAD – IMAGE */}
                                {brochureFile?.type?.startsWith("image") && (
                                    <img
                                        src={URL.createObjectURL(brochureFile)}
                                        alt="Brochure Preview"
                                        style={{ width: "320px", borderRadius: "6px" }}
                                    />
                                )}

                                {/* 🟢 NEW UPLOAD – PDF */}
                                {brochureFile?.type === "application/pdf" && (
                                    <iframe
                                        src={URL.createObjectURL(brochureFile)}
                                        width="320"
                                        height="420"
                                        style={{ borderRadius: "6px", border: "1px solid #ddd" }}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                </div>

            </div>

            {/* COURSE OVERVIEW */}
            <h6 className="mt-4">Course Overview</h6>

            {/* Title */}
            <input
                className={styles["form-control"]}
                placeholder="Overview Title"
                value={form.courseOverview[0].title}
                onChange={(e) => {
                    const updated = [...form.courseOverview];
                    updated[0].title = e.target.value;
                    setForm({ ...form, courseOverview: updated });
                }}
            />

            {/* Description 1 */}
            <textarea
                className={`${styles["form-control"]} mt-2`}
                placeholder="Description (Paragraph 1)"
                value={form.courseOverview[0].desc}
                onChange={(e) => {
                    const updated = [...form.courseOverview];
                    updated[0].desc = e.target.value;
                    setForm({ ...form, courseOverview: updated });
                }}
            />

            {/* Description 2 */}
            <textarea
                className={`${styles["form-control"]} mt-2`}
                placeholder="Description (Paragraph 2)"
                value={form.courseOverview[0].descTwo}
                onChange={(e) => {
                    const updated = [...form.courseOverview];
                    updated[0].descTwo = e.target.value;
                    setForm({ ...form, courseOverview: updated });
                }}
            />

            {/* Overview Bullet List */}
            <h6 className="mt-3">Overview Points</h6>

            {form.courseOverview[0].overviewList.map((item, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                    <input
                        className={styles["form-control"]}
                        placeholder="Overview point"
                        value={item.listItem}
                        onChange={(e) => {
                            const updated = [...form.courseOverview];
                            updated[0].overviewList[index].listItem = e.target.value;
                            setForm({ ...form, courseOverview: updated });
                        }}
                    />
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                            const updated = [...form.courseOverview];
                            updated[0].overviewList = updated[0].overviewList.filter(
                                (_, i) => i !== index
                            );
                            setForm({ ...form, courseOverview: updated });
                        }}
                    >
                        ✕
                    </button>
                </div>
            ))}

            <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                    const updated = [...form.courseOverview];
                    updated[0].overviewList.push({ listItem: "" });
                    setForm({ ...form, courseOverview: updated });
                }}
            >
                + Add Overview Point
            </button>


            {/* FAQ */}
            <h6 className="mt-4">FAQs</h6>

            {form.faq.items.map((faq, index) => (
                <div key={index} className="border p-2 rounded mb-2">
                    <input
                        className={styles["form-control"]}
                        placeholder="Question"
                        value={faq.q}
                        onChange={(e) => {
                            const updated = [...form.faq.items];
                            updated[index].q = e.target.value;
                            setForm({
                                ...form,
                                faq: { ...form.faq, items: updated },
                            });
                        }}
                    />

                    <textarea
                        className={`${styles["form-control"]} mt-2`}
                        placeholder="Answer"
                        value={faq.a}
                        onChange={(e) => {
                            const updated = [...form.faq.items];
                            updated[index].a = e.target.value;
                            setForm({
                                ...form,
                                faq: { ...form.faq, items: updated },
                            });
                        }}
                    />

                    <button
                        className="btn btn-outline-danger btn-sm mt-2"
                        onClick={() => removeFaq(index)}
                    >
                        Remove FAQ
                    </button>
                </div>
            ))}

            <button
                className="btn btn-outline-primary btn-sm"
                onClick={addFaq}
            >
                + Add FAQ
            </button>

            {/* SAVE */}
            <div className="d-flex justify-content-end mt-4">
                <button
                    className={`${styles["vr-btn"]} ${styles["vr-btn-primary"]}`}
                    onClick={saveMeta}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Meta & Overview"}
                </button>
            </div>
        </div>
    );
}
