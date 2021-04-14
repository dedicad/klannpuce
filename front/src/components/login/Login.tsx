import React, { useState } from 'react';
import './Login.css';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../config/auth';
import { Redirect } from 'react-router-dom';

function Login() {
    // Form
    // Note: data not sanitysed
    const { register, handleSubmit } = useForm();
    const { authToken, setContextToken, setContextRole } = useAuth();
    const [isLoggedIn, setLoggedIn] = useState(
        authToken != null
    );

    const onSubmit = (data: any) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .post('/auth/login', data, config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                const access_token = response.data.access_token;

                setContextToken(access_token);
                axios.defaults.headers.common[
                    'Authorization'
                ] = `bearer ${access_token}`;

                setLoggedIn(true);

                console.log(`Access Token: ${access_token}`);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };

    return (
        isLoggedIn ? <Redirect to="/card" /> :
       ( <div className='login-div'>
            <Card variant='outlined' className='login-card'>
                <CardContent>
                    <form
                        className='login-form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            required
                            id='email-textfield'
                            margin='normal'
                            type='email'
                            label='email'
                            variant='outlined'
                            {...register('email')}
                        />
                        <TextField
                            required
                            className='form-textfield'
                            margin='normal'
                            label='Mot de passe'
                            type='password'
                            variant='outlined'
                            {...register('password')}
                        />
                        <Button
                            id='sign-in-button'
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Se connecter
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>)
    );
}

export default Login;
