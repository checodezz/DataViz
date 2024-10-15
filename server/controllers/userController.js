import User from "../model/user.js";

export const userSigUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Validate fields
        if (!(fullname && email && password)) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password and create the user
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullname,
            email,
            password: encryptedPassword,
        });

        await user.save(); // Save the user
        res.status(201).json({ message: "Account created successfully" }); // No token needed here
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
