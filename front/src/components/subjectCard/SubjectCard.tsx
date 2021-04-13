import React, { PureComponent } from 'react';

import {
    Card,
    CardContent,
    Typography,
    Grid,
    CardActions,
    Button,
    Checkbox,
    Tooltip,
} from '@material-ui/core';
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
        name: 'Sécurité OS3',
        description: 'quick quzzzqzdqzdizzcaeaqzk no security',
        author: 'Thierry',
        tasks: [
            {
                name: 'HeNqzdoqzdzdeazee',
                description: 'Not neczessary',
                level: '0',
                id: 1,
                createdAt: '2021-04-13T13:30:11.791Z',
                advancements: [
                    {
                        taskId: 3,
                        id: 1,
                        createdAt: '2021-04-13T13:32:48.781Z',
                    },
                ],
            },
            {
                name: 'Hey',
                description: 'Not neczessary',
                level: '1',
                id: 2,
                createdAt: '2021-04-13T13:30:11.793Z',
                advancements: [],
            },
            {
                name: 'Not mezzqqzdqzdzdazeazezz',
                description: 'hezy',
                level: '4',
                id: 3,
                createdAt: '2021-04-13T13:30:11.795Z',
                advancements: [],
            },
        ],
        id: 1,
        createdAt: '2021-04-13T13:30:11.789Z',
    };

    toggleValidation(index: number) {

        if (this.subject.tasks[index].advancements.length){
            // If it was originally checked we send a request to validate

        }

        // Otherwise when send a request to uncheck
    }

    tasks = this.subject.tasks.map((task, index) => {
        return (
            <li key={task.id}>
                <Tooltip title={task.description}>
                    <Checkbox
                        color='primary'
                        disableRipple
                        onClick={()=> this.toggleValidation(index)}
                        checked={task.advancements.length > 0}
                    />
                </Tooltip>
                {task.name} 
            </li>
        );
    });

    render() {
        return (
            <Grid
                className='full-height'
                container
                direction='row'
                justify='center'
                alignItems='center'
            >
                <Card className='subject-card'>
                    <ThemeProvider theme={theme}>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h4'
                                component='h2'
                            >
                                {this.subject.name}
                            </Typography>
                            <ul>{this.tasks}</ul>
                        </CardContent>
                    </ThemeProvider>
                    <CardActions>
                        <Button size='small'>Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default SubjectCard;
