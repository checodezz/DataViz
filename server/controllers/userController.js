import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs"

export const userSigUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!(fullname && email && password)) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(401).json({ message: "User already exists" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullname,
            email,
            password: encryptedPassword,
        });

        await user.save();
        user.password = undefined;
        res.status(201).json({ user, message: "Account created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ error: "User does not exist, Please sign up and try again" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        existingUser.token = token;
        existingUser.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        console.log(existingUser);
        return res.status(200).cookie("token", token, options).json({ success: true, existingUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const userLogout = (req, res) => {
    res.cookie("token", undefined, { expires: new Date(0), httpOnly: true });
    return res.status(200).json({ message: "Logged out successfully" });
};


export const userDashboard = async (req, res) => {
    console.log(req.user)
    res.status(200).json("welcome to dashboard")
}