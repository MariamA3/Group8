import { useState } from "react";
import StudyHeader from "./StudyHeader";
import "./StudyForm.css";
import CreateStudyButton from "../Buttons/CreateStudyButton";
import CreateStudyPublish from "../Buttons/CreateStudyPublish";
import QuestionList from "./QuestionList";

export default function StudyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [questions, setQuestions] = useState([
    { questionText: "", feedbackType: "", artefacts: [] },
    { questionText: "", feedbackType: "", artefacts: [] },
    { questionText: "", feedbackType: "", artefacts: [] },
    { questionText: "", feedbackType: "", artefacts: [] },
    { questionText: "", feedbackType: "", artefacts: [] },
  ]);

  const researcherId = "6824a97710175a3a9e9bb9f4";

  const validateForm = () => {
    if (!title.trim()) {
      setError("Study title is required.");
      return false;
    }

    const hasValidQuestion = questions.some((q) => {
      if (!q.questionText.trim() || !q.feedbackType) return false;
      if (["comparison", "multiple-choice"].includes(q.feedbackType) || q.feedbackType.includes("slider")) {
        return q.artefacts.length > 0;
      }
      return true;
    });

    if (!hasValidQuestion) {
      setError("At least one complete question with artefact is required.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSaveOrPublishStudy = async (status) => {
    if (!validateForm()) return;

    const studyData = {
      researcher: researcherId,
      title,
      description,
      status,
    };

    try {
      const response = await fetch("/api/studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studyData),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Error saving study");
        return;
      }

      const studyId = result.savedStudy._id;

      for (const q of questions) {
        for (const artefact of q.artefacts) {
          const artefactData = {
            study: studyId,
            researcher: researcherId,
            title: q.questionText,
            description: "Artefact for question",
            fileUrl: artefact.url,
          };

          await fetch("/api/artefacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(artefactData),
          });
        }
      }

      alert(`Study ${status === "active" ? "published" : "saved as draft"}!`);
      // Optional: Reset form after success
      setTitle("");
      setDescription("");
      setQuestions([
        { questionText: "", feedbackType: "", artefacts: [] },
      ]);
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="studyFormWrapper">
      <div className="studyFormHeader">
        <h1 className="createStudyTitle">New Study</h1>
        <div className="buttonLine">
          <CreateStudyButton
            className="CreateStudyButton"
            onClick={() => handleSaveOrPublishStudy("draft")}
          />
          <CreateStudyPublish
            className="CreateStudyPublish"
            onClick={() => handleSaveOrPublishStudy("active")}
          />
        </div>
      </div>


      <StudyHeader
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
     {error && <div className="errorMessage">{error}</div>}

     
      <div className="QuestionListWrapper">
        <QuestionList questions={questions} setQuestions={setQuestions} />
      </div>
    </div>
  );
}