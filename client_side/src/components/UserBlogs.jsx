import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "./settings";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (blogId, userId) => {
    navigate(`/update-blog/${blogId}`);
  };

  const handleDelete = async (blogId, userId) => {
    try {
      const { data } = await axios.delete(
        `${apiBaseUrl}/api/v1/blog//delete-blog/${blogId}`
      );
      if (data.success) {
        toast.success("Your Blog has been Deleted");
        getUserBlogs();
        navigate("/user-blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `${apiBaseUrl}/api/v1/blog/user-blog/${id}`
      );
      if (data.success) {
        setUserBlogs(data.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  // Rest of your component code

  // Calculate formattedBlogs directly when rendering
  const formattedBlogs = userBlogs.map((blog) => {
    const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return {
      ...blog,
      createdAt: formattedDate,
    };
  });

  console.log(formattedBlogs); // Check the formattedBlogs array in the console
  return (
    <div className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {userBlogs && userBlogs.length > 0 ? (
            formattedBlogs.map((post) => (
              <article
                key={post._id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <img className="rounded-lg" src={post.image} alt="" />
                <div className="flex items-center gap-x-4 text-xs">
                  <time className="text-gray-500">{post.createdAt}</time>
                </div>
                <div className="group">
                  <div className="flex justify-center items-center gap-28">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <span className="inset-0" />
                      {post.title}
                    </h3>
                    <div className="buttons flex justify-between items-center gap-4">
                      <button
                        type="button"
                        className="text-3xl text-blue-600 mt-3"
                        onClick={() => handleEdit(post._id, post.user)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post._id, post.user)}
                        className="text-3xl text-red-600 mt-3 hover:text-red-400"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>

                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      POST. AUTHOR NAME
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <h1>You have not created any blog</h1>
          )}
        </div>
      </div>
    </div>
  );
}
