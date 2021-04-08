import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import SubjectCard from './components/subjectCard/SubjectCard';

function App() {
  return (

    <div className="App">
      <Router>
        {/* <Navbar></Navbar> */}

        <Switch>
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
