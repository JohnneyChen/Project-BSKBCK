import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import SchoolList from "./schools/SchoolList";
import SchoolShow from "./schools/SchoolShow";
import NewSchoolForm from "./schools/NewSchoolForm";
import EditSchoolForm from "./schools/EditSchoolForm";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/schools/add" component={NewSchoolForm} />
              <Route exact path="/schools/:_id" component={SchoolShow} />
              <Route
                exact
                path="/schools/:_id/edit"
                component={EditSchoolForm}
              />
              <Route path="/" component={SchoolList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
