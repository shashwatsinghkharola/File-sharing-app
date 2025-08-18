const router = require('express').Router();
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error registering user");
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Successfully logged in", user });
    });
  })(req, res, next);
});


router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router