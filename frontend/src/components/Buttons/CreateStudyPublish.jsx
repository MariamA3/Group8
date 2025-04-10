import SiteButton from "./Button"
import './CreateStudyPublish.css'



export default function CreateStudyPublish(){
    const createAndPublish = () => {
        //push the data to db and also publish
    }

    return(
           <SiteButton onClick={createAndPublish} className="CreatePublish-button">
             Create and publish
           </SiteButton>
    
    );
}

