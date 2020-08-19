import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./components/Login/login";
import { ListPage } from "./components/MemberList/membersList";
import { MemberCard } from "./components/MemberCard/memberCard";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/list">
          <ListPage />
        </Route>
        <Route path="/detail/:id">
          <MemberCard />
        </Route>
      </Switch>
    </Router>
  );
};
