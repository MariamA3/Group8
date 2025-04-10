import './components.css';

function StudySummaryCard({ study, onClick }) {
  return (
    <div className="summary-card" onClick={() => onClick(study)}>
      <h2>{study.name}</h2>
      <p>Study ID: <span>{study.id}</span></p>
      <p>Click to view results for this study.</p>
    </div>
  );
}

export default StudySummaryCard;
