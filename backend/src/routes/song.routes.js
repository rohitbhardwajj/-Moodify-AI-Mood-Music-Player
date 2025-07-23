const routes = require('express').Router();
const multer = require('multer');
const uploadedFile = require('../service/song.service');
const fs = require('fs');
const path = require('path');
const upload = multer({ storage: multer.memoryStorage() });

const folderPath = path.join(__dirname, '../../public');

routes.post('/upload', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(' Error reading folder:', err);
            return res.status(500).send("Error reading folder");
        }
        files.forEach(file => {
            if (path.extname(file).toLowerCase() === '.mp3') {
                console.log('MP3 File:', file);
            }
        });

        res.send("MP3 files listed in console");
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
