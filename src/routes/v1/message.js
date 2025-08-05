import express from 'express'

import messageController from '../../controllers/message.js'
import authenticateToken from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/:channelId',authenticateToken,messageController.getPaginatedMessages);

export default router;