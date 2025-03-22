const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const upload = require("../multer/multer");
const User = require("../models/User");

router.post("/register", upload.single("profilePicture"), async (req, res) => {
    try {
        const { firstName, lastName, email, birthDate, phoneNumber, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "Email already exists. Please use a different email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            first_name: firstName,
            last_name: lastName,
            email,
            profile_picture: req.file ? req.file.path : null,
            birth_date: birthDate,
            phone_number: phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();
        res.json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ error: "Invalid password" });
        }

        const token = sign({ userId: user._id, email: user.email }, "importantsecret", {
            expiresIn: "24h",
        });

        res.json({ token, user: { userId: user._id, email: user.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
});

router.get("/user/:userId", async (req, res) => {
    try {
        console.log("sdf")
        const userId = req.params.userId;

        const user = await User.findById(userId);
        console.log(user)

        if (!user) {
            return res.json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;