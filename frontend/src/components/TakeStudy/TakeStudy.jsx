import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TakeStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchStudy = async () => {
      const res = await fetch(`/api/studies/${id}`);
      const data = await res.json();
      setStudy(data.study);
    };

    fetchStudy();
  }, [id]);

  const handleAnswer = (value) => {
    const question = study.questions[currentIndex];
    setResponses((prev) => ({
      ...prev,
      [currentIndex]: {
        questionText: question.questionText,
        feedbackType: question.feedbackType,
        answer: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      studyId: study._id,
      answers: Object.values(responses),
    };

    const res = await fetch("/api/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSubmitted(true);
    }

    setSubmitting(false);
  };

  if (!study) return <p>Loading...</p>;
  if (submitted) return <p>Thank you for your responses!</p>;

  const question = study.questions[currentIndex];
  const answer = responses[currentIndex]?.answer || "";

  return (
    <div className="take-study-page">
      <h1>{study.title}</h1>
      <p>{study.description}</p>

      <div className="question-block">
        <h2>{question.questionText}</h2>

        {question.artefacts?.map((a, i) => (
          <img
            key={i}
            src={a.url}
            alt={`Artefact ${i + 1}`}
            style={{ width: "100%", maxWidth: "20rem", marginBottom: "1rem" }}
          />
        ))}

        {/* Input based on feedbackType */}
        {(() => {
          switch (question.feedbackType) {
            case "text-field":
              return (
                <textarea
                  value={answer}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Your response"
                />
              );
            case "percent-slider":
            case "range-slider":
            case "bullet-slider":
              return (
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={answer || 50}
                  onChange={(e) => handleAnswer(Number(e.target.value))}
                />
              );
            case "comparison":
              return (
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button onClick={() => handleAnswer("left")}>Left</button>
                  <button onClick={() => handleAnswer("right")}>Right</button>
                </div>
              );
            default:
              return <p>Unsupported question type</p>;
          }
        })()}
      </div>

      <div className="nav-controls">
        <button
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={currentIndex === 0}
        >
          Back
        </button>

        {currentIndex < study.questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            disabled={!responses[currentIndex]}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!responses[currentIndex] || submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
