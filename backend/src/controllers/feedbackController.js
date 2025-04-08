const Feedback = require('../models/feedback'); 
const { getById, getModel, deleteModel } = require('../utils/helpers/controllerHelpers'); 

//sjekk om funker
const getFeedback = (req, res) => getModel(Feedback, res, req, 'Feedback'); 

const getFeedbackById = (req, res) => getById(Feedback, res, req, 'Feedback'); 

const deleteFeedback = (req, res) => deleteModel(Feedback, req, res, 'Feedback')


//not needed only for fixing and debugging backend !!Remove later!!!
const updateFeedback = async(req, res) => {
    try{
        const { artefact, participant, rating, comment, submittedAt } = req.body;
        
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id, 
            {artefact, participant, rating, comment, submittedA},
            {}
        )

    }catch(error){

    }
}

const createFeedback = async(req, res) => {
    try{
        const {artefact,participant, rating,comment, submittedAt  } = req.body
        const newFeedback = {
            artefact, 
            participant, 
            rating, 
            comment, 
            submittedAt
        };
        const savedFeedback = newFeedback.save(); 
        if(!savedFeedback){
            return res.status(404).json({message: 'Error creating Feedback'}); 
        }
        res.status(201).json({savedFeedback})
    }catch(error){
        res.status(500).json({message: `Error creating Feedback: ${error.message}`}); 
    }

}

module.exports = {
    getFeedback,
    getFeedbackById,
    deleteFeedback,
    createFeedback,
    updateFeedback

}; 