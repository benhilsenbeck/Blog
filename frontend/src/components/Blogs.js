import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux';
import "../static/css/blog.scss";
let Filter = require('bad-words')
const config = require('./constants').config()

function Blogs() {
  const history = useHistory();
  const [blogContent, setBlogContent] = useState({
    blogId: null,
    blogName: null,
    blogAuthor: null,
    blogContent: null,
    dateOfPublish: null,
    Updated: null,
  });
  let [comment, setComment] = useState(null)
  let [blogComments, setBlogComments] = useState(null)
  const blogIDIsSet = useSelector(state => state.setBlogId)
  

  async function getBlogId() {
    console.log(blogIDIsSet)
    await axios
      .get(config.API_URL + "blogSpecific/" + blogIDIsSet)
      .then((res) => {
        setBlogContent({
          blogId: res.data.blogId,
          blogName: res.data.Name,
          blogAuthor: res.data.Author,
          blogContent: res.data.Content,
          dateOfPublish: res.data.dateOfPublish,
          Updated: res.data.Updated,
        });
      })
      .catch((error) => {
        if (error.response.status === 500) {
          history.push("/");
        }
        console.log(error.response.status);
      });
  }

  const getComments = async () => {
      await axios.get(config.API_URL + "blog/comments", {
          params: {
            blogID_id: blogIDIsSet
          }
      })
      .then((res) => {
          setBlogComments(res.data)
      })
  }

  useEffect(() => {
    getBlogId();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const checkComment = async (text) => {
    let filter = new Filter();
    let result = filter.clean(text);
    return result
  } 

  const handleSubmit = async (e) => {
      e.preventDefault();
      let result = await checkComment(comment)
      console.log(result)
      await axios.post(config.API_URL + "blog/comments", {
          blogID_id:  blogIDIsSet,
          comment: result,
      })
      await getComments()
      document.getElementById("commentBox").value="";
  }

  return (
    <div className="container">
      <div className="blogContent">
        <p className="blogTitle">{blogContent.blogName}</p>
        <div className="blogBody">
          <div dangerouslySetInnerHTML={{ __html: blogContent.blogContent }} />
        </div>
        <hr/>
      </div>
      <div className="commentSection col-12">
      <p className="commentTitle col-12" id="commentTitle">Leave a comment:</p>
        <form className="col-12" onSubmit={handleSubmit}>
            <div className='commentMain'>
                <textarea className="form-control commentBox" id="commentBox" rows="4" placeholder="comment..." onChange={e =>setComment(e.target.value)}></textarea>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
        <div className="postedComments col-12" id="postedComments">
            {blogComments && blogComments.map((blogComments, index) => {
                return (
                    <div className="commentText" key={index}>
                        {blogComments.comment}
                        <hr/>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
