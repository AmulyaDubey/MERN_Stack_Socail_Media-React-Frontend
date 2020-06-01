import React, {Component} from 'react';
import {isAuthenticated} from '../auth'
import {Redirect, Link} from 'react-router-dom';
import {read} from './apiUser'
import defaultProfile from '../images/avatar.jpg'


class Profile extends Component{
    constructor(){
        super();
        this.state={
            user:"",
            redirectToSignin: false
        }
    }

    init= userId =>{
        const token=isAuthenticated().token;
        read( userId, token).then( data =>{
            if(data.error) this.setState({redirectToSignin:true})
            else this.setState({user: data})
        });
    }

    componentDidMount(){
        const userId=this.props.match.params.userId;
        this.init(userId);
    }
    
    componentWillReceiveProps(props){
        const userId=props.match.params.userId;
        this.init(userId);
    }

    render(){
        if(this.state.redirectToSignin)
        return <Redirect to="/signin" />
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img src={defaultProfile} alt={this.state.user.name} style={{widht: "100%", height: "25vw", objectFit: "cover"}}/>
                    </div>
                    <div className="col-md-6">
                        <div class="lead">
                        <p>Hello {this.state.user.name}</p>
                        <p>Email: {this.state.user.email}</p>
                        <p>{`Joined: ${new Date(this.state.user.created).toDateString()}`}</p>
                        {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id &&(
                            <div className="d-inline-block mt-5">
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${this.state.user._id}`}>Edit Profile</Link>
                                <button className="btn btn-raised btn-danger mr-5">Delete Profile</button>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default Profile