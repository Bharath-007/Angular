const Todo = require("../../Model/todoListSchema");

//to create todo task by userId
const createTodo = async (req, res, next) => {
  const { todoName, todoDescription, isCompleted, isFavourite } = req.body;
  console.log(todoName, todoDescription, isCompleted, isFavourite);
  let todo;
  try {
    todo = new Todo({
      userId: req.params.userId,
      todoName,
      todoDescription,
      isCompleted,
      isFavourite,
    });
    todo = await todo.save();
    console.log(todo);
  } catch (err) {
    next(err);
  }
  if (!todo) {
    return res.status(500).json({ message: "unable to add todo" });
  }
  return res.status(201).json({ todo, message: "Todo Added" }); //201 - something is created in the database
};

// router.get("/users/:userId/todos", getTodo);
const getTodo = async (req, res, next) => {
  let todoLists;
  try {
    todoLists = await Todo.find({ userId: req.params.userId });
  } catch (err) {
    next(err);
  }
  if (!todoLists) {
    return res.status(500).json({ message: "unable to retrieve todo list" });
  }
  //   res.status(200).json({ message: "todo retrieve successfully" });
  return res.send(todoLists); //201 - something is created in the database
};

const getTodoByID = async (req, res, next) => {
  console.log(req.params.userId);
  let todo;
  try {
    todo = await Todo.findOne({
      userId: req.params.userId,
      _id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
  if (!todo) {
    return res.status(500).json({ message: "unable to retrieve todo list" });
  }
  return res.status(200).json(todo);
};

const getFavourites = async (req, res, next) => {
  let todo;
  try {
    todo = await Todo.find({
      userId: req.params.userId,
      isFavourite: true,
    });
  } catch (err) {
    next(err);
  }
  if (!todo) {
    return res.status(500).json({ message: "unable to list favourites" });
  }
  return res.status(200).json(todo);
};

const updateTodo = async (req, res, next) => {
  let todo;
  try {
    todo = await Todo.findByIdAndUpdate(
      {
        userId: req.params.userId,
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    );
  } catch (err) {
    return next(err);
  }
  if (!todo) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ message: "successfully updated" });
};

const deleteTodo = async (req, res, next) => {
  let todo;
  try {
    todo = await Todo.findByIdAndDelete({
      userId: req.params.userId,
      _id: req.params.id,
    });
  } catch (err) {
    return next(err);
  }
  if (!todo) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "successfully deleted" });
};

module.exports = {
  createTodo,
  getTodo,
  deleteTodo,
  getTodoByID,
  updateTodo,
  getFavourites,
};
