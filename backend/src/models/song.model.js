const mongoose  = require('mongoose');

const songSchema = new mongoose.Schema({
    name: String,
    url: String,
    mood: String

})
const songModel = mongoose.model('song' , songSchema)
module.exports = songModel;