const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();

const route = require("./routes/routes");


const PORT = process.env.PORT || 3001;

const cors = require('cors');

app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api", route);






app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
