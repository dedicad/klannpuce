import React from 'react';
import './Login.css';
import { Card, CardContent, Button, TextField } from '@material-ui/core';

class Login extends React.Component {
    render() {
        return <div className='login-div'>
            <Card variant="outlined" className="login-card">
                <CardContent>
                    <form className="login-form" action="post">
                        <TextField id="login-textfield" required margin="normal" label="Login" variant="outlined" />
                        <TextField className="form-textfield" required margin="normal" label="Password" type="password" variant="outlined" />
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
    }
}

export default Login