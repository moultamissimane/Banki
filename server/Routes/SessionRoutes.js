const { Router } = require("express");
const { validateSession } = require("../Controllers/Session");
const { validateJWT } = require("../Middlewares/ValidateJwt");

const router = Router();

router.post("/", [validateJWT], validateSession);

module.exports = router;
