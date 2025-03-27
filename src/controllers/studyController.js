const Study = require('../models/study'); 
const { getById, getModel, deleteModel } = require('../utils/helpers/controllerHelpers'); 


//get studies

const getStudies = (req, res) => getModel(Study, req, res, 'Study');

//get study by id 

const getStudyById = (req, res) => getById(Study, req, res, 'Study');

//delete study 

const deleteStudy = (req, res) => deleteModel(Study, req, res, 'Study');

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


  
module.exports = { 
    getStudies,
    getStudyById,
    createStudy,
    deleteStudy

 };
  