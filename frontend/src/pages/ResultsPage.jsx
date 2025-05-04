import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/pages.css';
import './styles/ResultsPage.css';
import StudySummaryCard from '../components/StudySummaryCard';

const ResultsPage = () => {
  const { id } = useParams(); // Get study ID from URL
  const navigate = useNavigate(); // To navigate programmatically
  const [studies, setStudies] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);

  // Actual fetching of the studies from the API, comment out to use mock data instead.
  // useEffect(() => {
  //   // Fetching the studies-route, as the API endpoint.
  //   const fetchStudies = async () => {
  //     const response = await fetch('/api/studies'); // Your API endpoint
  //     const data = await response.json();
  //     setStudies(data);
  //   };
  //   fetchStudies();
  // }, []);

  // Mock data for demonstration purposes.
  useEffect(() => {
    fetch('/mockStudies.json')
      .then(res => res.json())
      .then(data => {
        setStudies(data);

        // If there's an ID in the URL, pre-select the matching study
        if (id) {
          const found = data.find(study => study.id.toString() === id);
          setSelectedStudy(found || null);
        }
      });
  }, [id]);

  // Go back to overview on ESC or Backspace
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Escape' || e.key === 'Backspace') && selectedStudy) {
        setSelectedStudy(null);
        navigate('/results'); // Update URL
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStudy, navigate]);

  const handleCardClick = (study) => {
    navigate(`/results/${study.id}`);
    setSelectedStudy(study);
  };

  const renderTable = () => {
    if (!selectedStudy) return null;

    return (
      <>
        <div className="summary-card summary-card-expanded">
          <h2>Summary of "{selectedStudy.name}"</h2>
          <table>
            <thead>
              <tr>
                <th>Participant ID</th>
                {selectedStudy.questions.map((q, i) => (
                  <th key={i}>{q}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedStudy.participants.map((p, i) => (
                <tr key={i}>
                  <td>{p.id}</td>
                  {p.answers.map((a, j) => (
                    <td key={j}>{a}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="return-text" onClick={() => {
          setSelectedStudy(null);
          navigate('/results');
        }}>
          ⬅ Press Escape, Backspace, or click here to return to all studies
        </p>
      </>
    );
  };

  return (
    <main className="results-container">
      <h1>Results</h1>
      <section className="card-container">
        {selectedStudy ? (
          <>
            <StudySummaryCard study={selectedStudy} selected={true} />
            {renderTable()}
          </>
        ) : (
          <div className="summary-card">
            {studies.map((study) => (
              <StudySummaryCard
                key={study.id}
                study={study}
                selected={false}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ResultsPage;
