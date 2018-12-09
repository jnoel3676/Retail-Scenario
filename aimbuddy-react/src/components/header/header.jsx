import React, { Component } from 'react';
import './header.css';

class Header extends Component {

    changeButtons() {
        if(this.props.isSignedIn === false) {
            return(
                <React.Fragment>
                    <button className="sign-in" onClick={this.props.handleLogInClick}>Log-In</button>
                    <button className="register" onClick={this.props.handleRegisterClick}>Register</button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <button className="home">Home</button>
                </React.Fragment>
            )
        }
    };

    render() {
        return (
            <div className="heading-box">
                <div className="left-hand">
                    <button className="sidebar-button" onClick={this.props.handleSidebarClick}>=</button>
                    <h1 style={{fontSize: 40, fontFamily: 'Georgia', display: 'inline-block',
                        paddingLeft: 10, verticalAlign: 'middle', color: '#f7fdf7'}}>Grocer-mart</h1>
                </div>
                <div className='buttons'>
                    {this.changeButtons()}
                </div>
            </div>
        );
    }

}

export default Header;