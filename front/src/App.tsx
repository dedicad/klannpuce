import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./components/login/Login";
import SubjectCard from './components/subjectCard/SubjectCard';
import NewSubjectForm from './components/newSubjectForm/NewSubjectForm';

function App() {
  return (

    <div className="App">
      <Router>
        <Switch>
          <Route path="/form">
            <NewSubjectForm />
          </Route>
          <Route path="/card">
            <SubjectCard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Redirect to="/login" />

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
