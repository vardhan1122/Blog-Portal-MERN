import React from "react";
import Axios from "axios";
import {Redirect} from 'react-router-dom';

class CreateBlog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blog : {
                name : '',
                image : '',
                heading : '',
                info : '',
                infoURL : ''
                // timeCreate:''
            },
            isSubmitted : false,
            errorMessage : ''
        };
    }

    // changeInput
    changeInput = (event) => {
        this.setState({
            blog : {
                ...this.state.blog,
                [event.target.name] : event.target.value
            }
        });
    };

    // changeImage
    changeImage = async (event) => {
        let imageFile = event.target.files[0];
        let base64Image = await this.base64Image(imageFile);
        this.setState({
            blog : {
                ...this.state.blog,
                image : base64Image
            },
            isSubmitted : false,
            errorMessage : ''
        });
    };
    
    // get the base64 string of the image
    base64Image = (imageFile) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.addEventListener('load', () => {
                if(reader.result){
                    resolve(reader.result);
                }
                else {
                    reject('Error Occured');
                }
            });
        });
    };

    // submitBlog
    submitBlog = (event) => {
        event.preventDefault();
        let dataURL = `http://127.0.0.1:5000/api/blogs/`;
        Axios.post(dataURL, this.state.blog).then((response) => {
            this.setState({
                isSubmitted : true
            });
        }).catch((err) => {
            this.setState({
                errorMessage : err
            });
        });
    };

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isSubmitted ? <Redirect to="/admin"/> :

                        <div className="container mt-3">
                            <div className="row animated slideInLeft">
                                <div className="col">
                                    <p className="lead">Create-Blog</p>
                                </div>
                            </div>
                            <div className="row animated flipInY delay-1s">
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-header bg-dark text-white">
                                            <p className="h4">Create Blog</p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.submitBlog}>
                                               
                                                <div className="form-group">
                                                    <input required
                                                           name="name"
                                                           value={this.state.blog.name}
                                                           onChange={this.changeInput}
                                                           type="text" className="form-control"
                                                           placeholder="Blog Name"/>
                                                </div>

                                                <div className="form-group">
                                                    <div className="custom-file">
                                                        <input required
                                                               onChange={this.changeImage}
                                                               type="file" className="custom-file-input"
                                                               id="customFile"/>
                                                        <label className="custom-file-label" htmlFor="customFile">Blog
                                                            Image</label>
                                                        {
                                                            this.state.blog.image &&
                                                            <img src={this.state.blog.image} alt="" width="20"
                                                                 height="20"/>
                                                        }
                                                    </div>
                                                </div>

                                            {/* Taking image URL */}
                                                {/* <div className="form-group">
                                                        <input
                                                              name="imgURL"
                                                              value={this.state.blog.imgURL}
                                                              onChange={this.changeInput}
                                                              type="" className="form-control" placeholder="Give imgURL"/>
                                         
                                                        {
                                                            this.state.blog.imgURL &&
                                                            <img src={this.state.blog.imgURL} alt="" width="20"
                                                                 height="20"/>
                                                        }
                                                </div> */}
                                            

                                                <div className="form-group">
                                                    <input required
                                                           name="heading"
                                                           value={this.state.blog.heading}
                                                           onChange={this.changeInput}
                                                           type="String" className="form-control" placeholder="heading.."/>
                                                </div>
                    
                                                <div className="form-group">
                                                 <textarea required
                                                      name="info"
                                                      value={this.state.blog.info}
                                                      onChange={this.changeInput}
                                                      className="form-control" rows="4" placeholder="General Info"/>
                                                </div>

                                                <div className="form-group">
                                                        <input
                                                              name="infoURL"
                                                              value={this.state.blog.infoURL}
                                                              onChange={this.changeInput}
                                                              type="String" className="form-control" placeholder="Give infoURL"/>
                                                </div> 

                                                {/* <div className="form-group">
                                                    <input required
                                                           name="created"
                                                           value={this.state.blog.created}
                                                           onChange={this.changeInput}
                                                           type="date" className="form-control"
                                                           placeholder="update time"/>
                                                </div> */}

                                                <div className="form-group">
                                                    <input type="submit" className="btn btn-dark btn-sm"
                                                           value="Create Blog"/>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                }
                <div style={{marginBottom : '100px'}}/>
            </React.Fragment>
        );
    }
}
export default CreateBlog;
