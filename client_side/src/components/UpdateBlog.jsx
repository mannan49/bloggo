import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "./settings";
import { toast } from "react-hot-toast";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const [singleBlog, setSingleBlog] = useState({});
  const { id } = useParams();
  const handleChange = (e) => {
    setSingleBlog((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${apiBaseUrl}/api/v1/blog/update-blog/${id}`,
        {
          title: singleBlog.title,
          description: singleBlog.description,
          image: singleBlog.image,
          user: id,
        }
      );
      if (data.success) {
        toast.success("Your Blog has been updated");
        navigate("/user-blog");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getBlogById = async () => {
    try {
      const { data } = await axios.get(
        `${apiBaseUrl}/api/v1/blog/get-blog/${id}`
      );
      if (data.success) {
        setSingleBlog(data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogById();
  }, [id]);
  return (
    <div className="max-w-lg mx-auto mt-3">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title" // Corrected name attribute
            placeholder="Enter the title"
            value={singleBlog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            rows="4"
            name="description" // Corrected name attribute
            placeholder="Enter the description"
            value={singleBlog.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="text"
            name="image" // Corrected name attribute
            placeholder="Enter the image URL"
            value={singleBlog.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
