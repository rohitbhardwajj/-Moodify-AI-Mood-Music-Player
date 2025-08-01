const routes = require('express').Router();
const multer = require('multer');
const uploadedFile = require('../service/song.service');
const fs = require('fs');
const path = require('path');
const upload = multer({ storage: multer.memoryStorage() });

const folderPath = path.join(__dirname, '../../public/angry');
const songModel  = require('../models/song.model')

routes.get('/ping', (req, res) => {
  res.status(200).send('OK');
});

routes.post('/uploads', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return res.status(500).send("Error reading folder");
        }

        Promise.all(files.map(file => {
            const filePath = path.join(folderPath, file);
            const fileBuffer = fs.readFileSync(filePath);

            return uploadedFile({
                originalname: file,
                buffer: fileBuffer
            });
        }))
        .then(results => {
            results.forEach(results => {
                console.log(results);
                songModel.create({
                    name: results.name,
                    url: results.url,
                    mood: "angry" 
                });
            });
            res.send("MP3 files listed in console");
        })
        .catch(err => {
            console.error('Error uploading files:', err);
            res.status(500).send("Error uploading files");
        });
    });
});

routes.get('/songs' , async(req , res)=>{
    try{
        const songs = await songModel.find();
        res.json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).send("Error fetching songs");
    }
})



// routes.post('/song', upload.single('audio'), (req, res) => {
//     console.log("Req body:", req.body);
//     console.log("Req file:", req.file);   // <-- dekho aa raha?

//     if (!req.file) {
//         return res.status(400).send("No file uploaded");
//     }

//     uploadedFile(req.file)
//       .then(result => {
//         console.log("ImageKit result:", result.url);
//         res.send("Song uploaded successfully");
//       })
//       .catch(err => {
//         console.error("ImageKit error:", err);
//         res.status(500).send("Error uploading song");
//       });
// });

module.exports = routes;
