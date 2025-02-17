const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { WebSocketServer } = require("ws");
const connect_to_db = require("./db");
const setupAdminRoutes = require("./routes/adminRoutes");
const setupUserRoutes = require("./routes/userRoutes");
const setupAuthRoutes = require("./routes/authRoutes");
const setupFileRoutes = require("./routes/fileRoutes");

const port = process.env.PORT;

const startServer = async () => {
    const app = express();
    const server = require("http").createServer(app);
    const wss = new WebSocketServer({ server });

    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    const db = await connect_to_db();

    const adminRouter = express.Router();
    const userRouter = express.Router();
    const authRouter = express.Router();
    const fileRouter = express.Router();

    setupAdminRoutes(adminRouter, db, wss);
    setupUserRoutes(userRouter, db);
    setupAuthRoutes(authRouter, db);
    setupFileRoutes(fileRouter, db);

    app.use("/admin", adminRouter);
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/file", fileRouter);

    server.listen(port, () => {
        console.log(`Express: I'm listening at ${port}`);
    });

    wss.on("connection", (ws) => {
        console.log("Client connected");
        ws.on("close", () => console.log("Client disconnected"));
    });
};

startServer();
