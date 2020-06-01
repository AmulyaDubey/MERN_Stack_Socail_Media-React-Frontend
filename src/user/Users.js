import React, {Component} from 'react';
import {list} from './apiUser'
import defaultProfile from '../images/avatar.jpg'
import {Link} from 'react-router-dom';

class Users extends Component{
    constructor(){
        super();
        this.state={
            users:[]
        }
    }
    componentDidMount(){
        list().then(data =>{
            if(data.error)console.log(data.error)
            else this.setState({users:data})
        })
    }

    renderUsers= users =>(
        <div className="row">
            {this.state.users.map((user,i)=>(
                    <div className="card col-md-3 mt-5 ml-5" key={i} >
                        <img className="card-img-top" src={defaultProfile}  />
                        <div className="card-body">
                             <h5 className="card-title">{user.name}</h5>
                             <p className="card-text">{user.email}</p>
                             <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-sm">Visit Profile</Link>
                        </div>
                    </div>
             ))}
                    
        </div>
    )
    render(){
         return(
            <div className="container">
                <h2 className="mt-5 mb-5">All Users:</h2>
                {this.renderUsers(this.state.users)}
            </div>
        )
    }
}
export default Users