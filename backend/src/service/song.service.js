
const ImageKit = require("imagekit");
require('dotenv').config();
const imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY,
    urlEndpoint : process.env.URL_ENDPOINT
});

const uploadedFile = (file) => {
    return new Promise((res, rej) => {
        imagekit.upload({
           file: file.buffer,             
            fileName: file.originalname,   
            folder: "/angry-songs"

        }, function(error, result) {
            if (error) {
                rej(error);
            } else {
                res(result);
            }
        });
    });
};

module.exports = uploadedFile;

