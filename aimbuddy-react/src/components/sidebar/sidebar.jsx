import React, { Component } from 'react';
import './sidebar.css';

const AboutUs = (props) => {
     return (
        <div className="sidebar" style={{width: props.width}}>
            <span>{props.name}</span>
            <span>Samuel Naranjo</span>
            <span>Joshua Noel</span>
            <span>Nick Castagno</span>
        </div>
    );
};


class Sidebar extends Component {

    constructor() {
        super();
        this.showSidebar = this.showSidebar.bind(this);
    }

    showSidebar() {
        return (this.props.sidebarToggled ? 250 : 0);
    }

    render() {
        return (
            <React.Fragment>
                <AboutUs width={this.showSidebar()} name={this.props.name}/>
            </React.Fragment>
        );
    }

}

export default Sidebar;