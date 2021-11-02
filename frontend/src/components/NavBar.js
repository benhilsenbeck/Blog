import {Navbar, Nav} from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import HomePage from "./HomePage"
import Blogs from "./Blogs"
import CreateAccount from "./CreateAccount"

function NavBar() {

    return (
        <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
          <Nav.Item className="homeLink"><Link to ="/" className="link" style={{ textDecoration: 'none' }}>Home</Link></Nav.Item>
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