import "./Question.css";

export default function Question({
  number,
  question,
  updateQuestion,
  removeQuestion,
}) {
  const handleInputChange = (e) => {
    updateQuestion({ ...question, questionText: e.target.value });
  };

  const handleFeedbackTypeChange = (e) => {
    updateQuestion({ ...question, feedbackType: e.target.value });
  };

  async function uploadToServer(file) {
    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    // backend returns fileUrl
    return json.fileUrl;
  }

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedArtefacts = await Promise.all(
      files.map(async (file) => {
        const url = await uploadToServer(file);
        return { file, url };
      })
    );

    updateQuestion({ ...question, artefacts: uploadedArtefacts });
  };

  const renderArtefactUpload = () => {
    const count = question.feedbackType === "comparison" ? 2 : 1;
    const showUpload =
      question.feedbackType === "comparison" ||
      question.feedbackType.includes("slider") ||
      question.feedbackType === "multiple-choice";

    return (
      <div
        className="fileUploadWrapper"
        style={{
          opacity: showUpload ? 1 : 0,
          pointerEvents: showUpload ? "auto" : "none",
        }}
      >
        <label
          htmlFor={`fileUpload-${number}`}
          className="fileUploadLabel"
          style={{
            pointerEvents: showUpload ? "auto" : "none",
            opacity: showUpload ? 1 : 0,
          }}
        >
          Upload {count > 1 ? `${count} Artefacts` : "Artefact"}
        </label>
        <input
          type="file"
          id={`fileUpload-${number}`}
          className="fileUploadInput"
          accept="image/*"
          multiple={count > 1}
          onChange={handleFileChange}
          disabled={!showUpload}
        />
        {showUpload && question.artefacts?.length > 0 && (
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
        <button className="RemoveQuestionButton" onClick={removeQuestion}>
          <img
            src="/trash-delete-white-icon.png"
            alt="Remove"
            className="trashIcon"
          />
        </button>
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
          <option value="comparison">Comparison</option>
        </select>

        <div className="artefactSlot">{renderArtefactUpload()}</div>
      </div>
    </div>
  );
}
