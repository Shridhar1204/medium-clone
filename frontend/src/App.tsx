import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import CreateBlog from "./pages/Publish";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Global Toaster for alerts */}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/new-blog" element={<CreateBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
