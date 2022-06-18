import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import { setCategoryPolls, setCategoryBlog } from '../actions';
// import CreateAccount from "./CreateAccount"

function NavBar() {

  let dispatch = useDispatch()
  const history = useHistory();
  
  const setCategory = (category) => {
    if (window.location.href === "http://localhost:3000/polls") {
      window.location.reload()
    } else {
      // do nothing I don't need to reload the page
    }
    dispatch(setCategoryPolls(category))
    history.push('/polls')
  }

  const setBlogCategory = (category) => {
    if (window.location.href === "http://localhost:3000/blogs/category") {
      window.location.reload()
    } else {
      // do nothing I don't need to reload the page
    }
    dispatch(setCategoryBlog(category))
    history.push('/blogs/category')
    
  }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navBarLinks">
          <Nav.Item className="homeLink"><Link to ="/" className="link" style={{ textDecoration: 'none' }}>Home</Link></Nav.Item>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Reviews">
            <NavDropdown.Item onClick={() => setBlogCategory("Games")}>Games</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setBlogCategory("Hardware")}>Tech</NavDropdown.Item>
          </NavDropdown>
          {/* <Nav.Item className="homeLink"><Link to ="/polls" className="link" style={{ textDecoration: 'none' }}>Polls</Link></Nav.Item> */}
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Polls">
            <NavDropdown.Item onClick={() => setCategory("Streamers")}>Streamers</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setCategory("Games")}>Games</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setCategory("Hardware")}>Tech</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          <Nav className="navBarSearch ml-auto">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></span>
            </div>
            <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
          </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

export default NavBar;