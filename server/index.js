const express = require("express");
const route = require("./routes/routes");
const dotenv = require("dotenv");
const db = require("./config/dbconfig")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({
    extended: true,
}))


app.use("/api", route);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
