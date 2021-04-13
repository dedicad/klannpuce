import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const teacher: CreateUserDto = {
    name: 'Robin',
    email: 'robin@supelec.fr',
    password: '7**32ZzF[n)kf{8zr?0A5UU`0oyAco',
    role: 'teacher',
  };
  
  export const student: CreateUserDto = {
    name: 'Jacques',
    email: 'jacques@supelec.fr',
    password: 'f,njGIYF%T9QLlRR?>DelG6>}KNtTq',
    role: 'student',
  };
  
  export const admin: CreateUserDto = {
    name: 'Benoit',
    email: 'benoit@supelec.fr',
    password: 'EK$recEMHd[Y[[aa6AHBoYNNMqM^',
    role: 'admin',
  };
  