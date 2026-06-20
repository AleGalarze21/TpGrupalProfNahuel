const jwt = require("jsonwebtoken");

function authw(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "Acceso no autorizado"
        });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Token inválido"
        });
    }
}

module.exports = authw;