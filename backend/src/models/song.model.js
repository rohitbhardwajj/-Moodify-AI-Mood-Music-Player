const mongoose  = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    url: String,
    mood
})