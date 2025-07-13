const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;