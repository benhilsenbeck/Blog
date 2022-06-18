import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../static/css/blogCategory.scss'
import {Link} from "react-router-dom";
// import readCookie from './ReadCookie'
import {useSelector, useDispatch} from 'react-redux';
import { setBlogID } from "../actions";
const config = require('./constants').config()

const BlogCategory = () => {
    const categoryBlogSet = useSelector(state => state.setBlogCategory)
    let dispatch = useDispatch()
    const [blogs, setBlogs] = useState(null)

    const getBlogs = async() => {
        console.log(categoryBlogSet)
        await axios.get(config.API_URL + "blog/category", {
            params: {
                Category: categoryBlogSet
            }
        }).then (res => {
            console.log(res.data)
            setBlogs(res.data)
        })
    }

    useEffect(() => {
        getBlogs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return(
        <div className="container blogContainer">
        <div className="row">
        <div className="images col-12">
        <div className="row">
        {blogs && blogs.map((blog, index) => {
            return (
              <div className="blog col-6" key={index}>
                <Link to={"/blogs/" + blog.Name.split(' ').join('')} onClick={() => {dispatch(setBlogID(blog.blogId))}}><img src={config.API_URL +  "media/" + blog.ImageName} alt="blogImg"/></Link>
                <p className="blogName">{blog.Name}</p>
              </div>
            );
          })}
        </div>
        </div>
        </div>
        </div>
    )
}

export default BlogCategory