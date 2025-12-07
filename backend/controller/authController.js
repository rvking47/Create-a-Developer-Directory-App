import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exitsEmail = await User.findOne({ email });
        if (exitsEmail) {
            return res.status(402).json({ message: "This Email already exits!!" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const response = new User({
            name,
            email,
            password: hashPassword
        });
        await response.save();
        res.status(201).json({ message: `${name} Singup SuccessFully!!`, response })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exitsUser = await User.findOne({ email });
        if (!exitsUser) {
            return res.status(402).json({ message: "Email and Password wrong!!" })
        }
        const exitsPassword = await bcrypt.compare(password, exitsUser.password);
        if (!exitsPassword) {
            return res.status(402).json({ message: "Email and Password wrong!!" })
        }
        const jwToken = jwt.sign({ _id: exitsUser._id, email: exitsUser.email }, process.env.API_Key, {
            expiresIn: "8h"
        });
        res.status(200).json({ message: "User Login SuccessFully!!", token: jwToken, user: { _id: exitsUser._id, name: exitsUser.name, email: exitsUser.email } });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { signUp, logIn };