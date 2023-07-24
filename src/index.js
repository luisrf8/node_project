console.clear();
import express from 'express'
import router from '../routes/account.js';
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.text());
app.use("/account",router); 
app.post("/account/:idcuenta", (req, res) => {
    console.log(req.body)
    res.send()
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

