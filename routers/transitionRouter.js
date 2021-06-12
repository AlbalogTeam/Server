import express from 'express';
const router = new express.Router();

import * as transitionController from '../controllers/transitionController';
import userAuth from '../middleware/userAuth';


router.post(
  '/:locationId/create',
    transitionController.create_transition
);

router.get('/locationId', userAuth, transitionController.readTransition);

router.patch('/:locationId/update', userAuth, transitionController.updateTransition);

router.delete('/:locationId/delete', userAuth, transitionController.deleteTransition);

module.exports = router;