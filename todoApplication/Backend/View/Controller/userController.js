const User = require("../../Model/userSchema");
let jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { name, age, city, state, pincode, password, confirmPassword } =
    req.body;
  let user;
  try {
    user = new User({
      name,
      age,
      city,
      state,
      pincode,
      password,
      confirmPassword,
    });
    console.log(user);
    user = await user.save();
  } catch (err) {
    next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "unable to save user data" });
  }
  return res.status(201).json({ user }); //201 - something is created in the database
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find(); //searching the users
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json({ users });
};

const getUserById = async (req, res, next) => {
  const id = req.body.id;
  let users;
  try {
    users = await User.findOne({ id }); //searching the user by id
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json({ users });
};

const deleteByID = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "successfully deleted" });
};

const login = async (req, res, next) => {
  const { name, password } = req.body;
  let token;
  try {
    const user = await User.findOne({ name, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid name or password" });
    }
    console.log(user);
    return res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["Cookie"]; //here requesting the auth header
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1]; // the auth header consists of Bearer and authorization token [2 parameter] so splitting and traversing & checking if it is authheader and storing the token in variable token
  console.log(token);
  //if token is not present
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, "secretKey", (err, user) => {
    console.log(user);
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; //if name is stored in user
    next();
  });
  console.log(req.cookies);
};

// const authorization = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   console.log(token);
//   if (!token) {
//     return res.sendStatus(403);
//   }
//   // Even more logic goes here
// };

const authenticate = (res, req, next) => {
  const header = req.header["authorization"];
  const token = header && header.split(" ")[1];
  if (token) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, "secretKey", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        res.user = user;
        next();
      }
    });
  }
};

module.exports = {
  getUsers,
  deleteByID,
  register,
  login,
  getUserById,
  verifyToken,
  authenticate,
};
