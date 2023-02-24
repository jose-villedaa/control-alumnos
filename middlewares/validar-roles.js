const { request, response } = require('express');



const esMaestroRole = (req = request, res = response, next)=>{
    
    //Verificar que el rol sea ADMIN_ROLE
    const {rol, nombre} = req.usuario;

    if(rol !== 'ROL_MAESTRO'){
        return res.status(500).json({
            msg: `${ nombre } No es maestro - No tiene acceso a esta funcion`
        });
    }else{
        next();
    }
}

const esAlumnoRole = (req = request, res = response, next)=>{
    
    //Verificar que el rol sea ADMIN_ROLE
    const {rol, nombre} = req.usuario;

    if(rol !== 'ROL_ALUMNO'){
        return res.status(500).json({
            msg: `${ nombre } No es alumno - No tiene acceso a esta funcion`
        });
    }else{
        next();
    }
}



module.exports = {
    esMaestroRole,
    esAlumnoRole
}