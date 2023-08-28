const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://zayn:zayn@shaikhsapi.cxchbdo.mongodb.net/Secrets?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

const userSchema = {
  email: String,
  password: String
};

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save()
  .then(() => {
    res.render("secrets");
  })
  .catch(err => {
    console.log(err);
  });

});

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ email: username })
      .then(foundUser => {
        if (foundUser && foundUser.password === password) {
          res.render("secrets");
        } else {
          res.send("Invalid username or password");
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
