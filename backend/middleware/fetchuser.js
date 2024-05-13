const jwt = require('jsonwebtoken');
const JWT_secret = "iNotesMyApp";

const fetchuser = (req, res, next) => {
    // Get user from jwt token and add user id to req object
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: "Please authenticate with valid token"});
    }

    try {
        const data = jwt.verify(token, JWT_secret);
        req.user = data.user;
        next();
    } catch(error) {
        res.status(401).send({error: "Please authenticate with valid token"});
    }
}


module.exports = fetchuser;