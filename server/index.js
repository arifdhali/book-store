const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const route = require("./routes/routes");
const path = require('path');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const ErrorMiddleWare = require('./middleware/ErrorMiddleware');
const cookieParser = require('cookie-parser');
const SocketManger = require('./utils/socket/Sockets.Manager')
const { createServer } = require("http");
const { Server } = require('socket.io')
let server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
        credentials: true
    }
});

SocketManger.init(io)
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
}));


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/uploads/')));

app.use("/api", route);

app.use(ErrorMiddleWare);

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
