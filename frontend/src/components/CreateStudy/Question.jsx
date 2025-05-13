
import "./Question.css";
//import Slider from "@mui/material/Slider";

export default function Question({ number }) {
  return (
    <div className="QuestionWrapper">
      <div className="QuestionToolBar">
        <span>{number}</span>
      </div>
      <div className="QuestionBar">
        <input name="question" placeholder="Enter question" />
        <select name="feedbackType" className="dropdown">
          <option value="percent-slider">Feedback type</option>
          <option value="S-slider">Percent slider</option>
          <option value="S-slider">Bullet slider</option>
          <option value="S-slider">Range slider</option>

        </select>
        <div className="fileUploadWrapper">
          <label htmlFor="imageUpload" className="fileUploadLabel">
            Upload Artefact
          </label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            className="fileUploadInput"
            accept="image/*"
            multiple
          />
        </div>
      </div>
    </div>
  );
}
