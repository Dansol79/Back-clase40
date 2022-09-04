import bcrypt from 'bcrypt';

const validPassword = (password, hash) => {
    return await bcrypt.compare(password, hash);
}

export default validPassword;