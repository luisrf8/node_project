import { Router } from "express";
import { USER_BBDD } from "../src/bbdd.js";
import authByEmailPwd from "../helpers/authByEmailPwd.js";

const authRouter = Router();

// no authorization
authRouter.get("/publico", (req, res) => {
  res.send("Endpoint publico ");
});
// autenticado
authRouter.post("/autenticado", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }
  try {
    console.log(email, password);
    const user = authByEmailPwd(email, password);
    return res.send(`usuario ${user.name} autenticado`);
  } catch (err) {
    return res.sendStatus(401);
  }
});
// autorizado a administradores
authRouter.post("/autorizado", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }
  try {
    const user = authByEmailPwd(email, password);

    if (user.role !== "admin") return res.sendStatus(403);

    return res.send(`usuario adminsitrador ${user.name}`);
  } catch (err) {
    return res.sendStatus(401);
  }
});
export default authRouter;
