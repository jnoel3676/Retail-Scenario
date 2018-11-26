import React, { Component, Fragment } from 'react';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/Register';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { UtilContextProvider } from './context/utilContext';
import Home from './components/Home/Home';
import './App.css';

class App extends Component {
  
	constructor() {
		super()
		this.state = {
			isSignedIn: false,
			route: 'signIn',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
		}
	}

  loadUser = (data) => {
    this.setState({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

	onRouteChange = (route) => {
		if(route === 'signOut') {
			this.setState({isSignedIn: false})
		} else if (route === 'home') {
			this.setState({isSignedIn: true})
    } 
		this.setState({route: route});
	}
  render() {
    	const { isSignedIn, route } = this.state;
      return (
        <UtilContextProvider>  
          <Fragment>
            <NavigationBar 
              isSignedIn={isSignedIn} 
              onRouteChange={this.onRouteChange} 
              route={route}
            />
            { route === 'home'
      				? <Home 
                onRouteChangePost={this.onRouteChangePost} 
                onRouteChange={this.onRouteChange} 
                />
            :(

              route === 'register'
              ?<Register onRouteChange={this.onRouteChange}  loadUser={this.loadUser}/>
              :<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            
            )
          }
      		</Fragment>
        </UtilContextProvider>
    	);
  	};
}

export default App;
