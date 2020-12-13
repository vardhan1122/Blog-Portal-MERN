import React from "react";
import Axios from "axios";
import dateFormat from 'dateformat';

class BlogList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blogs : [],
            errorMessage : ''
        }
    }

    //once page is loaded ,getting data
    componentDidMount() {
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

       
    }

 getDate=()=>{
        this.state.blogs.created.getFullYear()
    }


    render() {
        return (
            <React.Fragment>
            <div className="blog-page">

                <div className="container">
                    <div className="row animated slideInLeft">
                        <div className="col">
                            <p className="h2 text-black">Blog Details</p>
                        </div>
                    </div>
                    <div className="row animated zoomIn delay-1s">
                        {
                            this.state.blogs.length > 0 ?
                                <React.Fragment>
                                    {
                                        this.state.blogs.map((blog) => {
                                            return (
                                                // <React.Fragment>
                                                   
                                                <div className="col-md-12" key={blog._id}>

                                                    <div className="card mt-3">
                                                        
                                                        <div className="card-header text-center bg-warning text-white">
                                                            <div> <span className="topic">Topic</span> : <span className="topic-text">{blog.name}</span></div>
                                                        </div>

                                                        <div className="card-body bg-info text-white">
                                                            {/* <div className="container-fluid"> */}
                                                                <div className="row flex-column-reverse flex-md-row">
                                                                    <div className="col-md-7">
                                                                    <span><span className="heading">Heading</span> : <span className="heading-text">{blog.heading}</span></span><br/>
                                                                    <span className="info">Info</span> : <span className="info-text">{blog.info}</span>
                                                                    </div>

                                                                    <div className="col-md-5">
                                                                    <img className="img-fluid blog-image" src={blog.image} alt="" width="400" height="250"/>
                                                                    </div>
                                                                </div>
                                                            {/* </div> */}
                                                        </div>

                                                        <div className="card-footer bg-success text-white">
                                                           <a className="infoURL" href = {blog.infoURL} alt="" target="_blank">continue reading..</a>
                                                             <span className="float-right"><span className="created">Created at</span> : <span className="created-text"> {dateFormat(blog.created,"mmm dS, yyyy, hh:mm:ss TT")}</span></span>
                                                        </div>

                                                    </div>
                                                </div>
                                            
                                                // </React.Fragment>
                                            )
                                        })
                                    }
                                </React.Fragment> : null
                        }
                    </div>
                </div>

            </div>
            </React.Fragment>
        );
    }
}
export default BlogList;
