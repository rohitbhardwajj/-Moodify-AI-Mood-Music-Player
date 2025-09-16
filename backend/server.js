const express = require('express');
const app = express()
const connectDb = require('./src/db/db')
const songRoutes = require('./src/routes/song.routes');
require('dotenv').config();
const cors = require('cors');
connectDb();

app.use(cors()); 
app.use(express.json());
app.use('/', songRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Moodify AI Music Player Backend");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});