
/*
import jwt from 'jsonwebtoken';
import { User } from '../module/authModule/userModel.js';


export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }


        const token = authHeader.split(' ')[1];


        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED:", decoded);
        const user = await User.findById(decode.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();


    } catch (error) {
        return res.status(401).json({ message: 'Unauthorizedc  error' });
    }
}

*/



import jwt from 'jsonwebtoken';
import { User } from '../module/authModule/userModel.js';

export const authMiddleware = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const token = authHeader.split(' ')[1];

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decode);

        const user = await User.findById(decode.id);

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: 'Unauthorized error'
        });
    }
};