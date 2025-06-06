import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudyHeader from "./StudyHeader";
import StudyQuestion from "./StudyQuestion";
import StudyNavigation from "./StudyNavigation";
import Demographics from "../../pages/DemographicsPage";
import { getStudyById, submitResponses } from "../../services/studyService";

import "./TakeStudy.css";

export default function TakeStudy() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [participantId, setParticipantId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [demographicsDone, setDemographicsDone] = useState(false);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const data = await getStudyById(id);
        setStudy(data);
      } catch (err) {
        console.error("Error loading study:", err);
      }
    };

    fetchStudy();

    const existing = sessionStorage.getItem("participantId");
    if (existing) {
      setParticipantId(existing);
    } else {
      const newId = crypto.randomUUID();
      sessionStorage.setItem("participantId", newId);
      setParticipantId(newId);
    }
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
    try {
      const answers = Object.values(responses);
      await submitResponses(study._id, answers);
      setSubmitted(true); 
    } catch (error) {
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && !demographicsDone) {
    return <Demographics onComplete={() => setDemographicsDone(true)} />;
  }

  if (submitted && demographicsDone) {
    return <p>Thank you for your response!</p>;
  }

  const question = study.questions[currentIndex];
  const answer = responses[currentIndex]?.answer || "";

  return (
    <div style={{ maxWidth: "50%", margin: "0 auto", padding: "2rem" }}>
      <StudyHeader
        title={study.title}
        participantId={participantId}
        currentIndex={currentIndex}
        total={study.questions.length}
      />
      <StudyQuestion
        question={question}
        answer={answer}
        onAnswer={handleAnswer}
      />
      <StudyNavigation
        currentIndex={currentIndex}
        total={study.questions.length}
        onBack={() => setCurrentIndex((i) => i - 1)}
        onNext={() => setCurrentIndex((i) => i + 1)}
        onSubmit={handleSubmit}
        canProceed={!!responses[currentIndex]}
        submitted={submitted}
      />
      {}
    </div>
  );
}
