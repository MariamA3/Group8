import Participant  from '../models/participant.js';
import { getById, getModel, deleteModel } from '../utils/helpers/controllerHelpers.js'; 

//sjekk om funker
export const getParticipants = (req, res) => getModel(Participant, res, req, 'Participant'); 

//get a Participant
export const getParticipantById = (req, res) => getById(Participant, res, req, 'Participant'); 


export const deleteParticipant = (req, res) => deleteModel(Participant, req, res, 'Participant')

//
//create
export const createAParticipant = async (req, res) => {
  try {
    // Use req.body to initialize the participant with data from the request
    const newParticipant = new Participant(req.body); 
    const savedParticipant = await newParticipant.save();

    res.status(201).json(savedParticipant); 
  } catch (error) {
    res.status(500).json({ message: `Error creating Participant: ${error.message}` });
  }
};


//not needed only for fixing and debugging backend !!Remove!!!
export const updateParticipant = async(req, res) => {
  try {
    const {    
        _id
     } = req.body; 

    const updatedParticipant = await findByIdAndUpdate(
      req.params.id,
      { _id}, 
      { new: true, runValidators: true }
    );

    if (!updatedParticipant) {
      return res.status(404).json({ message: 'Participant not found' }); 
    }
    res.status(200).json(updatedParticipant); 
  } catch (error) {
    res.status(500).json({ error: `Error updating Participant: ${error.message}` }); 
  }
};

