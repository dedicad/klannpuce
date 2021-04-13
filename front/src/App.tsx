import React, { useState } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import axiosConfig from './config/axiosConfig';

import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import SubjectCard from './components/subjectCard/SubjectCard';
import NewSubjectForm from './components/newSubjectForm/NewSubjectForm';

import { AuthContext, Role } from './config/auth';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [role, setRole] = useState<Role | null>(null);

    axiosConfig(); // Initialize axios configuration

    const setToken = (authenticationToken: string): void => {
        setAuthToken(authenticationToken);
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                setContextToken: setToken,
                role,
                setContextRole: setRole,
            }}
        >
            <div className='App'>
                login
                <Router>
                    <Switch>
                        <Route path='/login'>
                            <Login />
                        </Route>

                        <ProtectedRoute
                            path='/form'
                            component={NewSubjectForm}
                            hasAdequateRole
                        />

                        <ProtectedRoute
                            path='/card'
                            component={SubjectCard}
                            hasAdequateRole
                        />

                        <Route path='/'>
                            <Redirect to='/404' />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
