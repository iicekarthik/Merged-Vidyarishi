import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/vidyarishiapi/lib/axios";
import { toast } from "react-toastify";
import PageHead from "@/pages/Head";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import BackToTop from "@/pages/backToTop";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";

const QuizPage = () => {
    const router = useRouter();
    const { courseId } = router.query;

    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [reattemptMode, setReattemptMode] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [previousAttempt, setPreviousAttempt] = useState(null);

    // useEffect(() => {
    //     if (!courseId) return;

    //     const loadQuiz = async () => {
    //         try {
    //             const res = await api.get(
    //                 `/api/course-content/get-by-courseId?courseId=${courseId}`
    //             );

    //             if (!res.data.quiz?.questions?.length) {
    //                 toast.error("No quiz found");
    //                 router.replace(`/course-player/${courseId}`);
    //                 return;
    //             }

    //             setQuiz(res.data.quiz);
    //         } catch (err) {
    //             toast.error("Failed to load quiz");
    //             router.replace(`/course-player/${courseId}`);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadQuiz();
    // }, [courseId]);

    // const loadQuiz = async () => {
    //     try {
    //         const [contentRes, enrollRes] = await Promise.all([
    //             api.get(`/api/course-content/get-by-courseId?courseId=${courseId}`),
    //             api.get("/api/dashboard/student/enrolled-courses"),
    //         ]);

    //         const enrolled = enrollRes.data.find(
    //             (c) => c.courseId === Number(courseId)
    //         );

    //         setQuiz(contentRes.data.quiz);

    //         if (enrolled?.quizPassed) {
    //             setIsCompleted(true);
    //         }
    //     } catch {
    //         toast.error("Failed to load quiz");
    //         router.replace(`/course-player/${courseId}`);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const loadQuiz = async () => {
        try {
            const [contentRes, enrollRes, attemptRes] = await Promise.all([
                api.get(`/api/course-content/get-by-courseId?courseId=${courseId}`),
                api.get("/api/dashboard/student/enrolled-courses"),
                api.get(`/api/dashboard/student/lms/quiz-attempt/latest?courseId=${courseId}`),
            ]);

            setQuiz(contentRes.data.quiz);

            // 🔹 If user already attempted
            if (attemptRes.data) {
                setPreviousAttempt(attemptRes.data);
                setSubmitted(true);

                // Prefill answers (IMPORTANT)
                const prefilled = {};
                contentRes.data.quiz.questions.forEach((q) => {
                    prefilled[q.id] = attemptRes.data.selectedAnswers?.[q.id];
                });

                setAnswers(prefilled);

                setResult({
                    total: attemptRes.data.totalQuestions,
                    correct: attemptRes.data.correctAnswers,
                    wrong:
                        attemptRes.data.totalQuestions -
                        attemptRes.data.correctAnswers,
                    percentage: attemptRes.data.score,
                });
            }
        } catch {
            toast.error("Failed to load quiz");
            router.replace(`/course-player/${courseId}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!courseId) return;
        loadQuiz();
    }, [courseId]);

    // const handleSubmitQuiz = async () => {
    //     if (Object.keys(answers).length !== quiz.questions.length) {
    //         toast.error("Please answer all questions");
    //         return;
    //     }

    //     let score = 0;
    //     quiz.questions.forEach((q) => {
    //         if (answers[q.id] === q.correctAnswer) score++;
    //     });

    //     const percentage = Math.round(
    //         (score / quiz.questions.length) * 100
    //     );

    //     const passed = percentage >= 60;

    //     setResult({ score, percentage, passed });

    //     if (isCompleted && !reattemptMode) return;

    //     if (!passed) {
    //         toast.error("Quiz failed. Try again.");
    //         return;
    //     }

    //     await api.post(
    //         "/api/dashboard/student/lms/progress/complete-quiz",
    //         {
    //             courseId: Number(courseId),
    //             quizScore: percentage,
    //         }
    //     );

    //     toast.success("Quiz passed 🎉 Course completed");

    //     // ✅ Update UI immediately
    //     setIsCompleted(true);
    //     setReattemptMode(false);

    //     // ⏳ Small delay so backend state is guaranteed updated
    //     // setTimeout(() => {
    //     //     router.replace(`/course-player/${courseId}`);
    //     // }, 800);

    //     //     await api.post(
    //     //         "/api/dashboard/student/lms/progress/complete-quiz",
    //     //         {
    //     //             courseId: Number(courseId),
    //     //             quizScore: percentage,
    //     //         }
    //     //     );

    //     //     toast.success("Quiz passed 🎉 Course completed");

    //     //     router.replace(`/course-player/${courseId}`);
    // };

    const handleSubmitQuiz = async () => {
        if (Object.keys(answers).length !== quiz.questions.length) {
            toast.error("Please answer all questions");
            return;
        }

        let correct = 0;
        let wrong = 0;

        quiz.questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correct++;
            } else {
                wrong++;
            }
        });

        const percentage = Math.round(
            (correct / quiz.questions.length) * 100
        );

        // ✅ Show result immediately
        setResult({
            total: quiz.questions.length,
            correct,
            wrong,
            percentage,
        });

        // ✅ Send result to backend (NO restriction)
        // await api.post(
        //     "/api/dashboard/student/lms/progress/complete-quiz",
        //     {
        //         courseId: Number(courseId),
        //         quizScore: percentage,
        //     }
        // );
        await api.post(
            "/api/dashboard/student/lms/progress/complete-quiz",
            {
                courseId: Number(courseId),
                quizScore: percentage,
                totalQuestions: quiz.questions.length,
                correctAnswers: correct,
                selectedAnswers: answers, // ✅ ADD THIS
            }
        );

        setSubmitted(true);
        setReattemptMode(false);

        toast.success("Quiz submitted successfully");
    };

    if (loading) return <p>Loading quiz...</p>;

    return (
        <>
            <PageHead title="Final Quiz" />


            <MobileMenu />
            <HeaderStyleTen headerSticky="" headerType={true} />

            <div className="container pt--40">
                <h3 className="mb--30">Final Quiz</h3>

                {quiz.questions.map((q, qIndex) => (
                    <div key={q.id} className="mb--30">
                        <p className="fw-semibold">
                            {qIndex + 1}. {q.question}
                        </p>

                        {q.options.map((opt, oIndex) => (
                            <label
                                className="d-block mb--5"
                                style={{
                                    cursor: submitted ? "default" : "pointer",
                                    color:
                                        submitted && answers[q.id] === oIndex
                                            ? answers[q.id] === q.correctAnswer
                                                ? "green"
                                                : "red"
                                            : "inherit",
                                    fontWeight:
                                        submitted && answers[q.id] === oIndex ? "600" : "normal",
                                }}
                            >

                                <input
                                    type="radio"
                                    disabled={submitted && !reattemptMode}
                                    checked={answers[q.id] === oIndex}
                                    onChange={() =>
                                        setAnswers({ ...answers, [q.id]: oIndex })
                                    }
                                    style={{
                                        opacity: 1,
                                        position: "static",
                                        marginRight: "8px",
                                        transform: "scale(1.1)",
                                        cursor: submitted ? "default" : "pointer",
                                        height: "15px"
                                    }}
                                />

                                {/* {isCompleted && !reattemptMode && q.correctAnswer === oIndex && (
                                    <span
                                        style={{
                                            marginLeft: "6px",
                                            fontSize: "12px",
                                            color: "#2f57ef",
                                            fontWeight: 500,
                                        }}
                                    >
                                        ✓ Correct answer
                                    </span>
                                )} */}
                                {" "}
                                {opt}
                            </label>
                        ))}

                        {/* REVIEW SECTION (ONCE PER QUESTION) */}
                        {submitted && (
                            <div className="mt--15 p--12 border rounded bg-light">
                                <p className="mb--5">
                                    <strong>Your Answer:</strong>{" "}
                                    <span
                                        style={{
                                            color:
                                                answers[q.id] === q.correctAnswer
                                                    ? "green"
                                                    : "red",
                                        }}
                                    >
                                        {q.options[answers[q.id]]}
                                    </span>
                                </p>

                                <p className="mb--5">
                                    <strong>Correct Answer:</strong>{" "}
                                    <span style={{ color: "green" }}>
                                        {q.options[q.correctAnswer]}
                                    </span>
                                </p>

                                {q.explanation && (
                                    <p className="mb--0">
                                        <strong>Explanation:</strong> {q.explanation}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {/* ACTION BUTTON */}
                <div className="d-flex flex-wrap gap-3">
                    {!submitted ? (
                        <button
                            className="rbt-btn btn-gradient mt--20 mb--10"
                            onClick={handleSubmitQuiz}
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <button
                            className="rbt-btn btn-border mt--20 mb--10"
                            onClick={() => {
                                setReattemptMode(true);
                                setAnswers({});
                                setSubmitted(false);
                                setResult(null);
                                toast.info("You can now reattempt the quiz");
                            }}

                        >
                            🔁 Reattempt Quiz
                        </button>
                    )}

                    {submitted && !reattemptMode && (
                        <div className="mt--20 mb--10">
                            <button
                                className="rbt-btn btn-border"
                                onClick={() =>
                                    window.open(
                                        `/api/dashboard/student/lms/certificate/generate?courseId=${courseId}`,
                                        "_blank"
                                    )
                                }
                            >
                                🎓 Download Certificate
                            </button>
                        </div>
                    )}

                </div>

                {/* {result && (
                    <div className="mt--20">
                        <strong>
                            Result: {result.percentage}%{" "}
                            {result.passed ? "✅ Passed" : "❌ Failed"}
                        </strong>
                    </div>
                )} */}
                {result && (
                    <div className="mt--30 p--20 border rounded">
                        <h5>Final Result</h5>
                        <p>Total Questions: <strong>{result.total}</strong></p>
                        <p>Correct Answers: <strong style={{ color: "green" }}>{result.correct}</strong></p>
                        <p>Wrong Answers: <strong style={{ color: "red" }}>{result.wrong}</strong></p>
                        <p>Score: <strong>{result.percentage}%</strong></p>
                    </div>
                )}
            </div>

            <BackToTop />
            <Separator />
            <FooterThree />
        </>

    );
};

export default QuizPage;
