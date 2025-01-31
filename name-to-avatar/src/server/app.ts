import { generateAvatarImage } from './avatar';
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/get-avatar", (req: any, res: any) => {
    let { name, first_letter, second_letter } = req.body;
    if (!first_letter || !second_letter) {
        first_letter = 1;
        second_letter = 2;
    }
    let avatar = generateAvatarImage({ name: name, size: 100, positions: [first_letter, second_letter] })
    return res.json({ avatar });
})


app.listen(PORT, (error: any) => {
    if (error) {
        throw error;
    }
    console.log(`Server listening on ${PORT}`)

});