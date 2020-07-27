

import React, { Component } from '/react';
import { Link, withRouter } from '/react-router-dom';
import * as ROUTES from '/src/constants/routes';
import { withFirebase } from '/src/components/Firebase';
import { compose } from '/recompose';

function SignUpPage() {
    return (
        <div>
            <h1>Registro</h1>
            <SignUpForm />
        </div>
    );
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        }
            onSubmit = event => {
                const { username , email, passwordOne } = this.state;var React = require('react');  
                this.props.firebase
                .doCreateUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
                    this.setState({ ...INITIAL_STATE });
                    this.props.history.push(ROUTES.HOME);
                })
                .catch(error => {
                    this.setState({ error });
                });
                event.preventDefault();
            }
            onChange = event => {
                this.setState({ [event.target.name]: event.target.value });
            };
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Name"/>
                <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"/>
                <input name="passwordOne" value={passwordOne} onChange={this.onChange}type="password" placeholder="Password"/>
                <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
                <button disabled={isInvalid} type="submit">Sign Up</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>¿No tienes cuenta registrate? <Link to={ROUTES.SIGN_UP}>Registrarte</Link></p>
);
const SignUpForm = compose(withRouter,withFirebase,)(SignUpFormBase);
// const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export { SignUpForm, SignUpLink };


