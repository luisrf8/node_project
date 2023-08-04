import { Router } from "express";
import authByEmailPwd from "../helpers/authByEmailPwd.js";

const authTokenRouter = Router();

//loggin con email
authTokenRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);

    return res.send(`usuario ${user.name} autenticado`);
  } catch (err) {
    return res.sendStatus(401);
  }
});

export default authTokenRouter;
