
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsSearch, BsCardList } from 'react-icons/bs';
import { BiLogOutCircle } from 'react-icons/bi';
import { MdDirectionsBus } from 'react-icons/md';
import { FaSignInAlt } from 'react-icons/fa';


import classes from './Navbar.module.css';

const navigation = (props) => {
    return (
        <div className={classes.RootContainer}>
            <div className={classes.IconContainer}>
                <MdDirectionsBus style={{marginRight: "10px"}}/>
                HyperTrip
            </div>
            <ul>
                {!props.isAuth ? (
                    <li>
                        <FaSignInAlt />
                      <NavLink to='/Login' activeStyle={{color: 'red'}}>Login</NavLink>
                    </li>
                ) : null}

                {!props.isAuth ? (
                    <li>
                        <NavLink to='/signup' activeStyle={{color: 'red'}}>Signup</NavLink>    
                    </li> 
                ) : null}
              
                {props.isAuth ? (
                    <li>
                        <BsSearch style={{marginRight: "10px"}}/>
                        <NavLink to='/abc' activeStyle={{color: 'red'}}>Search Bus</NavLink>
                    </li>
                ) : null}
                
                {props.isAuth ? (
                    <li>
                        <BsCardList style={{marginRight: "10px"}}/>
                        <NavLink to='/def' activeStyle={{color: 'red'}}>View All</NavLink>
                    </li>
                ) : null}
                
                {props.isAuth ? (
                    <li>
                        <BiLogOutCircle size={25} style={{marginRight: "10px"}}/>
                        <div className={classes.LogoutDiv} onClick={props.logoutHandler}>Logout</div>
                    </li>
                ) : null}
                
            </ul>
        </div>
    )
}

export default navigation;