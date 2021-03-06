/*eslint-env es6*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.cookies.jwt;

    if (!authorization) {
        return res
            .status(401)
            .send({ message: 'Необходима авторизация' });
    }

    // if (!authorization || !authorization.startsWith('Bearer ')) {
    //     return res
    //         .status(401)
    //         .send({ message: 'Необходима авторизация' });
    // }

    //const token = authorization.replace('Bearer ', ''); // извлечение токена полученного из заголовка authorization, const { authorization } = req.headers


    const token = authorization
    let payload;

    try {
        payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
        return res
            .status(401)
            .send({ message: 'Необходима авторизация' });
    }

    req.user = payload; // записываем пейлоуд в объект запроса

    next();
}; 