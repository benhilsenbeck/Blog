import { useEffect, useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router";
import "../static/css/blog.scss";

function Blogs() {
    const history = useHistory();
    var blogUrl = window.location.href
    var startIndex = blogUrl.lastIndexOf('/');
    blogUrl = blogUrl.substring(startIndex + 1)
    const [blogContent, setBlogContent] = useState({
        blogId: null,
        blogName: null,
        blogAuthor: null,
        blogContent: null,
        dateOfPublish: null,
        Updated: null

    })

    async function getBlogId() {
        await axios.get('http://127.0.0.1:8000/blogSpecific/' + blogUrl)
            .then(res => {
                setBlogContent({
                    blogId: res.data.blogId,
                    blogName: res.data.Name,
                    blogAuthor: res.data.Author,
                    blogContent: res.data.Content,
                    dateOfPublish: res.data.dateOfPublish,
                    Updated: res.data.Updated,
                })
        }).catch(error => {
            if (error.response.status === 500) {
                history.push("/")
            }
            console.log(error.response.status)
        })
    }


    useEffect(() => {
        getBlogId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
   
 return (
     <div className="container">
     <div className="blogContent">
         <p className="blogTitle">{blogContent.blogName}</p>
         <div className="blogBody">
         <div dangerouslySetInnerHTML={{ __html: blogContent.blogContent }} />
         </div>
     </div>
     </div>
 )
}

export default Blogs;