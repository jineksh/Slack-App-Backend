import express from 'express'

import ChannelController from '../../controllers/channel.js'
import authenticateToken from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/:channelId',authenticateToken,ChannelController.getChannel);

export default router;