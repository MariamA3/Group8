import { useState } from "react";
import Question from "./Question";
import './QuestionList.css';

export default function QuestionList({ questions, setQuestions }) {
  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { questionText: "", feedbackType: "", artefacts: [] }
    ]);
  };

  const updateQuestion = (index, updatedQuestion) => {
    const updated = [...questions];
    updated[index] = updatedQuestion;
    setQuestions(updated);
  };

  return (
    <div className="QuestionList">
      {questions.map((question, index) => (
        <Question
          key={index}
          number={index + 1}
          question={question}
          updateQuestion={(updated) => updateQuestion(index, updated)}
        />
      ))}

      <button onClick={addQuestion} className="AddQuestionButton">
        Add question
      </button>
    </div>
  );
}

