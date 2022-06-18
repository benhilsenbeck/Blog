import { useEffect, useState } from "react";
import { Carousel, Jumbotron, Container } from "react-bootstrap";
import Image1 from "../static/Images/pic1.jpg";
import Image2 from "../static/Images/pic2.jpg";
import Image3 from "../static/Images/pic3.jpg";
import "../static/css/homePage.scss";
import axios from 'axios'
import {Link} from "react-router-dom";
import {useDispatch} from 'react-redux';
import { setBlogID } from "../actions";
const config = require('./constants').config()

function HomePage() {

    const [blogs, setBlogs] = useState(null);
    const [email, setEmail] = useState('')
    let dispatch = useDispatch()
  
    async function getBlogInfo() {
     await axios.get(config.API_URL + 'blog')
      .then(res => {
          setBlogs(res.data)
      })
  }

  const checkEmail = async(text) => {
      var re = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
      return re.test(text)
  }

  const sendEmail = async(e) => {
    e.preventDefault();
    console.log('The form was submitted with email: ', email)
    let emailCheckResult = await checkEmail(email)
    if (emailCheckResult === true) {
      await axios.post(config.API_URL + 'blog/email',  {
        Email: email
      }).then (res => {
        console.log(res.data)
      })
      console.log("Valid email")
    } else {
      console.log("Not a valid email!")
    }

    
  }
  
  useEffect(() => {
    getBlogInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    return (
    <div className="homePageBackground">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={Image1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Image2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Image3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <Jumbotron fluid>
        <Container>
            <h3>Get notified when new content gets released!</h3>
            <form onSubmit={sendEmail}>
            <input type="email" className="form-control emailInput" placeholder="name@example.com" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            <button type="submit"></button>
            </form>
        </Container>
        </Jumbotron>
        <div className="container blogContainer">
        <div className="row">
        <div className="images col-12">
        <div className="row">
        {blogs && blogs.map((blog, index) => {
            return (
              <div className="blog col-6" key={index}>
                <Link to={"blogs/" + blog.Name.split(' ').join('')} onClick={() => {dispatch(setBlogID(blog.blogId))}}><img src={config.API_URL +  "media/" + blog.ImageName} alt="blogImg"/></Link>
                <p className="blogName">{blog.Name}</p>
              </div>
            );
          })}
        </div>
        </div>
        </div>
        </div>
      </div>

      
  );
}

export default HomePage;
