const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

Todo.exists;

//Post a new todo
router.post("/", async (req, res) => {
  const post = new Todo({
    desc: req.body.desc,
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
    res.status(200).json(todos);
  } catch (err) {
    res.json(err);
  }
});

//get a specific todo
router.get("/:todoId", async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.todoId }).exec();
    if (todo === null) {
      res.status(404).send(`Couldn't find the task you're looking for!`);
    } else {
      res.status(200).json(todo);
    }
  } catch (err) {
    res.json(err);
  }
});

//Delete a todo
router.delete("/:todoId", async (req, res) => {
  try {
    const todo = await Todo.deleteOne({ id: req.params.todoId }).exec();
    if (todo === null) {
      res.status(404).send(`Couldn't find the task you want to delete!`);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.json(err);
  }
});

//Patch a todo
router.patch("/:todoId", async (req, res) => {
  if (await Todo.exists({ id: req.params.todoId })) {
    try {
      await Todo.updateOne(
        { id: req.params.todoId },
        {
          desc: req.body.desc,
          isCompleted: req.body.isCompleted,
        },
        { omitUndefined: true }
      ).exec();
      res.status(200).send();
    } catch (err) {
      res.json(err);
    }
  } else {
    res.status(404).send(`Couldn't find the task you want to modify!`);
  }
});

module.exports = router;
