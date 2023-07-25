const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user", "username");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "Lists of All Blogs is Here",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Gettting Blogs",
      error,
    });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id).populate("user", "username");
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "No blogs Found By this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Single Blog has been fethced By Id",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Getting Single Blog By Id",
      error,
    });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields of blog",
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "Unable to Find User",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    const populatedBlog = await blogModel
      .findById(newBlog._id)
      .populate("user", "username");
    return res.status(200).send({
      success: true,
      message: "Blog has been created",
      newBlog: populatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating Blog",
      error,
    });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel
      .findByIdAndUpdate(id, { title, description, image }, { new: true })
      .populate("user", "username");
    return res.status(200).send({
      success: true,
      message: "Blog updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Updating Blog",
      error: error,
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const blogToDelete = await blogModel
      .findById(req.params.id)
      .populate("user");
    if (!blogToDelete) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    await blogModel.deleteOne({ _id: blogToDelete._id });
    await blogToDelete.user.blogs.pull(blogToDelete._id);
    await blogToDelete.user.save();

    return res.status(200).send({
      success: true,
      message: "Blog has been deleted by this ID",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Deleting Blog",
      error: error,
    });
  }
};

// GET USER BLOGS

exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate({
      path: "blogs",
      populate: {
        path: "user",
        select: "username", // Include only the 'username' field of the user in the populated blogs
      },
    });

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blogs not found with this ID",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blogs of user found",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting user blogs",
      error,
    });
  }
};
