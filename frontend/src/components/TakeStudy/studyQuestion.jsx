export default function StudyQuestion({ question, answer, onAnswer }) {
    const isComparison = question.feedbackType === "comparison";
  
    return (
      <div style={{ marginBottom: "2rem" }}>
        <h3>{question.questionText}</h3>
  
        <div
          style={{
            display: isComparison ? "flex" : "block",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          {question.artefacts?.map((a, i) => (
            <img
              key={i}
              src={a.url}
              alt={`Artefact ${i + 1}`}
              className="study-image"
              style={{
                width: isComparison ? "45%" : "100%",
                maxWidth: "100%",
                marginBottom: "1rem",
                cursor: isComparison ? "pointer" : "default",
                border: isComparison && answer === (i === 0 ? "left" : "right") ? "4px solid #4f6df5" : "2px solid transparent",
                borderRadius: "0.5rem",
                transition: "border 0.2s ease"
              }}
              onClick={() => isComparison && onAnswer(i === 0 ? "left" : "right")}
            />
          ))}
        </div>
  
        {!isComparison && (() => {
          switch (question.feedbackType) {
            case "text-field":
              return (
                <textarea
                  className="study-textarea"
                  value={answer}
                  onChange={(e) => onAnswer(e.target.value)}
                  placeholder="Your response..."
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
                      value={answer || 0}
                      onChange={(e) => onAnswer(Number(e.target.value))}
                      style={{ width: "100%" }}
                    />
                  );
            default:
              return <p>Unsupported question type</p>;
          }
        })()}
      </div>
    );
  }
  