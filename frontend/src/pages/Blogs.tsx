import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {

    const {loading, blogs} = useBlogs()

    if(loading) return <div>
        loading...
    </div>
  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center">
        <div className="">
          {blogs.map(blog => <BlogCard
            id = {blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.createdAt}
          />
          )}
        </div>
      </div>
    </div>
  );
};
