import { Router } from "express";
import authByEmailPwd from "../helpers/authByEmailPwd.js";
import { USER_BBDD } from "../src/bbdd.js";
import { SignJWT, jwtVerify } from 'jose'
const authTokenRouter = Router();

//loggin con email
authTokenRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const {guid} = authByEmailPwd(email, password);

    // Generar token y devolver token
    const jwtConstructor = new SignJWT({guid})

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
    .setProtectedHeader({alg: 'HS256', type: 'SWT'})
    .setIssuedAt()
    .setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({jwt});

  } catch (err) {
    return res.sendStatus(401);
  }
});
// https://www.youtube.com/watch?v=7slR56l2QSM&list=PL3aEngjGbYhnrRfZKMxzn79qdgPxL7OWM&index=11
authTokenRouter.get('/profile', async (req, res) => {
    const {authorization} = req.headers
    if(!authorization) res.sendStatus(401)

    try {
    const encoder = new TextEncoder();

        const {payload} = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY));
        const user = USER_BBDD.find(s => s.guid === payload.guid)
        if(!user) return res.sendStatus(401)
        delete user.password
        return res.send(user)

    }catch (err) {
    return res.sendStatus(401);

    }


})
export default authTokenRouter;
