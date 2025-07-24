const express = require('express');
const app = express()
const connectDb = require('./src/db/db')
const songRoutes = require('./src/routes/song.routes');
require('dotenv').config();
const cors = require('cors');
connectDb();

connectDb();

app.use(cors()); // ✅ allow all origins
app.use(express.json());
app.use('/', songRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});