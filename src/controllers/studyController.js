const Study = require('../models/study'); 

//get studies
const getStudies = async (req, res) =>{
  try{
    const studies = await Study.find(); 
    if(!studies){
      return res.status(404).json({message: 'Could not find studies '}); 
    }
    res.status(200).json({studies}); 
  }catch(error){
    res.status(500).json({message: `Error finding studies: ${error.message}`})
  }
}

//get study by id 


const getsStudyById = async(req, res) =>{ 
  try {
    const study = await Study.findById(req.params.id); 
    if(!study){
      return res.status(404).json({error: 'Could not find study'}); 
    }
    res.status(200).json({study}); 
  }catch(error){
    res.status(500).json({message: `Error finding study: ${error.message}`})
  }

}

//create study 

const createStudy = async(req, res) => {
  try{
    const { researcher, title, description, status, startdatem, endDatem, createdAt } = req.body; 

    // Ensure required fields are provided
    if (!researcher || !title) {
      return res.status(400).json({ message: "Researcher and Title are required fields" });
    }

    const newStudy = new Study ({
      researcher,
      title,
      description,
      status,
      startdatem,
      endDatem,
      createdAt
    })
    const savedStudy = await newStudy.save(); 
    if(!savedStudy){
      return res.status(409).json({message: `There was an error with saving the study, check input fields`}); 
    }
    res.status(201).json({savedStudy}); 
  }catch(error){
    res.status(500).json({message: `Error saving the study`}); 
  }
}


//delete study 

const deleteStudy = async (req, res)=>{
  try {
    const study = await Study.findByIdAndDelete(req.params.id); 
    if(!study){
      return res.status(404).json({message: 'Study not found or already deleted'}); 
    }
    res.status(200).json({message: 'Study has been deleted'})
  }catch(error){
    res.status(500).json({message: `Error deleting the study: ${error.message}`}); 
  }
}

  
module.exports = { 
    getStudies,
    getsStudyById,
    createStudy,
    deleteStudy

 };
  