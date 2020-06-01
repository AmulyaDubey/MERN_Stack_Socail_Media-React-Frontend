import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth'

const isActive=(history, path) =>{
    if(history.location.pathname === path ) return {color: "#000"};
    else return {color:"#ffffff"};
}

const Menu=({history})=>(
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/users")} to="/users">Users</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/signin"), !isAuthenticated()?{display:""}: {display:"none"}} to="/signin">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/signup"), !isAuthenticated()?{display:""}: {display:"none"}}  to="/signup">Sign Up</Link>
            </li>

            {isAuthenticated() &&  <li className="nav-item">
               <Link className="nav-link" style={isActive(history,`/user/${isAuthenticated().user._id}`)} to= {`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'s Profile`}</Link>
            </li>}
            <li className="nav-item">
                <a className="nav-link" style={{cursor:"pointer", color:"#fff"}, isAuthenticated()?{display:""}: {display:"none"}} onClick={()=>signout(() => history.push("/"))}>Sign out</a>
            </li>
        </ul>
    </div>
)

 export default withRouter(Menu)
