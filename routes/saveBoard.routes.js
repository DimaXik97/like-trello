const { Router } = require("express");
var bodyParser = require("body-parser");

const Board = require("../models/Board");
const User = require("../models/User");

const auth = require("../middleware/auth.middleware");

const router = Router();

router.get("/saved", auth, async (req, res) => {
  try {
    const curentUser = await User.findOne({ email: req.user.email });
    const savedBoards = await Board.find({ _id: curentUser.savedBoard }).exec();
    return res.json(savedBoards);
  } catch (errors) {
    return res.status(400).json({
      errors: errors,
      message: "Error data",
    });
  }
});
router.put("/saved/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    await User.updateOne(
      { email: req.user.email },
      { $addToSet: { savedBoard: [id] } }
    );
    const board = await Board.findOne({ _id: id });
    return res.json(board);
  } catch (errors) {
    return res.status(400).json({
      errors: errors,
      message: "Error data",
    });
  }
});
router.put("/saved/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    await User.updateOne(
      { email: req.user.email },
      { $addToSet: { savedBoard: [id] } }
    );
    const board = await Board.findOne({ _id: id });
    return res.json(board);
  } catch (errors) {
    return res.status(400).json({
      errors: errors,
      message: "Error data",
    });
  }
});

router.delete("/saved/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    await User.updateOne(
      { email: req.user.email },
      { $pull: { savedBoard: id } }
    );
    const board = await Board.findOne({ _id: id });
    return res.json({ ...board.toJSON(), canSave: true });
  } catch (errors) {
    return res.status(400).json({
      errors: errors,
      message: "Error data",
    });
  }
});

module.exports = router;
