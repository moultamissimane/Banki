const { Router } = require("express");
const { check } = require("express-validator");
const {
  CreateTransaction,
  GetTransactions,
  GetTransactionById,
} = require("../Controllers/TransactionController");
const {
  isValidId,
  isValidTransaction,
} = require("../Helpers/DbValidation");
const validateFields = require("../Middlewares/ValidateFields");
const { validateJWT } = require("../Middlewares/ValidateJWT");

const router = Router();

//Get all transactions
router.get("/", GetTransactions);

//Get a transaction by id
router.get(
  "/:id",
  [check("id").isMongoId(), check("id").custom(isValidTransaction)],
  GetTransactionById
);

//Create a transaction
router.post(
  "/",
  [
    validateJWT,
    check("amount").notEmpty(),
    check("userTo").notEmpty(),
    check("userFrom").notEmpty(),
    // check('id').isMongoId(),
    // check('id').custom(isValidId),
    validateFields,
  ],
  CreateTransaction
);

module.exports = router;
