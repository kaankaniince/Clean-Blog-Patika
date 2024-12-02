const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const BlogSchema = new Schema({
  title: String,
  detail:String
},{
    timestamps:true
}
);

const Blog = mongoose.model("Blogss", BlogSchema);

module.exports = Blog;
