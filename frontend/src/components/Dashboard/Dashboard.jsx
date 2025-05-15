import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // create this for styling

export default function Dashboard() {
  const [studies, setStudies] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  // replace with auth later
  const researcherId = "6824a97710175a3a9e9bb9f4";

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const res = await fetch("/api/studies");
        const data = await res.json();
        const allStudies = data.studies || data.study || [];
        console.log(allStudies);
        const myStudies = allStudies.filter(
          (study) => study.researcher === researcherId
        );
        setStudies(myStudies);
      } catch (err) {
        console.error("Error fetching studies:", err);
      }
    };

    fetchStudies();
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getStatusClass = (status) => {
    switch (status) {
      case "draft":
        return "status draft";
      case "active":
        return "status active";
      case "completed":
        return "status completed";
      default:
        return "status";
    }
  };

  return (
    <div className="dashboardWrapper">
      <div className="dashboardHeader">
        <h1>Dashboard</h1>
        <button
          className="createButton"
          onClick={() => navigate("/create-study")}
        >
          Create Study
        </button>
      </div>

      {studies.length === 0 && (
        <p className="emptyState">You haven’t created any studies yet.</p>
      )}
      <table className="dashboardTable">
        <thead>
          <tr>
            <th>Study</th>
            <th>Created</th>
            <th>Respondents</th>
            <th>Results</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => (
            <tr key={study._id}>
              <td>{study.title}</td>
              <td>{study.createdAt ? formatDate(study.createdAt) : "—"}</td>
              <td>{Math.floor(Math.random() * 10)}</td>
              <td>
                <span
                  className="resultsLink"
                  onClick={() => navigate(`/results/${study._id}`)}
                >
                  View
                </span>
              </td>
              <td>
                {study.status === "draft" && (
                  <span
                    className="editLink"
                    onClick={() => navigate(`/edit/${study._id}`)}
                  >
                    Edit
                  </span>
                )}
              </td>
              <td>
                <span className={getStatusClass(study.status)}>
                  {study.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
