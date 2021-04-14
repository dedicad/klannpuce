import React from 'react'
import { useForm } from 'react-hook-form';
import { Paper, TextField, Button, Typography, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    layout: {
        height: '100vh',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
    },
}));


export default function NewSubjectForm() {
    const classes = useStyles();

    // Dynamic fields
    const [taskIdCounter, setTaskIdCounter] = React.useState(1)
    const [tasksState, setTasks] = React.useState([0])

    const incrementTaskIdCounter = () => {
        setTaskIdCounter(taskIdCounter + 1);
    }

    const addTask = () => {
        incrementTaskIdCounter();
        setTasks([...tasksState, taskIdCounter]);
    };

    const deleteTask = (e: any) => {
        let i = parseInt(e.currentTarget.id.split('-')[1]);
        setTasks(tasksState.filter((taskId, index) => {
            return taskId !== i
        }))
    };

    // Form
    // Note: data not sanitysed
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        let tasks: any = [];
        Object.keys(data).filter(function (k) {
            return k.indexOf('Task-') === 0;
        }).map((key, i) => {
            tasks.push({
                "name": data[key],
                "description": "Not necessary",
                "level": i
            })
            return null
        })

        const reqBody = {
            "name": data["SubjectTitle"],
            "description": "Not necessary",
            "tasks": tasks
        };

        const config = {
            method: 'post',
            url: 'subjects',
            headers: {
                'Content-Type': 'application/json',
            },
            data: reqBody
        };

        axios(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error: any) {
                console.log(error);
            });

    }


    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Add a new subject
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="SubjectTitle"
                                    label="Subject Title"
                                    fullWidth
                                    {...register('SubjectTitle')}
                                />
                            </Grid>

                            {tasksState.map((taskId) => {
                                return (
                                    <React.Fragment key={taskId}>
                                        <Grid item xs={12} sm={10}>
                                            <TextField
                                                id={`Task-${taskId}`}
                                                size="small" label={`Task`}
                                                fullWidth
                                                {...register(`Task-${taskId}`)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1}>
                                            <IconButton id={`delete-${taskId}`} aria-label="delete" color="secondary" onClick={deleteTask}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </React.Fragment>
                                )
                            })}

                            <Grid item xs={3}>
                                <Button fullWidth color="primary" variant="contained" onClick={addTask}>Add task</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth color="primary" variant="contained">Add Subject</Button>
                            </Grid>
                        </Grid>
                    </form>

                
                </React.Fragment>
            </Paper>
            <Link
                    to={{
                        pathname: '/cards',
                    }}
                >
                    <Button variant='contained' color='primary'>
                        Voir la liste des cartes
                    </Button>
                </Link>
        </main>
    )
}