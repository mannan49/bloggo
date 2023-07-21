const express = require("express");
const {
  getAllBlogsController,
  getBlogByIdController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");
const router = express.Router();

router.get("/all-blogs", getAllBlogsController);
router.get("/get-blog/:id", getBlogByIdController);
router.post("/create-blog", createBlogController);
router.put("/update-blog/:id", updateBlogController);
router.delete("/delete-blog/:id", deleteBlogController);
router.get("/user-blog/:id", userBlogController);

module.exports = router;
