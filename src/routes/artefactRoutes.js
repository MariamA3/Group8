const express = require('express');
const router = express.Router();
const Artefact = require('../controllers/artefactController')


router.get('/artefacts', Artefact.getArtefacts);
router.get('/artefacts/:id', Artefact.getArtefactById);
router.put('/artefacts/:id', Artefact.updateArtefact);
router.delete('/artefacts/:id', Artefact.deleteArtefact)

module.exports = router;