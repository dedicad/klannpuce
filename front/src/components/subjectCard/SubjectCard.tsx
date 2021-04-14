import { PureComponent } from 'react';

import {
    Card,
    CardContent,
    Checkbox,
    Container,
    Grid,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './SubjectCard.css';
import axios from 'axios';

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

interface SubjectCardProps { }

interface Advancement {
    id: number;
    taskId: number;
    createdAt: Date;
}
interface Task {
    id: number;
    name: string;
    description: string;
    level: number;
    createdAd: Date;
    advancements: Advancement[];
}
interface Subject {
    name: string;
    description: string;
    author: string;
    tasks: Task[];
}
interface SubjectCardState {
    disabled: boolean;
    ready: boolean;
    subjects: Subject[];
}
class SubjectCard extends PureComponent<SubjectCardProps, SubjectCardState> {
    state = {
        disabled: false,
        ready: false,
    } as SubjectCardState;

    componentDidMount() {
        axios
            .get('/subjects')
            .then((res: any) => this.setState({ subjects: res.data, ready: true }))
            .catch((err: any) => console.error(err));
    }

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

    async toggleValidation(taskId: number, index: number) {
        console.log('clicked !');
        if (this.subject.tasks[index].advancements.length === 0) {
            // If it was originally unchecked we send a request to validate
            this.setState({ disabled: true });

            try {
                await axios.post('/advancements', {
                    taskId,
                });
            } catch (err: any) {
                console.error(
                    'There was an error, that we should handle more properly'
                );
                console.error(err);
            } finally {
                this.setState({ disabled: false });
            }
        } else {
            const advancementId = this.subject.tasks[index].advancements[0].id;
            this.setState({ disabled: true });

            try {
                await axios.delete('/advancements/' + advancementId);
            } catch (err: any) {
                console.error(
                    'There was an error, that we should handle more properly'
                );
                console.error(err);
            } finally {
                this.setState({ disabled: false });
            }
        }

        // Otherwise when send a request to uncheck
    }

    render() {
        return this.state.ready ? (
            <Container className="layout">
                <Grid
                    container
                    spacing={2}
                >
                    {this.state.subjects.map(subject => {
                        return (
                            <Grid item xs={3}>
                                <Card className='subject-card'>
                                    <ThemeProvider theme={theme}>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant='h4'
                                                component='h2'
                                            >
                                                {subject.name}
                                            </Typography>
                                            <ul>
                                                {subject.tasks.map((task, index) => {
                                                    return (
                                                        <li key={task.id}>
                                                            <Tooltip title={task.description}>
                                                                <Checkbox
                                                                    color='primary'
                                                                    disableRipple
                                                                    onClick={() => this.toggleValidation(task.id, index)}
                                                                    checked={task.advancements.length > 0}
                                                                    disabled={this.state.disabled}
                                                                />
                                                            </Tooltip>
                                                            {task.name}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </CardContent>
                                    </ThemeProvider>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        ) : (
            <></>
        );
    }
}

export default SubjectCard;
