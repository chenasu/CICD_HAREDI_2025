import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { addNewUser, checkLogin } from './services/authService.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

function listener(req, res) {
  res.send('pong');
}
app.get('/ping', listener);

app.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const response = await checkLogin(body.username, body.password);
    res.status(200).json({ message: 'Success', user: response });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});  

app.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const userRecord = await addNewUser(body.username, body.password);
    res.status(200).json({ message: 'Success', user: userRecord });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
