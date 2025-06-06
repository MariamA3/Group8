import { useState } from "react";
import { useParams } from "react-router-dom";
import { submitDemographics } from "../services/DemographicsService"


export default function Demographics({ onComplete }) {
  const { id: sessionId } = useParams();
  const [form, setForm] = useState({
    gender: "",
    ageGroup: "",
    aiFamiliarity: 4,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitDemographics(sessionId, form);
      setSubmitted(true);
      if (onComplete) onComplete();
    } catch (err) {
      console.error("Demographics error:", err);
      alert("Failed to submit demographics");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <p>Thanks for submitting demographics!</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>Optional Demographic Questions</h2>

      <label>
        Gender:
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Choose</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Age Group:
        <select name="ageGroup" value={form.ageGroup} onChange={handleChange}>
          <option value="">Choose</option>
          <option value="under 18">Under 18</option>
          <option value="18-24">18–24</option>
          <option value="25-34">25–34</option>
          <option value="35-44">35–44</option>
          <option value="45+">45+</option>
        </select>
      </label>

      <label>
        How familiar are you with AI? (1 = not at all, 7 = very familiar)
        <input
          type="range"
          name="aiFamiliarity"
          min="1"
          max="7"
          value={form.aiFamiliarity}
          onChange={handleChange}
        />
        <span>{form.aiFamiliarity}</span>
      </label>

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
