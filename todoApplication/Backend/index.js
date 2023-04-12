const express = require("express");
const app = express();
const cookie = require("cookie");
const mongoose = require("mongoose");
const routes = require("./Routes/routes");
const cors = require("cors");
const cookieSession = require("cookie-session");
app.use(express.static("app"));
const cookieParser = require("cookie-parser");

// const corsOptions = {
//   origin: "http://localhost:3000",
// };

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(cookieParser());
//checking the cookies

const port = 3000;
const mongoUrl =
  "mongodb+srv://Admin:1234@cluster0.gje8oxl.mongodb.net/Todo's?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl)
  .then(() =>
    app.listen(port, () =>
      console.log(`Connected and listening on port http://localhost: ${port}`)
    )
  )
  .catch((err) => console.log(err));
