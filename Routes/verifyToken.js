const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_CES, (err, user) => {
            if (err) return res.status(403).json("El token es incorrecto!");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("No estas autenticado!");
    }
};
const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("No tienes permiso para hacer esta accion.")
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("No tienes permiso para hacer eso!");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin }