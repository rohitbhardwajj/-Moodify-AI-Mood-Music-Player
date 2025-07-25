
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : "public_q9Ji2iYhYOs4h92poLfzLIble34=",
    privateKey : "private_kO79TwlaqtMuiEgguL8Uitis/Ps=",
    urlEndpoint : "https://ik.imagekit.io/72xqhcqmo"
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

