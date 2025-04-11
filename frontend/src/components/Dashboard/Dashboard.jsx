import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateStudyButton from "../Buttons/CreateStudyButton";
import dummyStudies from "./DummyStudies";

export default function Dashboard() {
  const [studies, setStudies] = useState([]);

  // Load dummy studies on mount
  useEffect(() => {
    setStudies(dummyStudies);
  }, []);

  return (
    <div className="DashboardWrapper">
      <div className="DashboardHeader">
        <h1>Dashboard</h1>
        <Link to="/create-study" className="DashboardButton">
          Create Study
        </Link>
      </div>
      <div className="DashboardTable">
        <table>
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
            {studies.map((study, index) => (
              <tr key={index}>
                <td>{study.study}</td>
                <td>{study.created}</td>
                <td>{study.respondents}</td>
                <td>
                  <a href={study.results} className="view-link">
                    View
                  </a>
                </td>
                <td>
                  {study.status === "Active" && (
                    <a href={study.edit} className="edit-link">
                      Edit
                    </a>
                  )}
                </td>
                <td className={study.status.toLowerCase()}>{study.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
