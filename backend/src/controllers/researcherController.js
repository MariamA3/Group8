import Researcher  from '../models/researcher.js';
import { getById, getModel, deleteModel } from '../utils/helpers/controllerHelpers.js'; 

//sjekk om funker
export const getResearchers = (req, res) => getModel(Researcher, res, req, 'Researcher'); 

//get a researcher
export const getResearcherById = (req, res) => getById(Researcher, res, req, 'Researcher'); 

//sletter denne studies og? 
export const deleteResearcher = (req, res) => deleteModel(Researcher, req, res, 'Researcher')

//updating
export const updateResearcher = async(req, res) => {
  try {
    const {    
        name,
        email,
        passwordHash,
        role
     } = req.body; 

    const updatedResearcher = await findByIdAndUpdate(
      req.params.id,
      { name, email,  passwordHash, role }, 
      { new: true, runValidators: true }
    );

    if (!updatedResearcher) {
      return res.status(404).json({ message: 'Researcher not found' }); 
    }
    res.status(200).json(updatedResearcher); 
  } catch (error) {
    res.status(500).json({ error: `Error updating researcher: ${error.message}` }); 
  }
};

//create
export const createAResearcher = async (req, res) => {
   try{const {name, email, passwordHash, role } = req.body; 
    const newResearcher = new Researcher ({
        name,
        email,
        passwordHash,
        role
    }); 
    const savedResearcher = await newResearcher.save(); 

    res.status(201).json({savedResearcher}); 

   } catch (error){
    res.status(500).json({mesage: `Error creating researcher: ${error.message}`}); 
   }
}


