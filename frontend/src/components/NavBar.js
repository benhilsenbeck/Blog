import {Navbar, Nav} from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import HomePage from "./HomePage"
import Blogs from "./Blogs"
// import CreateAccount from "./CreateAccount"

function NavBar() {

    return (
        <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navBarLinks">
          <Nav.Item className="homeLink"><Link to ="/" className="link" style={{ textDecoration: 'none' }}>Home</Link></Nav.Item>
          <Nav.Item className="homeLink"><Link to ="/blogs" className="link" style={{ textDecoration: 'none' }}>Reviews</Link></Nav.Item>
          <Nav.Item className="homeLink"><Link to ="/polls" className="link" style={{ textDecoration: 'none' }}>Polls</Link></Nav.Item>
          </Nav>
          <Nav className="navBarSearch ml-auto">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></span>
            </div>
            <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
          </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/blogs' component={Blogs} />
      </Switch>
      </Router>
    );
  }

export default NavBar;