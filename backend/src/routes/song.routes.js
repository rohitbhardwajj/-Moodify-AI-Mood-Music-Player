const routes = require('express').Router();
const multer = require('multer');
const uploadedFile = require('../service/song.service');
const fs = require('fs');
const path = require('path');
const upload = multer({ storage: multer.memoryStorage() });

const folderPath = path.join(__dirname, '../../public/excitement');
const outputSongUrl = [];
const songModel  = require('../models/song.model')

routes.post('/upload', (req, res) => {
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
            results.forEach(result => {
                songModel.create({
                    name: result.name,
                    url: result.url,
                    mood: "excitement" // Assuming a default mood, you can change this as needed
                });
            });
            console.log("MP3 files:", outputSongUrl);
            res.send("MP3 files listed in console");
        })
        .catch(err => {
            console.error('Error uploading files:', err);
            res.status(500).send("Error uploading files");
        });
    });
});



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
