import express from "express";
import mongoose from "mongoose";
import key from "./keys";
import authRouter from "./router/auth";

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(key.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to banki app." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
