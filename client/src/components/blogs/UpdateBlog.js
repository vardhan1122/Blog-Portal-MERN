import React from "react";
import Axios from "axios";
import {Redirect} from 'react-router-dom';

class UpdateBlog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedBlog : {
                name : '',
                image : '',
                heading : '',
                info : '',
                infoURL:''
            },
            errorMessage : ''
        }
    }

    componentDidMount() {
        let blogId =  this.props.match.params.id;
        let dataURL = `http://127.0.0.1:5000/api/blogs/${blogId}`;
        Axios.get(dataURL).then((response) => {
            this.setState({
                selectedBlog : response.data
            });
        }).catch((err) => {
            this.setState({
                errorMessage : err
            });
        });
    }

    // changeInput
    changeInput = (event) => {
        this.setState({
            selectedBlog : {
                ...this.state.selectedBlog,
                [event.target.name] : event.target.value
            }
        });
    };

    // changeImage
    changeImage = async (event) => {
        let imageFile = event.target.files[0];
        let base64Image = await this.base64Image(imageFile);
        this.setState({
            selectedBlog : {
                ...this.state.selectedBlog,
                image : base64Image
            }
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
        let dataURL = `http://127.0.0.1:5000/api/blogs/${this.state.selectedBlog._id}`;
        Axios.put(dataURL, this.state.selectedBlog).then((response) => {
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
                    this.state.isSubmitted ? <Redirect to='/admin'/> :

                        <div className="container mt-3">
                            <div className="row animated slideInLeft">
                                <div className="col">
                                    <p className="lead">Updated-Blog</p>
                                </div>
                            </div>
                            <div className="row animated flipInY delay-1s">
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-header bg-secondary text-white">
                                            <p className="h4">Update Blog</p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.submitBlog}>
                                                <div className="form-group">
                                                    <input
                                                        name="name"
                                                        value={this.state.selectedBlog.name}
                                                        onChange={this.changeInput}
                                                        type="text" className="form-control" placeholder="Blog Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-file">
                                                        <input
                                                            onChange={this.changeImage}
                                                            type="file" className="custom-file-input" id="customFile"/>
                                                        <label className="custom-file-label" htmlFor="customFile">Blog
                                                            Image</label>
                                                        {
                                                            this.state.selectedBlog.image &&
                                                            <img src={this.state.selectedBlog.image} alt=""
                                                                 width="20" height="20"/>
                                                        }
                                                    </div>
                                                </div>
                                                

                                                <div className="form-group">
                                                    <input
                                                        name="heading"
                                                        value={this.state.selectedBlog.heading}
                                                        onChange={this.changeInput}
                                                        type="string" className="form-control" placeholder="heading..."/>
                                                </div>

                                               

                                                <div className="form-group">
                                                    <textarea
                                                    name="info"
                                                    value={this.state.selectedBlog.info}
                                                    onChange={this.changeInput}
                                                    className="form-control" rows="3" placeholder="General Info"/>
                                                </div>

                                                        
                                                <div className="form-group">
                                                    <input
                                                        name="infoURL"
                                                        value={this.state.selectedBlog.infoURL}
                                                        onChange={this.changeInput}
                                                        type="string" className="form-control" placeholder="Please Given InfoURL..."/>
                                                </div>
                                                {/* <div className="form-group">
                                                    <input
                                                        name="created"
                                                        value={this.state.selectedBlog.created}
                                                        onChange={this.changeInput}
                                                        type="date" className="form-control" placeholder="update"/>
                                                </div> */}

                                                <div className="form-group">
                                                    <input type="submit" className="btn btn-secondary btn-sm"
                                                           value="Update Blog"/>
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
export default UpdateBlog;
