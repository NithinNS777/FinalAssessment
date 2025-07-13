const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://db_nithin:neethu@cluster0.bjm6zyj.mongodb.net/BlogAppDB?retryWrites=true&w=majority&appName=Cluster0')  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
