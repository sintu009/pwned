import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmailBreaches from "./pages/EmailBreaches";
import PasswordChecker from "./pages/PasswordChecker";
import DomainBreach from "./pages/DomainBreach";
import SHA1Converter from "./pages/SHA1Converter";
import AllPasteAcc from "./pages/AllPasteAcc";

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
            <Route exact path="/AllPasteAcc">
                <AllPasteAcc />
            </Route>
            <Route exact path="/SHA1Converter">
                <SHA1Converter />
            </Route>
        </Switch>
    );
};

export default Routes;
