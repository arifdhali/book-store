const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();

const route = require("./routes/routes");
const path = require('path');

const PORT = process.env.PORT || 3001;

const cors = require('cors');
const ErrorMiddleWare = require('./middleware/ErrorMiddleware');

app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
}));
app.use(ErrorMiddleWare)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/uploads/')));


app.use("/api", route);




app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
