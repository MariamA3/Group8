import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudyHeader from "./StudyHeader";
import "./StudyForm.css";
import CreateStudyButton from "../Buttons/CreateStudyButton";
import CreateStudyPublish from "../Buttons/CreateStudyPublish";
import QuestionList from "./QuestionList";
import { toast } from "react-hot-toast";

export default function StudyForm() {
  const [title, setTitle] = useState(
    () => localStorage.getItem("draft-title") || ""
  );
  const [description, setDescription] = useState(
    () => localStorage.getItem("draft-description") || ""
  );
  const [startDate, setStartDate] = useState(
    () => localStorage.getItem("draft-startDate") || ""
  );
  const [endDate, setEndDate] = useState(
    () => localStorage.getItem("draft-endDate") || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("draft-title", title);
      localStorage.setItem("draft-description", description);
      localStorage.setItem("draft-startDate", startDate);
      localStorage.setItem("draft-endDate", endDate);
      // every 15 seconds
    }, 15000); 
  // cleanup
    return () => clearInterval(interval); 
  }, [title, description, startDate, endDate]);
  

  const navigate = useNavigate();

  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("draft-questions");
    return saved
      ? JSON.parse(saved)
      : [
          { questionText: "", feedbackType: "", artefacts: [] },
          { questionText: "", feedbackType: "", artefacts: [] },
          { questionText: "", feedbackType: "", artefacts: [] },
          { questionText: "", feedbackType: "", artefacts: [] },
          { questionText: "", feedbackType: "", artefacts: [] },
        ];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("draft-questions", JSON.stringify(questions));
    }, 15000);

    return () => clearInterval(interval);
  }, [questions]);

  const researcherId = "6824a97710175a3a9e9bb9f4";

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Study title is required.");
      return false;
    }
  
    if (
      startDate &&
      endDate &&
      new Date(startDate) > new Date(endDate)
    ) {
      toast.error("End date must be after start date.");
      return false;
    }
  
    if (questions.length === 0) {
      toast.error("You must add at least one question before submitting.");
      return false;
    }
  
    const hasValidQuestion = questions.some((q) => {
      if (!q.questionText.trim() || !q.feedbackType) return false;
      if (
        ["comparison", "multiple-choice"].includes(q.feedbackType) ||
        q.feedbackType.includes("slider")
      ) {
        return q.artefacts.length > 0;
      }
      return true;
    });
  
    if (!hasValidQuestion) {
      toast.error("At least one complete question with artefact is required.");
      return false;
    }
  
    return true;
  };
  
  const handleSaveOrPublishStudy = async (status) => {
    if (!validateForm()) return;

    setLoading(true);
    const loadingToast = toast.loading("Saving your study...");

    const studyData = {
      researcher: researcherId,
      title,
      description,
      startDate,
      endDate,
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
        const errorMessage =
          result.message || result.errors?.[0] || "Something went wrong";
        toast.error(errorMessage);
        setLoading(false);
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

          try {
            const res = await fetch("/api/artefacts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(artefactData),
            });

            const result = await res.json();
            if (!res.ok) {
              throw new Error(result.message || "Failed to save artefact");
            }
          } catch (error) {
            toast.error(`Error uploading artefact: ${error.message}`);
            setLoading(false);
            return;
          }
        }
      }

      // Clear localStorage on success
    ["draft-title", "draft-description", "draft-startDate", "draft-endDate", "draft-questions"].forEach(item => localStorage.removeItem(item));

      toast.success(
        `Study ${status === "active" ? "published" : "saved as draft"}!`
      );
      navigate("/dashboard");
    } catch (err) {
      toast.error("Server error: " + err.message);
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);

    }
  };

  return (
    <div className="studyFormWrapper">
      <div className="studyFormHeader">
        <h1 className="createStudyTitle">{title.trim() || "New Study"}</h1>
        <div className="buttonLine">
          <CreateStudyButton
            className="CreateStudyButton"
            onClick={() => handleSaveOrPublishStudy("draft")}
            disabled={loading}
          />
          <CreateStudyPublish
            className="CreateStudyPublish"
            onClick={() => handleSaveOrPublishStudy("active")}
            disabled={loading}
          />
        </div>
      </div>

      <StudyHeader
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />

      <div className="dateInputsWrapper">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              localStorage.setItem("draft-startDate", e.target.value);
            }}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              localStorage.setItem("draft-endDate", e.target.value);
            }}
          />
        </label>
      </div>

     

      <div className="QuestionListWrapper">
        <QuestionList questions={questions} setQuestions={setQuestions} />
      </div>
    </div>
  );
}
