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
import SubjectCard from './components/subjectCard/SubjectCard';
import NewSubjectForm from './components/newSubjectForm/NewSubjectForm';

import { AuthContext, Role } from './config/auth';
import ProtectedRoute from './components/ProtectedRoutes';
import axios from 'axios';
import { Button } from '@material-ui/core';
import jwt_decode from 'jwt-decode';

function App() {
    const token: string | null = localStorage.getItem('authToken');

    const [authToken, setAuthToken] = useState<string | null>(null);
    const [role, setRole] = useState<Role | null>(null);

    axiosConfig(); // Initialize axios configuration

    const setToken = (authenticationToken: string): void => {
        localStorage.setItem('authToken', authenticationToken);
        setAuthToken(authenticationToken);

        const decoded: any = jwt_decode(authenticationToken);
        setRole(decoded.role);
    };

    if (token && token !== authToken) {
        setAuthToken(token);
        axios.defaults.headers.common.authorization = `bearer ${token}`;

        const decoded: any = jwt_decode(token);
        setRole(decoded.role);
    }

    const deconnect = () => {
        console.log('hey');
        setAuthToken(null);
        localStorage.removeItem('authToken');
        axios.defaults.headers.common.authorization = '';
    };

    const SignOut = () => {
        return authToken ? (
            <Button onClick={deconnect} variant='contained' color='primary'>
                Déconnexion
            </Button>
        ) : (
            <></>
        );
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
                <Router>
                    <Switch>
                        <Route path='/login'>
                            <Login />
                        </Route>

                        <ProtectedRoute
                            path='/form'
                            component={NewSubjectForm}
                            teacherOnly
                        />

                        <ProtectedRoute path='/cards' component={SubjectCard} teacherOnly={false}/>

                        <Route path='/'>
                            <Redirect to='/login' />
                        </Route>
                    </Switch>
                </Router>
                <SignOut />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
