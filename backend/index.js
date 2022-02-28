const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

dotenv.config();

app.listen(8000, () => {
    console.log('Server is running');
})

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to database');
})

app.use("/v1/auth", authRoute);

app.use("/v1/user", userRoute);

