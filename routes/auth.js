const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    registerValidation,
    loginValidation,
} = require("../configs/validation");

router.post("/register", async(req, res) => {
    // Let validate the data before we a user

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send("Email is already exist");
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

//Login
router.post("/login", async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Checking if email is exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Email or password is wrong");
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.sendStatus(400).send("Invalid Password");

    // Now We sohuld create a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});

module.exports = router;