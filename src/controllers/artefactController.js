
const Artefact = require('../models/artefact'); 

//Get 

const getArtefacts = async(req, res)=>{
    try {
        const artefacts = await Artefact.find(); 
        if(!artefacts){
            //why return, 
            return res.status(404).json({message: 'No artefacts found'}); 
        }
        res.status(200).json({artefacts}); 
    }catch(error){
        res.status(500).json({message: `Error finding the artefacts: ${error.message}`})
    }; 
}


//Get by Id 

const getArtefactById = async (req,res) => {
    try{
        const artefact = await Artefact.findById(req.params.id); 
        if(!artefact){
            return res.status(404).json({message: 'Artefact not found'})
        }
        res.status(200).json({artefact})
    }catch(error){
        res.status(500).json({message: `Error finding the artefact: ${error.message}`})
    }
}

//create artefact 

const createArtefact = async(req, res) => {
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
const updateArtefact = async(req, res)=>{
    try{
        const { study, researcher, title, description, fileUrl, createdAt } = req.body; 

        const updatedArtefact = await Artefact.findByIdAndUpdate(
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

//Delete 

const deleteArtefact = async(req, res) => {
    try{   
        const artefact = await Artefact.findByIdAndDelete(req.params.id); 
        if(!artefact){
            return res.status(404).json({message: 'Artefact not found, or already delete'})
        }
        res.status(200).json({message: 'Artefact deleted'})
    }catch(error){
        res.status(500).json({message: `Error deleting the artefact: ${error.message}`})
    }
}

module.exports = {
    getArtefacts,
    getArtefactById,
    createArtefact,
    updateArtefact,
    deleteArtefact

} 