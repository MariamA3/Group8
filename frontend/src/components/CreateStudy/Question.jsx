import "./Question.css";

export default function Question({ number, question, updateQuestion }) {
  const handleInputChange = (e) => {
    updateQuestion({ ...question, questionText: e.target.value });
  };

  const handleFeedbackTypeChange = (e) => {
    updateQuestion({ ...question, feedbackType: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const artefacts = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    updateQuestion({ ...question, artefacts });
  };

  const renderArtefactUpload = () => {
    const count = question.feedbackType === "comparison" ? 2 : 1;
    return (
      <div className="fileUploadWrapper">
        <label htmlFor={`fileUpload-${number}`} className="fileUploadLabel">
          Upload {count > 1 ? `${count} Artefacts` : "Artefact"}
        </label>
        <input
          type="file"
          id={`fileUpload-${number}`}
          className="fileUploadInput"
          accept="image/*"
          multiple={count > 1}
          onChange={handleFileChange}
        />
        {question.artefacts && question.artefacts.length > 0 && (
          <ul className="filePreviewList">
            {question.artefacts.map((a, i) => (
              <li key={i} className="filePreviewItem">
                {a.file?.name || `Artefact ${i + 1}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="QuestionWrapper">
      <div className="QuestionToolBar">
        <span>Question {number}</span>
      </div>
      <div className="QuestionBar">
        <input
          name="question"
          placeholder="Enter question"
          value={question.questionText}
          onChange={handleInputChange}
        />

        <select
          name="feedbackType"
          className="dropdown"
          value={question.feedbackType}
          onChange={handleFeedbackTypeChange}
        >
          <option value="">Feedback type</option>
          <option value="percent-slider">Percent slider</option>
          <option value="bullet-slider">Bullet slider</option>
          <option value="range-slider">Range slider</option>
          <option value="text-field">Text field</option>
          <option value="multiple-choice">Multiple choice</option>
          <option value="comparison">Comparison</option>
          <option value="ranking">Ranking</option>
        </select>

        <div className="artefactSlot">
          {(question.feedbackType === "comparison" ||
            question.feedbackType.includes("slider") ||
            question.feedbackType === "multiple-choice") &&
            renderArtefactUpload()}
        </div>
      </div>
    </div>
  );
}
