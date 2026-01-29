"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const QuizAttempts = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await axios.get(
          "/api/dashboard/student/quiz-attempts"
        );
        setAttempts(res.data);
      } catch (error) {
        console.error("Failed to load quiz attempts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">My Quiz Attempts</h4>
        </div>

        <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
          <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: "8px" }}>
            <table className="rbt-table table table-borderless">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Qus</th>
                  <th>TM</th>
                  <th>CA</th>
                  <th>Score</th>
                  <th>Result</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Loading quiz attempts...
                    </td>
                  </tr>
                )}

                {!loading && attempts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No quiz attempts found
                    </td>
                  </tr>
                )}

                {!loading &&
                  attempts.map((a) => (
                    <tr key={a._id}>
                      <th>
                        <p className="b3 mb--5">
                          {new Date(a.createdAt).toDateString()}
                        </p>
                        <span className="h6 mb--5">
                          {a.courseTitle}
                        </span>
                        <p className="small text-muted mb--0">
                          {a.quizTitle}
                        </p>

                      </th>

                      <td>{a.totalQuestions}</td>
                      <td>{a.totalMarks}</td>
                      <td>{a.correctAnswers}</td>
                      <td>{a.score}%</td>
                      <td>
                        <span
                          className={`rbt-badge-5 ${a.result === "Pass"
                            ? "bg-color-success-opacity color-success"
                            : "bg-color-danger-opacity color-danger"
                            }`}
                        >
                          {a.result}
                        </span>
                      </td>

                      <td>
                        <Link
                          className="rbt-btn btn-xs bg-primary-opacity radius-round"
                          href={`/course-player/${a.courseId}/quiz`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempts;
