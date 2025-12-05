import express from "express";
import userSchema from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const SALT_ROUNDS = 10;

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body ?? {};
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required." });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check duplicate user
        const existing = await userSchema.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(409).json({ error: "Email already registered." });
        }

        // Create user
        // NOTE: Password hashing is handled in the User model pre-save hook
        const user = await userSchema.create({
            name: name.trim(),
            email: normalizedEmail,
            password: password, // Pass plain password, model will hash it
        });

        console.log(`User created successfully: ${user._id}`);

        // Create JWT
        const payload = { _id: user._id, name: user.name, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// ----------------------- LOGIN -----------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body ?? {};
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await userSchema.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Create token
        const payload = { _id: user._id, name: user.name, email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            message: "Login successful",
            token,
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;