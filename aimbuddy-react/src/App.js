import React, { Component, Fragment } from 'react';
import SignIn from './components/signin/signin';
import Register from './components/register/register';
import Header from './components/header/header';
import Catalog from './components/catalog/catalog';
import Sidebar from './components/sidebar/sidebar';
import { UtilContextProvider } from './context/utilContext';
import './App.css';

const API = 'http://localhost:3000/';


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
            joined: '',
            employee_status: false
        },
        tempSectionID: '',
        tempSupplierID: '',
        shift: '',
        store_id: ''
    };

    constructor() {
        super();
        this.handleSidebarClick = this.handleSidebarClick.bind(this);
        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
                employee_status: data.employee_status
            }
        });
        this.getStoreID();
        this.getShift();
    };

    componentDidMount() {
        this.getAllItems();
    }

    getAllItems = () => {
        const query = 'catalog';
        fetch(API + query)
            .then(response => response.json())
            .then(data => this.setState({ items: data }));
    };

    /*

    getSupplierID = (supplier_name) => {
        const query = 'supplier-id';
        if (this.state.isSignedIn && this.state.user.employee_status) {
            return fetch(API + query, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    supplier_name: supplier_name
                })
            })
                .then(response => response.json())
                .then(data =>  this.setState({ tempSupplierID: data.supplier_id}))
        }
    };

    getSectionID = (section_name) => {
        const query = 'section-id';
        if (this.state.isSignedIn && this.state.user.employee_status) {
            fetch(API + query, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    section_name: section_name
                })
            })
                .then(response => response.json())
                .then(data => this.setState({ tempSectionID: data.section_id}))
        }
    };

    */

    addItem = ( item_name, price, stock, section_name, supplier_name ) => {
        const query = 'new-item';
        if (this.state.isSignedIn && this.state.user.employee_status) {
            fetch(API + query, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    item_name: item_name,
                    price: price,
                    stock: stock,
                    section_name: section_name,
                    supplier_name: supplier_name
                })
            }).then()
        }
    };

    getStoreID = () => {
        const name_array = this.state.user.name.split(' ');
        const query = 'store-id';
        if (this.state.isSignedIn && this.state.user.employee_status) {
            fetch(API + query, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name_array[1]
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ store_id: data.store_id })
                })
        }
    };

    getShift = () => {
        const name_array = this.state.user.name.split(' ');
        const query = 'shift-info';
        if (this.state.isSignedIn && this.state.user.employee_status) {
            fetch(API + query, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name_array[1]
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ shift: data.hours })
                })
        }
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
                            handleRegisterClick={this.handleRegisterClick} show_info={this.state.user.employee_status}
                            store_id={this.state.store_id} shift_info={this.state.shift} />
                    <Sidebar sidebarToggled={sidebarToggled} name={this.state.user.name} email={this.state.user.email}/>
                    <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} loginToggled={loginToggled} />
                    <Register onRouteChange={this.onRouteChange}  loadUser={this.loadUser} registerToggled={registerToggled} style={{display:'inline-block'}}/>
                    <Catalog items={items} style={{display:'inline-block'}} show_item_info={this.state.user.employee_status}/>
                </Fragment>
            </UtilContextProvider>
        );
    };
}
//
export default App;
