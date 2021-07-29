const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

//Post a new todo
router.post("/", async (req, res) => {
  const post = new Todo({
    desc: req.body.desc,
    order: req.body.order,
  });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch {
    (err) => res.json(err);
  }
});

//Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json(err);
  }
});

//get a specific todo
router.get("/:todoId", async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.todoId }).exec();
    res.json(todo);
  } catch (err) {
    res.json(err);
  }
});

//Delete a todo
router.delete("/:todoId", async (req, res) => {
  try {
    const todo = await Todo.deleteOne({ id: req.params.todoId }).exec();
    res.status(200).send();
  } catch (err) {
    res.json(err);
  }
});

//Patch a todo
router.patch("/:todoId", async (req, res) => {
  try {
    await Todo.updateOne(
      { id: req.params.todoId },
      {
        desc: req.body.desc,
        order: req.body.order,
        isCompleted: req.body.isCompleted,
      },
      { omitUndefined: true }
    ).exec();
    res.status(200).send();
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
