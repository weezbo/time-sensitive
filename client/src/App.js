import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTaskLog from "./components/AddTaskLog.component";
import Profile from "./components/profile.component";

class App extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if(user) {
            this.setState({
                currentUser: user,
            })
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {

        const { currentUser } = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">
                        Time Sensitive
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Add
                            </Link>
                        </li>
                    </div>
                    { currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={AddTaskLog} />
                        <Route exact path="/profile" component={Profile} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
