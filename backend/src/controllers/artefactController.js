import Artefact from '../models/artefact.js'; 
import { getById, getModel, deleteModel } from '../utils/helpers/controllerHelpers.js'; 


export const getArtefactById = (req, res) => getById(Artefact, req, res, 'Artefact');

export const getArtefacts = (req, res) => getModel(Artefact, req, res, 'Artefact');

export const deleteArtefact = (req, res) => deleteModel(Artefact, req, res, 'Artefact')


//create artefact 
export const createArtefact = async(req, res) => {
    try {
        const { study, researcher, title, description, fileUrl, createdAt } = req.body; 
        const newArtefact = new Artefact({
            study,
            researcher, 
            title, 
            description, 
            fileUrl,
            createdAt
        }); 

        const savedArtefact = await newArtefact.save(); 
        // if(!savedArtefact){
        //     return res.status(404).json({message: 'Could not find artefact'})
        // }
        res.status(201).json(savedArtefact); 

    }catch(error){
        res.status(500).json({message: `Error creating the artefact: ${error.message}`})
    }
}

//siste jeg hodlte på 
export const updateArtefact = async(req, res)=>{
    try{
        const { study, researcher, title, description, fileUrl, createdAt } = req.body; 

        const updatedArtefact = await findByIdAndUpdate(
            req.params.id, 
           { study, researcher, title, description, fileUrl, createdAt }, 
           {new: true, runValidators:true}
        );
        
        if(!updatedArtefact){
            return res.status(500).json({message: 'Artefact not found'}); 
        }
        res.status(200).json({updatedArtefact}); 
    }catch(error){
        res.status(500).json({nessage: `Error updating artefact: ${error.message}`})
    }
}



