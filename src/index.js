import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

// import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";
import store from './store';
// import RTLLayout from "layouts/RTL/RTL.jsx";

import "./assets/css/nucleo-icons.css";
import "./assets/scss/styles.scss?v=1.0.0";
import "./assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";
import 'react-notifications/lib/notifications.css';

const hist = createBrowserHistory();

const app = (
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/* <Route path="/auth" render={props => <AuthLayout {...props} />} /> */}
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        {/* <Route path="/rtl" render={props => <RTLLayout {...props} />} /> */}
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
