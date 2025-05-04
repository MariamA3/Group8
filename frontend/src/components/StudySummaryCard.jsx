import { useNavigate } from 'react-router-dom';
import './styles/components.css';

function StudySummaryCard({ study, selected }) {
  const navigate = useNavigate();
  const participantCount = study.participants?.length || 0;
  const cardClasses = `summary-card${selected ? ' summary-card--expanded' : ''}`;

  const handleClick = () => {
    navigate(`/results/${study.id}`);
  };

  return (
    <div className={cardClasses} onClick={handleClick}>
      <h2>{study.name}</h2>
      <div className="details-area">
        <p>Study ID: <span>{study.id}</span></p>
        <p>{participantCount} participant{participantCount !== 1 ? 's' : ''}</p>
        <p>Click to view results for this study.</p>
      </div>
    </div>
  );
}

export default StudySummaryCard;
