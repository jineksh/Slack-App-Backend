import express from 'express'

import userController from '../../controllers/user.js'

const router = express.Router();

router.get('/',(req,res)=>{
    res.send({message : 'Hello from user Route'});
})

router.post('/singup',userController.signUp);
router.post('/login',userController.login);

export default router;