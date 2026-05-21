// backend/controllers/authController.js
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';



// Signup Controller
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Enter the valid Details" })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User Already Exist !" })
        }
        const user = await User.create({ username, email, password })
        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400).json({ message: "Invalid User Data" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Login Controller

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter Credentials Properly ! " })
        }

        const user = await User.findOne({email}).select('+password');
        if (user && (await user.comparePassword(password))) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(401).json({ message: "Invalid Password or Email " })
        }

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}