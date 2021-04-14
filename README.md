# Developement and Web Security

# Technologies Used

NestJS (on top of NodeJS+Express) and ReactJS with mysql as database (typeORM as ORM), docker and docker-compose for containerization.

# How to launch the project
If you have docker and docker-compose installed on your computer, juste run : 
```
docker-compose up
```

This will create development docker, that will update whenever your code changes. You can observe your apps at *http://localhost:3000* (front) and *http://localhost:8000* (back)

The database will be populate with a few user at startup, you may use them to connect to the site : 

    email: 'robin@supelec.fr',
    password: '7**32ZzF[n)kf{8zr?0A5UU`0oyAco',
    role: 'teacher',

  

    email: 'jacques@supelec.fr',
    password: 'f,njGIYF%T9QLlRR?>DelG6>}KNtTq',
    role: 'student',

  

    email: 'benoit@supelec.fr',
    password: 'EK$recEMHd[Y[[aa6AHBoYNNMqM^',
    role: 'admin',

  
  It is not possible to easily create additional users for now, and only admin are allowed to.


# Known issues
In setup phases, the node_modules behavior with Windows has been erratic, we did not have time to make a perfect configuration for this unfortunately.

Additionnaly, it is possible that due to speed race, the docker container for the backend is not waiting the final signal for the database to be intialised the first time, just ctrl+c and redo docker-compose up in this case and this will work on second time.
