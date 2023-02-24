//Importaciones
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
} = require("../controllers/usuario");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esMaestroRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/mostrar", getUsuarios);

router.post(
  "/agregarMaestro",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 5 digitos").isLength({
      min: 5,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").default("ROL_MAESTRO").custom(esRoleValido),
    validarCampos,
  ],
  postUsuario
);

router.post(
  "/agregarAlumno",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 5 digitos").isLength({
      min: 5,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").default("ROL_ALUMNO").custom(esRoleValido),
    validarCampos,
  ],
  postUsuario
);

router.put(
  "/editarMaestro/:id",
  [
    validarJWT,
    esMaestroRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  putUsuario
);

router.put(
    "/editarAlumno/:id",
    [
      validarJWT,
      check("id", "No es un ID valido").isMongoId(),
      check("id").custom(existeUsuarioPorId),
      validarCampos,
    ],
    putUsuario
  );

router.delete(
  "/eliminarMaestro/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
    esMaestroRole,
  ],
  deleteUsuario
);

router.delete(
  "/eliminarAlumno/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUsuario
);

module.exports = router;
