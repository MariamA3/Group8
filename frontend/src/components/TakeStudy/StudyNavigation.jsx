

export default function StudyNavigation({
    currentIndex,
    total,
    onBack,
    onNext,
    onSubmit,
    canProceed,
    submitting
  }) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="study-button" onClick={onBack} disabled={currentIndex === 0}>
          Back
        </button>
  
        {currentIndex < total - 1 ? (
          <button className="study-button" onClick={onNext} disabled={!canProceed}>
            Next
          </button>
        ) : (
          <button  className='submit-study' onClick={onSubmit} disabled={!canProceed || submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    );
  }