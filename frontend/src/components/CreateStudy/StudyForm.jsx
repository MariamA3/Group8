import { useState } from "react";
import StudyHeader from "./StudyHeader";
import "./StudyForm.css";
import CreateStudyButton from "../Buttons/CreateStudyButton";
import CreateStudyPublish from "../Buttons/CreateStudyPublish";
import QuestionList from "./QuestionList";

export default function StudyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error , setError] = useState("")

  const [questions, setQuestions] = useState([
    { questionText: "", feedbackType: "", artefacts: [] },
    { questionText: "", feedbackType: "", artefacts: [] },
    { questionText: "", feedbackType: "", artefacts: [] },
    { questionText: "", feedbackType: "", artefacts: [] },
    { questionText: "", feedbackType: "", artefacts: [] },
  ]);
  

  //fix alert delene

  const researcherId = "hardcoded-id-or-from-auth"; // Replace with actual researcher ID logic later

  const handleSaveOrPublishStudy = async (status) => {
    const studyData = {
      researcher: researcherId,
      title,
      description,
      status
    };

    try {
      const response = await fetch("/api/studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studyData),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(`Error: ${result.message}`);
        return;
      }

      const studyId = result.savedStudy._id;

      // bmit artefacts for each question
      for (const q of questions) {
        for (const artefact of q.artefacts) {
          const artefactData = {
            study: studyId,
            researcher: researcherId,
            title: q.questionText,
            //hva er dette? 
            description: "Artefact for question",
            // This assumes file has already been uploaded and has a URL
            fileUrl: artefact.url 
          };

          await fetch("/api/artefacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(artefactData)
          });
        }
      }

      alert(`Study ${status === 'active' ? 'published' : 'saved as draft'}!`);
    } catch (err) {
        //fin noe å gjøre med denne error, må kanskje vises på siden om deet er feil som skjer 
        setError(err.message);

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

      <div className="QuestionListWrapper">
        <QuestionList questions={questions} setQuestions={setQuestions} />
      </div>
    </div>
  );
}