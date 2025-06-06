import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import trashIcon from "/delete.png";
import { toast } from "react-hot-toast";
import "./Dashboard.css";
import {getStudiesByResearcher, deleteStudyById } from '../../services/dashboardService'
import DeletionConfirmationMessage from "../sharedComponents/DeletionConfirmationMessage";
import { authFetch } from '../../utils/authfetch.js'; 

export default function Dashboard() {
  const [studies, setStudies] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState(null);

  const navigate = useNavigate();


useEffect(() => {
  const fetchStudies = async () => {
    try {
      const res = await authFetch("/api/studies");
      const data = await res.json();
      setStudies(data.study); 
    } catch (err) {
      console.error("Failed to load studies:", err);
      setStudies([]); 
    }
  };

  fetchStudies();
}, []);




const confirmDelete = async () => {
  try {
    await deleteStudyById(studyToDelete._id);
    setStudies((prev) => prev.filter((s) => s._id !== studyToDelete._id));
    toast.success(`Study "${studyToDelete.title}" deleted successfully`);
  } catch (err) {
    toast.error("Delete failed: " + err.message);
  } finally {
    setShowConfirm(false);
    setStudyToDelete(null);
  }
};

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
          onClick={() => {
            // clear old draft on purpose before navigating
            localStorage.removeItem("draft-title");
            localStorage.removeItem("draft-description");
            localStorage.removeItem("draft-startDate");
            localStorage.removeItem("draft-endDate");
            localStorage.removeItem("draft-questions");
            navigate("/create-study");
          }}
        >
          Create Study
        </button>
      </div>

      {studies.length === 0 && (
        <p className="emptyState">You haven’t created any studies yet.</p>
      )}

      {showConfirm && studyToDelete && (
        <DeletionConfirmationMessage
          studyName={studyToDelete.title}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setStudyToDelete(null);
          }}
        />
      )}

      <table className="dashboardTable">
        <thead>
          <tr>
            <th>Study</th>
            <th>Respondents</th>
            <th>Results</th>
            <th>Edit</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => (
            <tr key={study._id}>
              <td>{study.title}</td>
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
              <td>
                <button
                  className="deleteStudyBtn"
                  onClick={() => {
                    setShowConfirm(true);
                    setStudyToDelete(study);
                  }}
                >
                  <img src={trashIcon} alt="Delete" className="trashIcon" />
                </button>
              </td>
              <td>
                {study.status === "active" && (
                  <img
                    src="/copy-link.png"
                    alt="Copy link"
                    className="copyLinkIcon"
                    onClick={() =>
                      navigator.clipboard
                        .writeText(
                          `${window.location.origin}/study/${study._id}`
                        )
                        .then(() => toast.success("Link copied to clipboard"))
                        .catch(() => toast.error("Failed to copy link"))
                    }
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
