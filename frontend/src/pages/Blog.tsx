import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
//atomFamilies/selector families


export const Blog= () => {
    const { id } = useParams();
    const {loading,blog} = useBlog({
        id: id || ""
    });
    if(loading) {
        return <div>
            loading...
        </div>
    }
    return <div>
         <FullBlog blog={blog} />
    </div>
}