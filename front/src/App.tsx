import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./components/login/Login";
<<<<<<< HEAD
import SubjectCard from './components/subjectCard/SubjectCard';
import NewSubjectForm from './components/newSubjectForm/NewSubjectForm';
=======
import Navbar from "./components/navbar/Navbar";
import SubjectCard from './components/subjectCard/SubjectCard';
>>>>>>> Add card template page at /card

function App() {
  return (

    <div className="App">
      <Router>
        <Switch>
<<<<<<< HEAD
          <Route path="/form">
            <NewSubjectForm />
          </Route>
=======
>>>>>>> Add card template page at /card
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
