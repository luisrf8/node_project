import express from 'express';
import { USER_BBDD } from '../src/bbdd.js';

const router = express.Router();
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
//crud de cuentas
router.get('/:user_id', (req, res) => {
    const { id } = req.params;
    const user = USER_BBDD.find((user) => user._id === id); 
    if(!user) return res.status(404).send('Account not found');
    res.send(user);
})
router.post('', (req, res) => {
    const { _id, name } = req.body;

    if (!_id || !name) res.status(400).send('Name is required');

    const user = USER_BBDD.find((user) => user._id === _id);

    if (user) return res.status(409).send('Account found');

    USER_BBDD.push({ _id, name });

    res.send({ _id, name });
});
router.patch('/:user_id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    if(!name) res.state(400).send('Name is required');

    const user = USER_BBDD.find((user) => user._id === id); 

    if(!user) return res.status(404).send('Account not found');

    user.name = name;
    res.send(user);
    
})
router.delete('/:user_id', (req, res) => {
    const {id} = req.params;
    const userIndex = USER_BBDD.findIndex((user) => user._id === id); 
    if(userIndex === -1) return res.status(404).send('Account not found');
    USER_BBDD.splice(userIndex, 1);
    res.send();
})

export default router;