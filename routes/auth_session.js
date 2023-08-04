import { Router } from 'express'; 
import authByEmailPwd from '../helpers/authByEmailPwd.js';
import { nanoid } from 'nanoid';
import { USER_BBDD } from '../src/bbdd.js';

const sessions = [];

const authSessionRouter = Router();

//loggin con email 
authSessionRouter.post('/login', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    try {
        const {guid} = authByEmailPwd(email, password);

        const sessionId = nanoid(); 
        sessions.push({sessionId, guid});

        res.cookie('sessionId', sessionId, {httpOnly: true});
        return res.send();
  } catch (err) {
    return res.sendStatus(401);
  }
})
authSessionRouter.get('/profile', (req, res) => {
    const {cookies} = req
    if(!cookies.sessionId) return res.sendStatus(401)
    const userSession  = sessions.find(s => s.sessionId === cookies.sessionId)

    if(!userSession) return res.sendStatus(401)
    const user = USER_BBDD.find(s => s.guid === userSession.guid)
    if(!user) return res.sendStatus(401)

    delete user.password

    return res.send()
})
export default authSessionRouter; 