function roles(...rolesPermitidos) {

    return (req, res, next) => {

        if (!rolesPermitidos.includes(req.usuario.rol)) {

            return res.status(403).json({
                error: "Acceso denegado"
            });
        }

        next();
    };
}

module.exports = roles;