import { Router } from 'express';
import { USER_BBDD } from '../src/bbdd.js';
import userModel from '../schemas/user-schema.js';
const router = Router();

//middleware que loguea la ip 
router.use((req, res, next) => {
    console.log(req.ip); 

    next()
})
//crud de cuentas
router.get('/:user_id', (req, res) => {
    const { id } = req.params;
    const user = USER_BBDD.find((user) => user._id === id); 
    if(!user) return res.status(404).send('Account not found');
    res.send(user);
})
router.post('/', async (req, res) => {
    const { guid, name } = req.body;

    if (!guid || !name) res.status(400).send('Name is required');
    //conectado a base de dato mongoose
    const user = await userModel.findById(guid).exec();
    //conectado a base de dato json
    // const user = USER_BBDD.find((user) => user._id === _id);

    if (user) return res.status(409).send('Account found');
    const newUser = new userModel({ _id: guid, name });
    await newUser.save();
    // USER_BBDD.push({ _id, name });

    res.send({ guid, name });
});
router.patch('/:user_id', async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    if(!name) res.state(400).send('Name is required');

    const user = await userModel.findById(guid).exec();

    if(!user) return res.status(404).send('Account not found');

    user.name = name;
    await user.save();
    res.send(user);
    
})
router.delete('/:user_id', async (req, res) => {
    const {guid} = req.params;
    const user = await userModel.findById(guid).exec();
    if(!user) return res.status(404).send('Account not found');
    // USER_BBDD.splice(userIndex, 1);
    await user.remove()
    res.send();
})

export default router;