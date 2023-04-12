/**
 * Rutas de Usuarios / Auth
 * host + /api/events
 */
const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

// todas tienen que pasar por la validacion del JWT
router.use(validarJWT);

// Obtener eventos
router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de Inicio es obligatoria").custom(isDate),
    check("end", "Fecha de Finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

router.put("/:id", actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;
