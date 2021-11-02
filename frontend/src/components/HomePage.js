import { useEffect, useState } from "react";
import { Carousel, Jumbotron, Container } from "react-bootstrap";
import Image1 from "../static/Images/pic1.jpg";
import Image2 from "../static/Images/pic2.jpg";
import Image3 from "../static/Images/pic3.jpg";
import "../static/css/homePage.scss";
import axios from 'axios'
import {Link} from "react-router-dom";

function HomePage() {

    const [blogs, setBlogs] = useState(null);
  
    async function getBlogInfo() {
     await axios.get('http://127.0.0.1:8000/blog')
      .then(res => {
          setBlogs(res.data)
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
        <div className="images col-9">
        <div className="row">
        {blogs && blogs.map((blog, index) => {
            return (
              <div className="blog col-6" key={index}>
                <Link to={"blogs/" + blog.blogId}><img src={"http://127.0.0.1:8000/media/" + blog.ImageName} alt="somethingHere"/></Link>
                <p className="blogName">{blog.Name}</p>
              </div>
            );
          })}
        </div>
        </div>
          <div className="listOfBlogs col-3">
            <p><a href="#">blog 1</a></p>
            <p><a href="#">blog 2</a></p>
            <p><a href="#">blog 3</a></p>
            <p><a href="#">blog 4</a></p>
            <p><a href="#">blog 5</a></p>
          </div>


        </div>
        </div>
      </div>

      
  );
}

export default HomePage;
