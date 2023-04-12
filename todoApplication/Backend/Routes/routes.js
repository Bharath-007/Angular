const express = require("express");
const router = express.Router();
const {
  login,
  getUsers,
  deleteByID,
  getUserById,
  register,
  verifyToken,
  authenticate,
} = require("../View/Controller/userController");
const {
  createTodo,
  getTodo,
  deleteTodo,
  getTodoByID,
  updateTodo,
  getFavourites,
} = require("../View/Controller/todoController");

router.get("/", getUsers);
router.delete("/:id", deleteByID);
router.get("/:id", getUserById);
router.post("/login", login);
router.post("/register", register);

router.post("/users/:userId/createTodo", createTodo);
// router.post("/users/:userId/todo/:id", updateTodo);
router.get("/users/:userId/todos", getTodo);
router.get("/users/:userId/:id/todos", getTodoByID);
router.get("/users/:userId/favTodos", getFavourites);
router.patch("/users/:userId/:id/todos", updateTodo);
router.delete("/users/:userId/:id/todos", deleteTodo);

module.exports = router;
