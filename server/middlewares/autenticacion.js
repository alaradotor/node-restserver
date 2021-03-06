const jwt = require('jsonwebtoken');


//=================
//Verificar Token
//=================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

    // // res.json({
    // //     token: token
    // // });
    // console.log(token);

};
//=================
//Verifica Admin_role
//=================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role != 'ADMIN_ROLE') {

        return res.status(401).json({
            ok: false,
            err: {
                message: "Usuario sin privilegios"
            }
        });

    };


    next();


};


module.exports = {
    verificaToken,
    verificaAdmin_Role
}