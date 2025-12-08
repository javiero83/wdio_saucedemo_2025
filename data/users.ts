
//Usuarios del sistema
export interface User{
    username: string;
    password: string;
}

export const users: Record<string, User> = {
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce',
    },
    lockedUser: {
        username: 'locked_out_user',
        password: 'secret_sauce',
    },
    problemUser: {
        username: 'problem_user',
        password: 'secret_sauce',
    }
};