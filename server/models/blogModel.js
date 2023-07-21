const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is Required"] },
    description: { type: String, required: [true, "Description is Required"] },
    image: { type: String, required: [true, "Image is Required"] },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
