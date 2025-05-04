import './styles/components.css';

function StudySummaryCard({ study, onClick, selected }) {
  const participantCount = study.participants?.length || 0;
  const cardClasses = `summary-card${selected ? ' summary-card--expanded' : ''}`;

  return (
    <div className={cardClasses} onClick={() => onClick(study)}>
      <h2>{study.name}</h2>
      <div className='details-area'>
        <p>Study ID: <span>{study.id}</span></p>
        <p>{participantCount} participant{participantCount !== 1 ? 's' : ''}</p>
        <p>Click to view results for this study.</p>
      </div>
    </div>
  );
}

export default StudySummaryCard;
