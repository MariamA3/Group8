import { useState } from "react";
import Question from "./Question";
import './QuestionList.css'

export default function QuestionList() {
  // start with 5 questions
  const [questions, setQuestions] = useState(Array(5).fill(null));

  // unction to add a new question
  const addQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, null]);
  };

  return (
    <div className="QuestionList">
      {questions.map((_, index) => (
        <Question key={index} number={index + 1} />
      ))}

      <button onClick={addQuestion} className="AddQuestionButton">
       Add question
      </button>
    </div>
  );
}
