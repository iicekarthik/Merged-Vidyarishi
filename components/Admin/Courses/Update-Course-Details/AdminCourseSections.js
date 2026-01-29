"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminCourseSections({ courseId }) {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [contentType, setContentType] = useState("sections"); // "sections" | "quizOnly"
    const [quiz, setQuiz] = useState({
        questions: [],
    });


    useEffect(() => {
        if (!courseId) return;

        const fetchSections = async () => {
            try {
                const res = await fetch(
                    `/api/course-content/get-by-courseId?courseId=${courseId}`
                );
                const data = await res.json();

                if (!data.success) throw new Error();

                setSections(data.sections || []);
                setContentType(data.contentType || "sections");

                // ✅ NORMALIZE QUIZ DATA
                const normalizedQuiz = (data.quiz?.questions || []).map((q, index) => ({
                    id: q.id || `q${Date.now()}${index}`,
                    question: q.question || "",
                    options: Array.isArray(q.options) && q.options.length === 4
                        ? q.options
                        : ["", "", "", ""],
                    correctAnswer:
                        typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
                    explanation: q.explanation || "",
                }));

                setQuiz({ questions: normalizedQuiz });


            } catch (err) {
                toast.error("Failed to load sections ❌");
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, [courseId]);


    const addSection = () => {
        setSections([
            ...sections,
            {
                sectionId: `s${Date.now()}`,
                title: "",
                order: sections.length + 1,
                videos: [],
            },
        ]);
    };

    const removeSection = (index) => {
        const updated = sections
            .filter((_, i) => i !== index)
            .map((s, i) => ({ ...s, order: i + 1 }));

        setSections(updated);
    };

    const addVideo = (sectionIndex) => {
        const updated = [...sections];
        updated[sectionIndex].videos.push({
            videoId: `v${Date.now()}`,
            title: "",
            videoUrl: "",
            duration: "",
            order: updated[sectionIndex].videos.length + 1,
        });
        setSections(updated);
    };

    const removeVideo = (sectionIndex, videoIndex) => {
        const updated = [...sections];
        updated[sectionIndex].videos = updated[sectionIndex].videos
            .filter((_, i) => i !== videoIndex)
            .map((v, i) => ({ ...v, order: i + 1 }));

        setSections(updated);
    };

    const saveSections = async () => {
        const hasInvalidData = sections.some(
            (s) =>
                !s.title.trim() ||
                s.videos.some(
                    (v) => !v.title.trim() || !v.videoUrl.trim()
                )
        );

        if (hasInvalidData) {
            toast.error("Section title and video title/URL are required");
            return;
        }

        if (contentType === "sections") {
            const hasInvalidData = sections.some(
                (s) =>
                    !s.title.trim() ||
                    s.videos.some(
                        (v) => !v.title.trim() || !v.videoUrl.trim()
                    )
            );

            if (hasInvalidData) {
                toast.error("Section title and video title/URL are required");
                return;
            }
        }

        if (quiz.questions.length === 0) {
            toast.error("At least one quiz question is required");
            return;
        }

        const invalidCorrectAnswer = quiz.questions.some(
            q => q.correctAnswer < 0 || q.correctAnswer > 3
        );

        if (invalidCorrectAnswer) {
            toast.error("Please enter correct answer between 1 and 4");
            return;
        }


        try {
            setSaving(true);

            const res = await fetch("/api/admin/courses/save", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseId,
                    sections: contentType === "sections" ? sections : [],
                    contentType,
                    quiz
                }),

            });

            if (!res.ok) {
                throw new Error("Save failed");
            }

            toast.success("Sections & videos saved ✅");
        } catch (err) {
            console.error("Save sections error:", err);
            toast.error("Save failed ❌");
        } finally {
            setSaving(false);
        }
    };


    if (loading) {
        return <p>Loading sections...</p>;
    }

    return (

        <div className="card p-4"
            style={{
                maxHeight: "55vh",        // 🔥 controls scroll height
                overflowY: "auto",
                paddingRight: "8px",
            }}
        >
            <h4 className="mb-3">Course Sections & Videos</h4>

            <select
                className="form-select mb-3"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
            >
                <option value="sections">Sections + Videos + Quiz</option>
                <option value="quizOnly">Only Quiz</option>
            </select>

            {contentType === "sections" && (
                <>
                    {sections.map((section, sIndex) => (
                        <div key={section.sectionId} className="border p-3 mb-3 rounded">
                            <div className="d-flex gap-2 mb-2">
                                <input
                                    className="form-control"
                                    placeholder="Section title"
                                    value={section.title}
                                    onChange={(e) => {
                                        const updated = [...sections];
                                        updated[sIndex].title = e.target.value;
                                        setSections(updated);
                                    }}
                                />
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeSection(sIndex)}
                                >
                                    ✕
                                </button>
                            </div>

                            {section.videos.map((video, vIndex) => (
                                <div key={video.videoId} className="row g-2 mb-2">
                                    <div className="col-md-4">
                                        <input
                                            className="form-control"
                                            placeholder="Video title"
                                            value={video.title}
                                            onChange={(e) => {
                                                const updated = [...sections];
                                                updated[sIndex].videos[vIndex].title = e.target.value;
                                                setSections(updated);
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <input
                                            className="form-control"
                                            placeholder="YouTube URL"
                                            value={video.videoUrl}
                                            onChange={(e) => {
                                                const updated = [...sections];
                                                updated[sIndex].videos[vIndex].videoUrl = e.target.value;
                                                setSections(updated);
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <input
                                            className="form-control"
                                            placeholder="Duration"
                                            value={video.duration}
                                            onChange={(e) => {
                                                const updated = [...sections];
                                                updated[sIndex].videos[vIndex].duration = e.target.value;
                                                setSections(updated);
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-outline-danger w-100"
                                            onClick={() => removeVideo(sIndex, vIndex)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => addVideo(sIndex)}
                            >
                                + Add Video
                            </button>
                        </div>
                    ))}

                </>
            )}

            {/* QUIZ UI – shows for BOTH modes */}
            <div className="border p-3 rounded mt-4">
                <h5 className="mb-3">
                    {contentType === "quizOnly" ? "Quiz Builder" : "Final Quiz"}
                </h5>

                {quiz.questions.map((q, qIndex) => (
                    <div key={q.id} className="border rounded p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong>Question {qIndex + 1}</strong>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                    const updated = [...quiz.questions];
                                    updated.splice(qIndex, 1);
                                    setQuiz({ questions: updated });
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <input
                            className="form-control mb-2"
                            placeholder="Enter question"
                            value={q.question}
                            onChange={(e) => {
                                const updated = [...quiz.questions];
                                updated[qIndex].question = e.target.value;
                                setQuiz({ questions: updated });
                            }}
                        />

                        {(q.options || ["", "", "", ""]).map((opt, oIndex) => (
                            <div key={oIndex} className="mb-2">
                                <input
                                    className="form-control"
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={opt}
                                    onChange={(e) => {
                                        const updated = [...quiz.questions];
                                        updated[qIndex].options[oIndex] = e.target.value;
                                        setQuiz({ questions: updated });
                                    }}
                                />
                            </div>
                        ))}

                        <div className="mt-3">
                            <label className="form-label fw-semibold">
                                Correct Answer
                            </label>

                            <select
                                className="form-select"
                                style={{
                                    height: "26px",
                                    padding: "2px 8px",
                                    fontSize: "13px",
                                    lineHeight: "20px",
                                }}
                                value={q.correctAnswer !== null ? q.correctAnswer : ""}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    const updated = [...quiz.questions];
                                    updated[qIndex].correctAnswer =
                                        value === "" ? null : Number(value);

                                    setQuiz({ questions: updated });
                                }}
                            >
                                <option value="">Select correct option</option>
                                <option value={0}>Option 1</option>
                                <option value={1}>Option 2</option>
                                <option value={2}>Option 3</option>
                                <option value={3}>Option 4</option>
                            </select>

                            <small className="text-muted">
                                Choose which option is correct
                            </small>
                        </div>

                        {/* <div className="mt-3">
                            <label className="form-label fw-semibold">
                                Correct Answer (Enter option number 1–4)
                            </label>

                            <input
                                type="number"
                                min={1}
                                max={4}
                                className="form-control"
                                placeholder="Example: 2"
                                value={q.correctAnswer + 1}
                                onChange={(e) => {
                                    const value = Number(e.target.value);

                                    if (value >= 1 && value <= 4) {
                                        const updated = [...quiz.questions];
                                        updated[qIndex].correctAnswer = value - 1; // convert to 0-based index
                                        setQuiz({ questions: updated });
                                    }
                                }}
                            />

                            <input
  type="number"
  min={1}
  max={4}
  className="form-control"
  placeholder="Example: 2"
  value={q.correctAnswer !== null ? q.correctAnswer + 1 : ""}
  onChange={(e) => {
    const raw = e.target.value;

    // Allow empty (user typing / clearing)
    if (raw === "") {
      const updated = [...quiz.questions];
      updated[qIndex].correctAnswer = null;
      setQuiz({ questions: updated });
      return;
    }

    const value = Number(raw);

    // Store only if number
    if (!Number.isNaN(value)) {
      const updated = [...quiz.questions];
      updated[qIndex].correctAnswer = value - 1; // temporary, validate later
      setQuiz({ questions: updated });
    }
  }}
  onBlur={(e) => {
    const value = Number(e.target.value);

    // Final validation on blur
    if (Number.isNaN(value) || value < 1 || value > 4) {
      toast.error("Correct answer must be between 1 and 4");

      const updated = [...quiz.questions];
      updated[qIndex].correctAnswer = null;
      setQuiz({ questions: updated });
    }
  }}
/>

                            <small className="text-muted">
                                Enter the option number which is correct
                            </small> 

                    </div> */}

                        <textarea
                            className="form-control mt-2"
                            placeholder="Answer explanation"
                            rows={2}
                            value={q.explanation}
                            onChange={(e) => {
                                const updated = [...quiz.questions];
                                updated[qIndex].explanation = e.target.value;
                                setQuiz({ questions: updated });
                            }}
                        />
                    </div>
                ))}

                <div className="d-flex gap-2 mt-3">
                    <button
                        className="btn btn-secondary"
                        onClick={() =>
                            setQuiz({
                                questions: [
                                    ...quiz.questions,
                                    {
                                        id: `q${Date.now()}`,
                                        question: "",
                                        options: ["", "", "", ""],
                                        correctAnswer: 0,
                                        explanation: "",
                                    },
                                ],
                            })
                        }
                    >
                        + Add Question
                    </button>

                    {/* Save button for quiz-only */}
                    {contentType === "quizOnly" && (
                        <button
                            className="btn btn-success"
                            disabled={saving}
                            onClick={saveSections}
                        >
                            {saving ? "Saving..." : "Save Quiz"}
                        </button>
                    )}
                </div>
            </div>

            {
                contentType === "sections" && (
                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-secondary" onClick={addSection}>
                            + Add Section
                        </button>

                        <button
                            className="btn btn-success"
                            disabled={saving}
                            onClick={saveSections}
                        >
                            {saving ? "Saving..." : "Save Curriculum"}
                        </button>
                    </div>
                )
            }
        </div >
    );
}
