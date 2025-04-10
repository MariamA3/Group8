import './StudyHeader.css';

export default function StudyHeader({title, setTitle, description, setDescription}){
    return(


        <div className="studyHeaderWrapper">
            
            <input
                className="studyTitle"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <textarea 
            className="StudyDescription"
            placeholder="Description"
            value={description}    
            onChange={(event) => setDescription(event.target.value)}    
            />
        </div>


    );
}