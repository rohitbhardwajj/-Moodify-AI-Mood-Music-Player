const mongoose = require('mongoose');

const connectDb = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((err) => {
      console.log("DB Connection Failed", err);
    });
};

module.exports = connectDb;
