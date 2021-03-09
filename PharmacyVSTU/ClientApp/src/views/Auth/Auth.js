import React from "react";

import Cookies from 'universal-cookie';

import imgSignUp from "assets/img/signup-image.png";
import imgSignIn from "assets/img/signin-image.png";

import axios from "../../Models/Axios/axiosRoutes.js"

import ErrorComponent from "components/Error/ErrorComponent.js"

import "assets/css/auth.css"
import "assets/css/loader.css"

const cookies = new Cookies();

export default class Auth extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            pass: "",
            rePass: "",
            email: "",
            signInPage: true,
            loading: false,
            isDoctor: false,
            error: ""
        };
      }

    setPage(value)
    {
        this.setState({ signInPage: value })
    }


    setIsDoctor(event)
    {
        this.setState({
            isDoctor: event.target.checked
        })
    }

    sendError(msg)
    {
        this.setState({
            error: msg
        });
    }

    removeError()
    {
        this.setState({
            error:""
        })
    }

    signIn()
    {
        if (this.state.loading)
            return;

        if (this.state.email === "" || this.state.pass == "")
        {
            this.sendError("Введите все значения");
            return;
        }

        if (!this.validateEmail(this.state.email))
        {
            this.sendError("Не корректный email")
            return;
        }

        this.setState({loading:true});

        axios.signIn(this.state.email, this.state.pass).then(res => {
            setTimeout(() => {
                localStorage.setItem("jwt", res.data.access_token);
                axios.getUserData().then(uRes => {
                    localStorage.setItem("doctor", uRes.data.doctor);
                    this.setState({loading:false});
                    this.props.history.push({pathname: "/user"});
                })
            }, 1000);   
        }).catch(e => {
            this.setState({loading:false});
            this.sendError("Не корректный email или пароль");
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
            this.sendError("Введите все значения");
            return;
        }

        if (this.state.pass !== this.state.rePass)
        {
            alert("Пароли не совпадают")
            return;
        }

        if (!this.validateEmail(this.state.email))
        {
            this.sendError("Не корректный email")
            return;
        }

        this.setState({loading:true});

        axios.signUp(this.state.email, this.state.pass, this.state.name, this.state.isDoctor).then(res => {
            setTimeout(() => {
                localStorage.setItem("jwt", res.data.access_token);
                localStorage.setItem("doctor", this.state.isDoctor);
                this.setState({loading:false});
                this.props.history.push({pathname: "/user"});
            }, 1000);            
        }).catch(e => {
            this.setState({loading:false});
            this.sendError("Не корректный email или пароль");
        });
    }


    handleChange(evt) {
        const value = evt.target.value;
        this.setState({[evt.target.name]: value});
    }

    SignUpPage() {
    var classes = this.state.loading ? "container hide" : "container";
    return(
        <section className="signup vertical-center">
        <div className={classes}>
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Регистрация</h2>
                    <div class="register-form" id="register-form">
                        <div class="form-group">
                            <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                            <input type="text" name="name" id="name" placeholder="Ваше ФИО" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div class="form-group">
                            <label for="email"><i class="zmdi zmdi-email"></i></label>
                            <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div class="form-group">
                            <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                            <input type="password" name="pass" id="pass" placeholder="Пароль"value={this.state.pass} onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div class="form-group">
                            <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                            <input type="password" name="rePass" id="re_pass" placeholder="Повторите пароль"value={this.state.rePass} onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div  class="form-group" style={{overflow:"initial"}}>
                            <label for="check">Вы доктор?</label>
                            <input name="check" id="check" type="checkbox" checked={this.state.isDoctor} onChange={this.setIsDoctor.bind(this)}/>
                        </div>
                        <div class="form-group form-button">
                            <input type="submit" name="signup" id="signup" class="form-submit" value="Зарегестрироваться" onClick={this.signUp.bind(this)}/>
                        </div>                        
                    </div>
                </div>
                <div class="signup-image">
                    <figure><img src={imgSignUp} alt="sing up image" /></figure>
                    <a class="signup-image-link" style={{cursor:"pointer"}} onClick={() => this.setPage(true)}>Я уже зарегистрирован</a>
                </div>
                {this.renderError()}
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
                    <a class="signup-image-link" style={{cursor:"pointer"}} onClick={() => this.setPage(false)}>Создать профиль</a>
                </div>
                <div class="signin-form">
                    <h2 class="form-title">Вход</h2>
                    <div class="register-form" id="login-form">
                        <div class="form-group">
                            <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                            <input type="text" name="email" id="your_name" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="Email"/>
                        </div>
                        <div class="form-group">
                            <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                            <input type="password" name="pass" id="your_pass" value={this.state.pass} onChange={this.handleChange.bind(this)} placeholder="Пароль"/>
                        </div>
                        <div class="form-group form-button">
                            <input type="button" name="signin" id="signin" class="form-submit" value="Войти" onClick={this.signIn.bind(this)}/>
                        </div>
                    </div>
                </div>
                {this.renderError()}
            </div>
        </div>
        {this.loader()}
    </section>
    )
}

    renderError()
    {
        return (<ErrorComponent removeError={this.removeError.bind(this)}>{this.state.error}</ErrorComponent>);
    }

    render()
    {
        let page = this.state.signInPage ? this.SignInPage() : this.SignUpPage()
        return (
            page
        );      
    }
}
