import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {signin, authenticate} from '../auth'


class Signin extends Component{
    constructor(){
        super()
        this.state={
            email:"",
            password:"",
            error:"",
            redirectToReferer: false
        }
    }
    handleChange=(name) =>(event) =>{
        this.setState({error:""});
        this.setState({[name]:event.target.value});
    }

    

    clickSubmit=event =>{
        event.preventDefault();
        const {email, password}= this.state
        const user={email,password}

        signin(user).then(data =>{
            if (data.error) this.setState({error: data.error});
            else {
                    authenticate(data,()=>{
                    this.setState({redirectToReferer:true})
                })
            }
        });
    
    }
    
    render(){
        const {email,password, error, redirectToReferer}=this.state
        
        if(redirectToReferer){
            return <Redirect to="/"/>
        }
        
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Login</h2>
                <div className="alert alert-danger" style={{display:error?"" :"none"}}>{error}</div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="text" className="form-control" value={email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signin