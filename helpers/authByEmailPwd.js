import { USER_BBDD } from '../src/bbdd.js';
const authByEmailPwd = ( email, password ) => {
    const user = USER_BBDD.find((user) => user.email === email)
    if (!user) throw new Error()

    if (user.password !== password) throw new Error()

    return user
}

export default authByEmailPwd;