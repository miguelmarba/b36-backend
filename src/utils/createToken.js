const jwt = requere('jsonwebtoken')

const createToken = ({ email, first_name}) => {
    const payload = {
        email,
        first_name
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expireIn: '1d' });
};