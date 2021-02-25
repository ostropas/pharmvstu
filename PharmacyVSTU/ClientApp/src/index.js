/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import dotenv from 'dotenv'
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker.js';

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
registerServiceWorker();

const hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={hist} basename={baseUrl}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/api"><div/></Route>
      <Redirect path="/" to="/admin/dashboard"/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
