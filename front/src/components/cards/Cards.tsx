import React from 'react'
import SubjectCard from '../subjectCard/SubjectCard';
import {
    Grid,
} from '@material-ui/core';

const mockData = [
    {
        'id': 0,
        'title': 'Cuisine',
        'tasks': ['Râper des carottes',
            'Couper des courgettes',
            'Farie la vaisselle']
    },
    {
        'id': 1,
        'title': 'Bricolage',
        'tasks': ['Remplacer la porte',
            'Planter un clou',
            'Ramasser la poussière',
            'faire la peinture']
    },
    {
        'id': 2,
        'title': 'Cuisine',
        'tasks': ['Râper des carottes',
            'Couper des courgettes',
            'Farie la vaisselle']
    },
    {
        'id': 3,
        'title': 'Sport',
        'tasks': ['Faire du vélo',
            'Faire de la course à pied',
            'Aller à la piscine']
    },
];

export default function Cards() {
    return (
        <Grid container justify="center" spacing={3}>
            {mockData.map((subject: any) => {
                return (
                    <Grid item>
                        <SubjectCard key={subject.id}></SubjectCard>
                    </Grid>
                )
            })}
        </Grid>
    )
}
