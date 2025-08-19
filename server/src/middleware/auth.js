import jwt from 'jsonwebtoken';

export function authRequired(req, res, next) {
    try {
        const authHeader = req.headers.authorization || '';
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.substring('Bearer '.length);
        const accessSecret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
        if (!accessSecret) {
            return res.status(500).json({ message: 'Missing JWT access secret' });
        }
        const payload = jwt.verify(token, accessSecret);
        req.user = payload;
        return next();
    } catch (error) {
        const isExpired = error && error.name === 'TokenExpiredError';
        return res.status(401).json({ message: isExpired ? 'Access token expired' : 'Invalid token' });
    }
}


