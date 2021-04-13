import React from 'react';
import './Login.css';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from '../../config/axios';

function Login() {

    // Form
    // Note: data not sanitysed
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {

        const config = {
            method: 'post',
            url: 'auth/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                const access_token = response.data.access_token;
                console.log(`Access Token: ${access_token}`);
                axios.defaults.headers.common['Authorization'] = `bearer ${access_token}`;
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    return (
        <div className='login-div'>
            <Card variant="outlined" className="login-card">
                <CardContent>
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            required
                            id="email-textfield"
                            margin="normal"
                            type="email"
                            label="email"
                            variant="outlined"
                            {...register('email')}
                        />
                        <TextField
                            required
                            className="form-textfield"
                            margin="normal"
                            label="Password"
                            type="password"
                            variant="outlined"
                            {...register('password')}
                        />
                        <Button
                            id="sign-in-button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Sign in</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )

}

export default Login