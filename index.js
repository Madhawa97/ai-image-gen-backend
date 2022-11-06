import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { alter } from './alter.js';
import { edit } from './edit.js';
import { create } from './create.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Welcome to our Image Generation API!");
});

app.post("/api/create/", async (req, res) => {
    if (!(Object.keys(req.body.prompt).length > 10)) {
        res.status(500)
    }
    const url = await create(req.body.prompt);
    res.json({url: url});
});

app.get("/api/alter", async (req, res) => {
    const url = await alter();
    res.send(`<img src="${url}">`);
});

app.get("/api/edit", async (req, res) => {
    const url = await edit();
    res.send(`<img src="${url}">`);
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}...`));