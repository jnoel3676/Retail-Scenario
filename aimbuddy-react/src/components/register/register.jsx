import React, { Component } from 'react';
import './register.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
        this.showRegister = this.showRegister.bind(this);
    }

    showRegister() {
        return (this.props.registerToggled ? 500 : 0);
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(user => {
                if(user) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('signIn');
                }
            })
    };

    render() {

        return (
            <div className="register-box" style={{width: this.showRegister()}}>
                <article className="br5 ba dark-gray w-100 w-50-m w-25-l mw6 shadow-5 center" >
                    <main className="pa4 black-80">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3 ">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange = {this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange = {this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange = {this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                                onClick={this.onSubmitRegister}
                            />
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default Register;