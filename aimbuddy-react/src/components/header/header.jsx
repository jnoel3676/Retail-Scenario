import React, { Fragment } from 'react';
import './header.css';

const EmployeeInfo = ({show_info, store_id}) => {
    if (show_info) {
        return (
            <div className="extra-info">
                <span>Store ID: {store_id}</span>
            </div>
        );
    } else {
        return (
            <Fragment></Fragment>
        );
    }
};

const Header = ({isSignedIn, handleLogInClick, handleRegisterClick, handleSidebarClick, show_info}) => {
    if(isSignedIn === false) {
        return(
            <Fragment>
            <div className="heading-box">
                <EmployeeInfo show_info={show_info}/>
            <div className="left-hand">
               <button className="sidebar-button" onClick={handleSidebarClick}>=</button> 
               <h1 style={{fontSize: 40, fontFamily: 'Georgia', display: 'inline-block',
                        paddingLeft: 10, verticalAlign: 'middle', color: '#f7fdf7'}}>Grocer-mart</h1>
                
            </div>
            <div className='buttons'>
                <button className="sign-in" onClick={handleLogInClick}>Log-In</button>
                <button className="register" onClick={handleRegisterClick}>Register</button>
           
            </div>
            </div>
            
            </Fragment>
        )
    } else {
        return(
            <div className="heading-box">
                <div className="left-hand">
                    <button className="sidebar-button" onClick={handleSidebarClick}>=</button>
                    <h1 style={{fontSize: 40, fontFamily: 'Georgia', display: 'inline-block',
                        paddingLeft: 10, verticalAlign: 'middle', color: '#f7fdf7'}}>Grocer-mart</h1>
                </div>
            </div>
        )
    }
};

export default Header;