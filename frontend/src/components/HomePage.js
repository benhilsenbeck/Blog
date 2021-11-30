import { useEffect, useState } from "react";
import { Carousel, Jumbotron, Container } from "react-bootstrap";
import Image1 from "../static/Images/pic1.jpg";
import Image2 from "../static/Images/pic2.jpg";
import Image3 from "../static/Images/pic3.jpg";
import "../static/css/homePage.scss";
import axios from 'axios'
import {Link} from "react-router-dom";
const config = require('./constants').config()

function HomePage() {

    const [blogs, setBlogs] = useState(null);
  
    async function getBlogInfo() {
     await axios.get(config.API_URL + 'blog')
      .then(res => {
          setBlogs(res.data)
          console.log(res.data)
      })
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
            <input type="email" className="form-control emailInput" placeholder="name@example.com"></input>
        </Container>
        </Jumbotron>
        <div className="container blogContainer">
        <div className="row">
        <div className="images col-12">
        <div className="row">
        {blogs && blogs.map((blog, index) => {
            return (
              <div className="blog col-6" key={index}>
                <Link to={"blogs/" + blog.blogId}><img src={config.API_URL +  "media/" + blog.ImageName} alt="blogImg"/></Link>
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
