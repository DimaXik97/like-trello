const { Router } = require("express");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const Board = require("../models/Board");

const router = Router();
var jsonParser = bodyParser.json();

router.post(
  "/",
  [jsonParser, check("name", "invalidName").isLength({ min: 2 })],
  async (req, res) => {
    const owner = "dimaxik97@gmail.com";
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Error data",
      });
    }
    const { name, status } = req.body;

    const boardCandidate = await Board.findOne({ name });

    if (boardCandidate) {
      return res.status(400).json({
        errors: errors.array(),
        message: "This name already exist",
      });
    }
    const board = new Board({
      owner,
      status,
      name,
      availableFor: [],
      createdAt: Date.now(),
    });
    await board.save();

    res.json(board);
  }
);

module.exports = router;
