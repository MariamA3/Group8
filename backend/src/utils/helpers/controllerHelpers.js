
//make helpers for the functions that are repeated a lot 

//Get model by id 
export const getById = async (Model, req, res, itemName) => {
    try {
        const item = await Model.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: `${itemName} not found` });
        }
        res.status(200).json({ [itemName.toLowerCase()]: item });
    } catch (error) {
        res.status(500).json({ message: `Error finding ${itemName}: ${error.message}` });
    }
};


//Get model 

export const getModel = async (Model, req, res, itemName) => {
    try{    
        const item = await Model.find(); 
        if(!item){
            res.status(404).json({message: `${itemName} not found` })
        }
        res.status(200).json({ [itemName.toLowerCase()]: item });
    }catch(error){
        res.status(500).json({ message: `Error finding ${itemName}: ${error.message}` });
    }
}

//delete model 

export const deleteModel = async(Model, req, res, itemName)=>{
    try {
        const item = await Model.findByIdAndDelete(req.params.id);  
        if (!item) {
            return res.status(404).json({ message: `${itemName} not found` });
        }
        return res.status(200).json({ message: `${itemName} deleted` });
    } catch(error) {
        return res.status(500).json({ message: `Error deleting the ${itemName}; ${error.message}` });
    }
}

