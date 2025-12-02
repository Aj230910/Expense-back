const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/add", addTransaction);   // ⭐ KEEP THIS
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);

module.exports = router;
