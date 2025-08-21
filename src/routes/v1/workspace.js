import express from 'express'

import workspaceController from '../../controllers/workspace.js'
import authenticateToken from '../../middlewares/authenticate.js';

const router = express.Router();



router.post('/',authenticateToken,workspaceController.createWorkspace);

router.get('/',authenticateToken,workspaceController.getAllWorkspacesByUserId);

router.delete('/:workspaceid',authenticateToken,workspaceController.DeleteWorkspace);

router.get('/:workspaceid',authenticateToken,workspaceController.getWorkSpacebyId);

router.get('/join/:joincode',authenticateToken,workspaceController.getWorkSpacebyJoinCode);

router.put('/:workspaceid',authenticateToken,workspaceController.updateWorkSpace);

router.put('/:workspaceid/channel',authenticateToken,workspaceController.addChannel);

router.put('/:workspaceid/member',authenticateToken,workspaceController.addMember);

router.post('/:workspaceid/join',authenticateToken,workspaceController.varifyJoinCode);

router.put('/:workspaceid/join',authenticateToken,workspaceController.joinWorkspace);

export default router;