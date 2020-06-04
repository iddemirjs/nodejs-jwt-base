const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
// Import Our Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Connected Mongo DB! 🎉");
    }
);

// Middleware
app.use(express.json());

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => {
    console.log("Server is running🏃‍♂️");
});