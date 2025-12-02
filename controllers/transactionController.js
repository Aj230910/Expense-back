const Transaction = require("../models/Transaction");

// ⭐ Add a transaction
exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, category, type, deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json({ msg: "deviceId missing" });
    }

    const newTx = new Transaction({
      title,
      amount,
      category,
      type,
      deviceId
    });

    const saved = await newTx.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ⭐ Get all transactions (ONLY this device)
exports.getTransactions = async (req, res) => {
  try {
    const { deviceId } = req.query;

    if (!deviceId) {
      return res.status(400).json({ msg: "deviceId missing in query" });
    }

    const tx = await Transaction.find({ deviceId }).sort({ date: -1 });
    res.json(tx);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ⭐ Delete transaction (only from this device)
exports.deleteTransaction = async (req, res) => {
  try {
    const { deviceId } = req.query;

    if (!deviceId) {
      return res.status(400).json({ msg: "deviceId missing" });
    }

    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      deviceId
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Not found or unauthorized" });
    }

    res.json({ msg: "Transaction Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ⭐ Update transaction (only from this device)
exports.updateTransaction = async (req, res) => {
  try {
    const { deviceId } = req.query;

    if (!deviceId) {
      return res.status(400).json({ msg: "deviceId missing" });
    }

    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, deviceId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Not found or unauthorized" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};
