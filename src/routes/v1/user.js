import express from 'express'

const router = express.Router();

router.get('/',(req,res)=>{
    res.send({message : 'Hello from user Route'});
})


export default router;