import StudyHeader from "./StudyHeader";
import './StudyForm.css';
import CreateStudyButton from "../Buttons/CreateStudyButton";
import CreateStudyPublish from "../Buttons/CreateStudyPublish";
import QuestionList from './QuestionList'
import Question from "./Question";
//Wrapper for the other components 
/*
    Needs: 
    StudyHeader
    Buttons
    QuestionList - that includes the other stuff
*/

export default function StudyForm(){
    
    return(
        <div className="studyFormWrapper">   
           <div className="studyFormHeader">
                <h1 className="createStudyTitle">New Study</h1>
                <div className="buttonLine">
                    <CreateStudyButton />
                    <CreateStudyPublish />
                </div>
            </div>

            <StudyHeader/>
            
            <div className="QuestionListWrapper">
                    <Question/>
                </div>

       </div>
    )
}