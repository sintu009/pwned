import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmailBreaches from "./pages/EmailBreaches";
import PasswordChecker from "./pages/PasswordChecker";
import DomainBreach from "./pages/DomainBreach";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/breachedemail">
                <EmailBreaches />
            </Route>
            <Route exact path="/PasswordChecker">
                <PasswordChecker />
            </Route>
            <Route exact path="/DomainBreach">
                <DomainBreach />
            </Route>
        </Switch>
    );
};

export default Routes;
