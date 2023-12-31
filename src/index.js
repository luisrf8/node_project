console.clear();
import express from 'express'
import router from '../routes/account.js';
import authRouter from '../routes/auth.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authSessionRouter from '../routes/auth_session.js';
import authTokenRouter from '../routes/auth_token.js';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL 
const app = express();

app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use("/account", router);
app.use("/auth", authRouter);
app.use("/auth-token", authTokenRouter);
app.use("/auth-session", authSessionRouter);
app.post("/account/:idcuenta", (req, res) => {
    console.log(req.body)
    res.send()
});

const bootstrap = async () => {
    
    await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    
}

bootstrap();
