import bcryptjs from "bcryptjs";
import User from "../model/user.model.js";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname,
            email,
            password: hashedPassword
        });
        await createdUser.save();
        // Send user data in success response
        res.status(201).json({
            message: "user created successfully",
            user: {
                id: createdUser._id,  // Fixed _id
                fullname: createdUser.fullname,
                email: createdUser.email
            }
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in DB
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare entered password with the hashed password in DB
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Return a success response with user data
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: error.message });
    }
};

