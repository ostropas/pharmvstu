import React from "react";

import Cookies from 'universal-cookie';

import imgSignUp from "assets/img/signup-image.png";
import imgSignIn from "assets/img/signin-image.png";

import axios from "../../Models/Axios/axiosRoutes.js"

import "assets/css/auth.css"
import "assets/css/loader.css"

const cookies = new Cookies();

export default class Auth extends React.Component
{
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            name: "",
            pass: "",
            rePass: "",
            email: "",
            signInPage: true,
            loading: false,
            isDoctor: false
        };
      }

    setPage(value)
    {
        this.setState({
            signInPage: value
        })
    }

    setName(event)
    {
        this.setState({
            name: event.target.value
        })
    }

    setPass(event)
    {
        this.setState({
            pass: event.target.value
        })
    }

    setRePass(event)
    {
        this.setState({
            rePass: event.target.value
        })
    }

    setEmail(event)
    {
        this.setState({
            email: event.target.value
        })
    }

    setIsDoctor(event)
    {
        this.setState({
            isDoctor: event.target.checked
        })
    }

    signIn()
    {
        if (this.state.loading)
            return;

        if (this.state.email === "" || this.state.pass == "")
        {
            alert("Enter all values")
            return;
        }

        if (!this.validateEmail(this.state.email))
        {
            alert("Not valid email")
            return;
        }

        this.setState({loading:true});

        axios.signIn(this.state.email, this.state.pass).then(res => {
            setTimeout(() => {
                localStorage.setItem("jwt", res.data.access_token);
                this.setState({loading:false});
                this.props.history.push({pathname: "/admin/user"});
            }, 1000);   
        });
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    loader()
    {
        if(this.state.loading)
            return(<div class="lds-roller at-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)

        return (<div></div>)
    }

    signUp()
    {
        if (this.state.loading)
            return;

        if (this.state.email === "" || this.state.pass == "" || this.state.name == "" || this.state.rePass == "")
        {
            alert("Enter all values")
            return;
        }

        if (this.state.pass !== this.state.rePass)
        {
            alert("Passwords are not equal");
            return;
        }

        if (!this.validateEmail(this.state.email))
        {
            alert("Not valid email")
            return;
        }

        this.setState({loading:true});

        axios.signUp(this.state.email, this.state.pass, this.state.name).then(res => {
            setTimeout(() => {
                localStorage.setItem("jwt", res.data.access_token);
                this.setState({loading:false});
                this.props.history.push({pathname: "/admin/user"});
            }, 1000);            
        });
    }

    SignUpPage() {
    var classes = this.state.loading ? "signup vertical-center hide" : "signup vertical-center";
    return(
        <section className={classes}>
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Sign up</h2>
                    <div class="register-form" id="register-form">
                        <div class="form-group">
                            <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                            <input type="text" name="name" id="name" placeholder="Your Name" value={this.state.name} onChange={this.setName.bind(this)}/>
                        </div>
                        <div class="form-group">
                            <label for="email"><i class="zmdi zmdi-email"></i></label>
                            <input type="email" name="email" id="email" placeholder="Your Email" value={this.state.email} onChange={this.setEmail.bind(this)} />
                        </div>
                        <div class="form-group">
                            <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                            <input type="password" name="pass" id="pass" placeholder="Password"value={this.state.pass} onChange={this.setPass.bind(this)}/>
                        </div>
                        <div class="form-group">
                            <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                            <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"value={this.state.rePass} onChange={this.setRePass.bind(this)}/>
                        </div>
                        <div  class="form-group">
                            <label for="check">Are you doctor?</label>
                            <input name="check" id="check" type="checkbox" checked={this.state.isDoctor} onChange={this.setIsDoctor.bind(this)}/>
                        </div>
                        <div class="form-group form-button">
                            <input type="submit" name="signup" id="signup" class="form-submit" value="Register" onClick={this.signUp.bind(this)}/>
                        </div>                        
                    </div>
                </div>
                <div class="signup-image">
                    <figure><img src={imgSignUp} alt="sing up image" /></figure>
                    <a class="signup-image-link" style={{cursor:"pointer"}} onClick={() => this.setPage(true)}>I am already member</a>
                </div>
            </div>
        </div>
        {this.loader()}
    </section>
    )
}

    SignInPage() {
    var classes = this.state.loading ? "container hide" : "container";
    return(
        <section class="sign-in vertical-center">
        <div className={classes}>
            <div class="signin-content">
                <div class="signin-image"  >
                    <figure><img src={imgSignIn} style={{maxWidth:"60%"}} alt="sing up image"/></figure>
                    <a class="signup-image-link" style={{cursor:"pointer"}} onClick={() => this.setPage(false)}>Create an account</a>
                </div>

                <div class="signin-form">
                    <h2 class="form-title">Sign in</h2>
                    <div class="register-form" id="login-form">
                        <div class="form-group">
                            <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                            <input type="text" name="your_name" id="your_name" value={this.state.email} onChange={this.setEmail.bind(this)} placeholder="Your Email"/>
                        </div>
                        <div class="form-group">
                            <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                            <input type="password" name="your_pass" id="your_pass" value={this.state.pass} onChange={this.setPass.bind(this)} placeholder="Password"/>
                        </div>
                        <div class="form-group form-button">
                            <input type="button" name="signin" id="signin" class="form-submit" value="Log in" onClick={this.signIn.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {this.loader()}
    </section>
    )
}

    render()
    {
        let page = this.state.signInPage ? this.SignInPage() : this.SignUpPage()
        return (
            page
        );      
    }
}
