import Study from '../models/study.js';
import { getById, getModel, deleteModel } from '../utils/helpers/controllerHelpers.js'; 

//get studies

export const getStudies = (req, res) => getModel(Study, req, res, 'Study');

//get study by id 

export const getStudyById = (req, res) => getById(Study, req, res, 'Study');

//delete study 

export const deleteStudy = (req, res) => deleteModel(Study, req, res, 'Study');

//create study 
export const createStudy = async (req, res) => {
  try {
    const { researcher, title, description, status, startDate, endDate, questions } = req.body;

    if (!researcher || !title) {
      return res.status(400).json({ message: "Researcher and Title are required fields" });
    }

    const newStudy = new Study({
      researcher,
      title,
      description,
      status,
      startDate,
      endDate,
      questions
    });

    const savedStudy = await newStudy.save();
    if (!savedStudy) {
      return res.status(409).json({ message: "There was an error saving the study" });
    }

    res.status(201).json({ savedStudy });
  } catch (error) {
    res.status(500).json({ message: "Error saving the study" });
  }
};


//updating
export const updateStudy = async (req, res) => {
  try {
    const { researcher, title, description, status, startDate, endDate, questions } = req.body;

    const updatedStudy = await findByIdAndUpdate(
      req.params.id,
      { researcher, title, description, status, startDate, endDate, questions },
      { new: true, runValidators: true }
    );

    if (!updatedStudy) {
      return res.status(404).json({ message: "Study not found" });
    }

    res.status(200).json(updatedStudy);
  } catch (error) {
    res.status(500).json({ error: `Error updating study: ${error.message}` });
  }
};


  
