
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
          <option value="percent-slider">Percent Slider</option>
        </select>
        <input
          type="file"
          name="imageUpload"
          className="imageUpload"
          accept="image/*"
        />
      </div>
    </div>
  );
}
