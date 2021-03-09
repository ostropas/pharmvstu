/*eslint-disable*/
import React, {useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

import "assets/css/error.css"

class ErrorComponent extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            text: "",
            show: false
        }
    }
    
    shouldComponentUpdate(nextProps)
    {        
        if (this.state.text === nextProps.children)
            return true;           

        this.setState({
            text: nextProps.children,
            show: !this.state.show
        })
        setTimeout(() => {
            this.setState({
                show: false
            })
            setTimeout(() => {
                this.setState({
                    text: ""
                })
                this.props.removeError();
            }, 1000);
        }, 2000);
        return false;
    }

    render()
    {    
        let classes = this.state.show ? "footer-error" : "footer-error hide"
        return (
            <footer className={classes}>
                {this.state.text}
            </footer>
        );
    }
}
export default ErrorComponent
