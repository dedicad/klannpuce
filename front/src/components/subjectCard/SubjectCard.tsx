import React, { PureComponent } from 'react'

import { Card, CardContent, Typography, Grid, CardActions, Button, Checkbox } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './SubjectCard.css';

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiCardContent: {
            // Name of the rule
            root: {
                paddingBottom: 0,
                // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            },
        },
    },
});

class SubjectCard extends PureComponent {
    subject = {
        'title': 'Cuisine',
        'tasks': ['Râper des carottes',
            'Couper des courgettes',
            'Farie la vaisselle']
    };

    tasks = this.subject.tasks.map(task => {
        return (
            <li><Checkbox color="primary" disableRipple />{task}</li>
        )
    })



    render() {
        return (
            <Grid className="full-height" container
                direction="row"
                justify="center"
                alignItems="center" >
                <Card className="subject-card">
                    <ThemeProvider theme={theme}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                {this.subject.title}
                            </Typography>
                            <ul>
                                {this.tasks}
                            </ul>
                        </CardContent>
                    </ThemeProvider>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default SubjectCard;