import express from 'express'

import workspaceController from '../../controllers/workspace.js'
import authenticateToken from '../../middlewares/authenticate.js';

const router = express.Router();



router.post('/',authenticateToken,workspaceController.createWorkspace);


export default router;