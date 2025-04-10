import React, { useEffect, useState } from 'react';
import './pages.css';
import './ResultsPage.css';
import StudySummaryCard from '../components/StudySummaryCard';
import mockStudies from '../data/mockStudies';

const ResultsPage = () => {
  const [studies, setStudies] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);

  useEffect(() => {
    // Fetching the studies-route, as the API endpoint.
    const fetchStudies = async () => {
      const response = await fetch('/api/studies'); // Your API endpoint
      const data = await response.json();
      setStudies(data);
    };
    fetchStudies();
  }, []);

  // Mock data for demonstration purposes.
  useEffect(() => {
    // Use mock data instead of fetching from API
    setStudies(mockStudies);
  }, []);

  // Handling the click on a study card to show the results.
  const handleCardClick = (study) => {
    setSelectedStudy(study);
  };

  // Hotkey for returning from the selected study to the study summary-overview,
  // e.g. the card-view.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Escape' || e.key === 'Backspace') && selectedStudy) {
        setSelectedStudy(null);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStudy]);



  // Rendering the table with participants and their answers for the selected study.
  const renderTable = () => {
    if (!selectedStudy) return null;

    return (
      <div>
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
        <p className="return-text" onClick={() => setSelectedStudy(null)}>
          ⬅ Press Escape, Backspace, or click here to return to all studies
        </p>
      </div>
    );
  };

  return (
    <main className="results-container">
      <h1>Results</h1>
      <section className="card-container">
        {!selectedStudy ? (
          studies.map((study) => (
            <StudySummaryCard
              key={study.id}
              study={study}
              onClick={handleCardClick}
            />
          ))
        ) : (
          renderTable()
        )}
      </section>
    </main>
  );
};

export default ResultsPage;
