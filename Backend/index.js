const express = require("express");
const cors = require("cors");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());
require("./connection");
const BlogModel = require("./model");


//Write your POST API here

app.post("/add", async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.send({ message: "Blog added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding blog" });
  }
});
app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    let blog = await BlogModel.findById(req.params.id);
    res.send(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching blog data" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Blog updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating blog" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting blog" });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
