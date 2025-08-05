import express from 'express'

import MessageRoute from './message.js';
import userRoute from './user.js'
import WorkspaceRoute from './workspace.js'

const router = express.Router();

router.use('/users',userRoute);
router.use('/workspace',WorkspaceRoute);
router.use('/messages',MessageRoute);


export default router;