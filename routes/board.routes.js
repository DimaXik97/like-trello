const { Router } = require("express");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const Board = require("../models/Board");
const User = require("../models/User");

const auth = require("../middleware/auth.middleware");
const getUser = require("../middleware/getUser.middleware");

const router = Router();
var jsonParser = bodyParser.json();

router.post(
  "/",
  [auth, jsonParser, check("name", "invalidName").isLength({ min: 2 })],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Error data",
      });
    }
    const { name, isPublic, availableFor } = req.body;

    const boardCandidate = await Board.findOne({ name, owner: req.user.email });

    if (boardCandidate) {
      return res.status(400).json({
        errors: errors.array(),
        message: "This name already exist",
      });
    }
    const board = new Board({
      owner: req.user.email,
      isPublic,
      name,
      availableFor,
      createdAt: Date.now(),
    });
    await board.save();

    res.json(board);
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.email }).exec();
    return res.json(boards);
  } catch (errors) {
    return res.status(400).json({
      errors: errors,
      message: "Error data",
    });
  }
});


router.get("/:id", getUser, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const canSave = async (board) => {
    if (user.email) {
      if (board.owner === user.email) return board;
      else {
        const curentUser = await User.findOne({ email: user.email });
        if (curentUser.savedBoard.includes(id)) return board;
        else return { ...board.toJSON(), canSave: true };
      }
    } else return board;
  };
  try {
    const board = await Board.findById(id);
    if (!board) {
      return res.status(400).json({
        message: "Not found",
      });
    }
    if (board.isPublic) return res.json(await canSave(board));
    else {
      if (!user)
        return res.status(400).json({
          message: "Not found",
        });
      else if (board.owner === user.email) {
        return res.json(await canSave(board));
      } else {
        const isAvailable = board.availableFor.indexOf(user.email);
        if (isAvailable >= 0) return res.json(await canSave(board));
        else
          return res.status(400).json({
            message: "Not found",
          });
      }
    }
  } catch (errors) {
    console.log(errors);
    return res.status(400).json({
      errors: errors,
      message: "Error data",
    });
  }
});
router.put(
  "/:id",
  [auth, jsonParser, check("name", "invalidName").isLength({ min: 2 })],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Error data",
      });
    }
    const id = req.params.id;
    const board = await Board.findOne({ _id: id, owner: req.user.email });

    if (board) {
      const { name, isPublic, availableFor } = req.body;
      const boardWithSameName = await Board.findOne({
        name,
        owner: req.user.email,
      });

      if (boardWithSameName && boardWithSameName._id.toString() !== id) {
        return res.status(400).json({
          errors: errors.array(),
          message: "This name already exist",
        });
      }
      board.name = name;
      board.availableFor = availableFor;
      board.isPublic = isPublic;
      await board.save();
      return res.json(board);
    } else {
      return res.status(400).json({
        errors: errors.array(),
        message: "Not found",
      });
    }
  }
);
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Board.findOneAndDelete({
      _id: id,
      owner: req.user.email,
    });
    if (data) return res.json({ id });
    else
      return res.status(400).json({
        errors: e,
        message: "Not found",
      });
  } catch (e) {
    return res.status(400).json({
      errors: e,
      message: "Not found",
    });
  }
});

module.exports = router;
