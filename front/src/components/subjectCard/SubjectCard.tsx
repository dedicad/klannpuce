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

interface SubjectCardProps {}

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

    async componentDidMount() {
        await axios
            .get('/subjects')
            .then((res: any) =>
                this.setState({ subjects: res.data, ready: true })
            )
            .catch((err: any) => console.error(err));
    }
    async toggleValidation(
        task: Task,
        subjectIndex: number,
        taskIndex: number
    ) {
        if (task.advancements.length === 0) {
            // If it was originally unchecked we send a request to validate
            this.setState({ disabled: true });

            try {
                const advancement = (await axios.post('/advancements', {
                    taskId: task.id,
                })).data;
                const newSubjects = this.state.subjects.map(
                    (subject, index) => {
                        const newSubject = { ...subject };
                        if (index === subjectIndex) {
                            const newTasks = [...subject.tasks];
                            newTasks[taskIndex].advancements.push(
                                advancement
                            );
                            newSubject.tasks = newTasks;
                        }
                        return newSubject;
                    }
                );
                this.setState({ subjects: newSubjects });
            } catch (err: any) {
                console.error(
                    'There was an error, that we should handle more properly'
                );
                console.error(err);
            } finally {
                this.setState({ disabled: false });
            }
        } else {
            // Otherwise when send a request to uncheck

            const advancementId = task.advancements[0].id;
            this.setState({ disabled: true });

            try {
                await axios.delete('/advancements/' + advancementId);
                const newSubjects = this.state.subjects.map(
                    (subject, index) => {
                        const newSubject = { ...subject };
                        if (index === subjectIndex) {
                            const newTasks = [...subject.tasks];
                            newTasks[
                                taskIndex
                            ].advancements = [] as Advancement[];
                            newSubject.tasks = newTasks;
                        }
                        return newSubject;
                    }
                );
                this.setState({ subjects: newSubjects });
            } catch (err: any) {
                console.error(
                    'There was an error, that we should handle more properly'
                );
                console.error(err);
            } finally {
                this.setState({ disabled: false });
            }
        }
    }

    render() {
        return this.state.ready ? (
            <Container className='layout'>
                <Grid container spacing={2}>
                    {this.state.subjects.map((subject, subjectIndex) => {
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
                                                {subject.tasks.map(
                                                    (task, taskIndex) => {
                                                        return (
                                                            <li key={task.id}>
                                                                <Tooltip
                                                                    title={
                                                                        task.description
                                                                    }
                                                                >
                                                                    <Checkbox
                                                                        color='primary'
                                                                        disableRipple
                                                                        onClick={() =>
                                                                            this.toggleValidation(
                                                                                task,
                                                                                subjectIndex,
                                                                                taskIndex
                                                                            )
                                                                        }
                                                                        checked={
                                                                            task
                                                                                .advancements
                                                                                .length >
                                                                            0
                                                                        }
                                                                        disabled={
                                                                            this
                                                                                .state
                                                                                .disabled
                                                                        }
                                                                    />
                                                                </Tooltip>
                                                                {task.name}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </CardContent>
                                    </ThemeProvider>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        ) : (
            <></>
        );
    }
}

export default SubjectCard;
