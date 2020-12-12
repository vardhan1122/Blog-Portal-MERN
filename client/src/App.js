import React from 'react';
import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";

import BlogList from "./components/blogs/BlogList";
import BlogAdmin from "./components/blogs/BlogAdmin";
import CreateBlog from "./components/blogs/CreateBlog";
import UpdateBlog from "./components/blogs/UpdateBlog";

class App extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/blogs' component={BlogList}/>
                        <Route exact path='/admin' component={BlogAdmin}/>
                        <Route exact path='/create-blog' component={CreateBlog}/>
                        <Route exact path='/update-blog/:id' component={UpdateBlog}/>
                    </Switch>
                </Router>
            </div>
        );
    }

}
export default App;
