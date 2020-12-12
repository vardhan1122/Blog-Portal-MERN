import React from "react";
import {Link} from 'react-router-dom';
import Axios from "axios";

class BlogAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blogs : [],
            errorMessage : ''
        }
    }

    componentDidMount() {
        this.getBlogs();
    }

    // get all blogs
    getBlogs = () => {
        let dataURL = `http://127.0.0.1:5000/api/blogs`;
        Axios.get(dataURL).then((response) => {
            this.setState({
                blogs : response.data
            });
        }).catch((err) => {
            this.setState({
                errorMessage : err
            });
        });
    };

    // deleteBlog
    deleteBlog = (blogId) => {
        let dataURL = `http://127.0.0.1:5000/api/blogs/${blogId}`;
        Axios.delete(dataURL).then((response) => {
            this.getBlogs();
        }).catch((err) => {
            this.setState({
                errorMessage : err
            });
        });
    };

    render() {
        return (
            <React.Fragment>

                <section className="bg-admin">

                <div className="container-fluid">
                    <div className="row animated slideInLeft">
                        <div className="col">
                            <p className="h2 text-white">Admin Blog</p>
                            <Link to="/create-blog" className="btn btn-success btn-sm">Create Blog</Link>
                        </div>
                    </div>
                    <div className="row mt-3 animated zoomIn delay-1s">
                        <div className="col">

                        <div id="table-wrapper">
                        <div id="table-scroll">

                            <table className="table table-hover text-center table-striped table-success">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th>SNO</th>
                                        <th>Blog-Image</th>
                                        <th>Title</th>
                                        <th>Heading</th>
                                        <th>Info</th>
                                        <th>Info URL</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       this.state.blogs.length > 0 ?
                                           <React.Fragment>
                                               {
                                                   this.state.blogs.map((blog) => {
                                                       return (
                                                           <tr key={blog._id}>
                                                               <td>{blog._id.substr(blog._id.length - 4)}</td>
                                                               <td>
                                                                   <img src={blog.image} alt="" width="70" height="70"/>
                                                               </td>
                                                               {/* <td>
                                                                   <img src={blog.imgURL} alt="" width="70" height="70"/>
                                                               </td> */}
                                                               <td>{blog.name}</td>
                                                               <td>{blog.heading}</td>
                                                               <td>{blog.info.slice(0,9)}...</td>
                                                               <td><a href={blog.infoURL} alt="" target="_blank">Info-URL</a></td>
                                                               <td>{blog.created}</td>

                                                               <td>
                                                                   <Link to={`/update-blog/${blog._id}`} className="btn btn-secondary btn-sm text-white">Update</Link>
                                                                   <button onClick={this.deleteBlog.bind(this, blog._id)} className="btn btn-danger btn-sm text-white">Delete</button>
                                                               </td>
                                                           </tr>
                                                       )
                                                   })
                                               }
                                           </React.Fragment> : <React.Fragment>
                                            <tr>
                                                <td colSpan="6" className="text-danger font-weight-bold">------------- No Blogs are Available ------------ </td>
                                            </tr>
                                           </React.Fragment>
                                    }
                                </tbody>
                            </table>

                            </div>
                            </div>

                        </div>
                    </div>
                </div>

                </section>
            </React.Fragment>
        );
    }
}
export default BlogAdmin;
