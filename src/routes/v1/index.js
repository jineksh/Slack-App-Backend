import express from 'express'

import userRoute from './user.js'
import WorkspaceRoute from './workspace.js'

const router = express.Router();

router.use('/users',userRoute);
router.use('/workspace',WorkspaceRoute);


export default router;