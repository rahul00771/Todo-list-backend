import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/keys';

const authenticatToken = (req, res, next) => {

    const token = req.header('Authorization');

    if(!token)
    {
        return res.status(401).json({message: "No teoken provided"});
    }

    try {
        
        const decoded = jwt.verify(token, jwtSecret.jwtSecretKey);
        req.user = decoded;
        console.log(user);
        next();

    } catch (error) {
        res.status(401).json({message: "Invalid token"});
    }
}

export default authenticatToken;