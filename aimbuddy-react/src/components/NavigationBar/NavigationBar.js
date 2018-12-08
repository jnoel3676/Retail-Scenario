import React from 'react';
import './Navigation.css';

const NavigationBar = ({ onRouteChange, isSignedIn, onRouteChangePost, displayAccountPage, route }) => {
	if(isSignedIn === false) {
		return(
			<div className='wrapper-nav'>
				<div className = 'title'>
					<h1>Groceries</h1>
				</div>
				{/* This colum is only for debugging, take off while showing actual app*/}
				<div className='col2'>
				  	<h1 onClick = {() => onRouteChange('home')}>home</h1>
				</div>
			</div>
		)
	} else {
		return (
			<div className='wrapper-nav'>
				<div className='account'>
					<h1 onClick={() => onRouteChange('Account')}>Account</h1>
				</div>
				<div className='sign-out'>
					<h1 onClick = {() => onRouteChange('signOut')}>Sign Out</h1>
				</div> 
			</div>
		)
	}
}
export default NavigationBar;
