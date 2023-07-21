import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import UserBlogsPage from "./pages/UserBlogsPage";
import UpdateBlogPage from "./pages/UpdateBlogPage";
import Protected from "./components/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "/create",
    element: (
      <Protected>
        <CreateBlogPage />
      </Protected>
    ),
  },
  {
    path: "/user-blog",
    element: (
      <Protected>
        <UserBlogsPage />
      </Protected>
    ),
  },
  {
    path: "/update-blog/:id",
    element: (
      <Protected>
        <UpdateBlogPage />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
