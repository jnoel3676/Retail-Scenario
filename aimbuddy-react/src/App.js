import React, { Component, Fragment } from 'react';
import SignIn from './components/signin/signin';
import Register from './components/register/register';
import Header from './components/header/header';
import Catalog from './components/catalog/catalog';
import Sidebar from './components/sidebar/sidebar';
import { UtilContextProvider } from './context/utilContext';
import './App.css';

const API = 'http://localhost:3000/catalog';


class App extends Component {

    state = {
        isSignedIn: false,
        route: 'signout',
        sidebarToggled: false,
        loginToggled: false,
        registerToggled: false,
        items: [],
        user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        }
    };

    constructor() {
        super();
        this.handleSidebarClick = this.handleSidebarClick.bind(this);
        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    loadUser = (data) => {
        this.setState({
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        })
    };

    componentDidMount() {
        this.getAllItems();
    }

    getAllItems = () => {
        fetch(API)
            .then(response => response.json())
            .then(data => this.setState({ items: data }));
    };

    handleSidebarClick() {
        this.setState({sidebarToggled: !this.state.sidebarToggled});
    };

    handleLogInClick() {
        this.setState({loginToggled: !this.state.loginToggled});
    };

    handleRegisterClick() {
        this.setState({registerToggled: !this.state.registerToggled});
    };

    onRouteChange = (route) => {
        if(route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({registerToggled: false});
            this.setState({loginToggled: false});
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    };

    render() {
        const { isSignedIn, route, loginToggled, registerToggled, sidebarToggled, items } = this.state;
        return (
            <UtilContextProvider>
                <Fragment>
                    <Header isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} route={route}
                            handleSidebarClick={this.handleSidebarClick} handleLogInClick={this.handleLogInClick}
                            handleRegisterClick={this.handleRegisterClick} />
                    <Sidebar sidebarToggled={sidebarToggled} name={this.state.user.name} />
                    <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} loginToggled={loginToggled} />
                    <Register onRouteChange={this.onRouteChange}  loadUser={this.loadUser} registerToggled={registerToggled} style={{display:'inline-block'}}/>
                    <Catalog items={items} style={{display:'inline-block'}}/>
                </Fragment>
            </UtilContextProvider>
        );
    };
}

export default App;
