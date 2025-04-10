import SiteButton from "./Button";
import './CreateStudyButton.css'; 


export default function CreateStudyButton() {
  const handleClick = () => {
    //create the study and push to the db, 
  };

  return (
    <SiteButton onClick={handleClick} className="CreateStudy-button">
      Create
    </SiteButton>
  );
}