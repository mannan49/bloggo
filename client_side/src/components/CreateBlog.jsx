import axios from "axios";
import React, { useState } from "react";
import { apiBaseUrl } from "./settings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from './Loader';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    user: "",
    name: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const id = localStorage.getItem("userId");
      const { data } = await axios.post(
        `${apiBaseUrl}/api/v1/blog/create-blog`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data.success) {
        toast.success("Your Blog has been created");
        navigate("/user-blog");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            value={inputs.title}
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
            value={inputs.description}
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
            value={inputs.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoading ? <Loader /> : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
