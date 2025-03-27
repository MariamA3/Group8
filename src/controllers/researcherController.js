const Researcher = require('../models/researcher.js')
const { getById, getModel, deleteModel } = require('../utils/helpers/controllerHelpers'); 

//sjekk om funker
const getResearchers = (req, res) => getModel(Researcher, res, req, 'Researcher'); 

//get a researcher
const getResearcherById = (req, res) => getById(Researcher, res, req, 'Researcher'); 

//does deleting researcher delete studies as well? 
const deleteResearcher = (req, res) => deleteModel(Researcher, req, res, 'Researcher')


//create
const createAResearcher = async (req, res) => {
   try{const {name, email, passwordHash, role, createdAt } = req.body; 
    const newResearcher = new Researcher ({
        name,
        email,
        passwordHash,
        role,
        createdAt
    }); 
    const savedResearcher = await newResearcher.save(); 

    res.status(201).json({savedResearcher}); 

   } catch (error){
    res.status(500).json({mesage: `Error creating researcher: ${error.message}`}); 
   }
}






module.exports = {
    createAResearcher,
    getResearcherById,
    getResearchers,
    deleteResearcher
}