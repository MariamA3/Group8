import Invitation from '../models/invitation.js';
import { getById, getModel, deleteModel } from '../utils/helpers/controllerHelpers.js';

//sjekk om funker
export const getInvitations = (req, res) => getModel(Invitation, res, req, 'Invitation'); 

//get a Invitation
export const getInvitationById = (req, res) => getById(Invitation, res, req, 'Invitation'); 

//sletter denne studies og? 
export const deleteInvitation = (req, res) => deleteModel(Invitation, req, res, 'Invitation')
 
export const createInvitation = async(req, res) => {
    try{
        const {study,status, sentAt } = req.body
        const newInvitation = {
            study, 
            status, 
            sentAt
        };
        const savedInvitation = newInvitation.save(); 
        if(!savedInvitation){
            return res.status(404).json({message: 'Error creating invitation'}); 
        }
        res.status(201).json({savedInvitation})
    }catch(error){
        res.status(500).json({message: `Error creating invitation: ${error.message}`}); 
    }

}



//update 

export const updateInvitation = async(req, res) => {

    try {
        const {study,  status,  sentAt } = req.body; 
        const updatedInvitation = findByIdAndUpdate(
            req.params.id, 
            {study, status, sentAt},
            {new: true, runValidators: true }); 

      if (!updatedInvitation) {
      return res.status(404).json({ message: 'Invitation not found' }); 
    }
         res.status(200).json(updatedInvitation); 
    }catch(error){
        res.status(500).json({message: `Error updating the invitation: ${error.message}`});
    }

}
