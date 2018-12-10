import React, { Component } from 'react';
import './sidebar.css';

const AboutUs = (props) => {
     return (
        <div className="sidebar" style={{width: props.width}}>
            <span>User: {props.name}</span>
            <span>Email: {props.email}</span>
        </div>
    );
};


class Sidebar extends Component {

    constructor() {
        super();
        this.showSidebar = this.showSidebar.bind(this);
    }

    showSidebar() {
        return (this.props.sidebarToggled ? 300 : 0);
    }

    render() {
        return (
            <React.Fragment>
                <AboutUs width={this.showSidebar()} name={this.props.name} email={this.props.email}/>
            </React.Fragment>
        );
    }

}

export default Sidebar;