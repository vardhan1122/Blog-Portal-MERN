import React from "react";

class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
                {/* <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12"> */}
                        <section className="home-image">

                            <div className="landing-page">
                                <div className="wrapper">
                                    <div className="d-flex flex-column text-center justify-content-center align-items-center">
                                        <h2 className="display-4 animated slideInDown font-weight-bold">
                                        <i className="fa fa-blog"/> Blog's MERN</h2>
                                        <p className="px-3 animated slideInUp">A blog (a shortened version of “weblog”) is an online journal or informational website displaying information in the reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject.</p>
                                        <p className="px-3 animated slideInUp">So, the main purpose of a blog is to connect you to the relevant audience. Another one is to boost your traffic and send quality leads to your website.</p>
                                        <p className="px-3 animated slideInUp">The more frequent and better your blog posts are, the higher the chances for your website to get discovered and visited by your target audience. This means that a blog is an effective lead generation tool. Add a great call to action (CTA) to your content, and it will convert your website traffic into high-quality leads. A blog also allows you to showcase your niche authority and build a brand.</p>
                                    </div>  
                                </div>
                            </div>
                        {/* </div>
                    </div>
                </div> */}
               </section>
            </React.Fragment>
        );
    }
}
export default Home;
