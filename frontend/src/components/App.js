import '../App.css';
import NavBar from "./NavBar"
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import HomePage from "./HomePage"
import Blogs from "./Blogs"
import Polls from './Polls'
import BlogCategory from './BlogCategory';

function App() {
  
  return (
    <div className="App">
      <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/blogs/category' component={BlogCategory} />
        <Route path='/blogs' component={Blogs} />
        <Route path='/polls' component={Polls} />
      </Switch>
    </Router>
    </div>
  );
    
}

export default App;
