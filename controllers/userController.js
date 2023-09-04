const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const getUserList = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                avatar: user.avatar
            }
        }));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { name, password } = req.query;

    try {
        const user = await User.findOne({ name: name, password: password });

        res.status(200).json({ id: user.id, name: user.name });
    } catch (error) {
        console.log(error.message);
    }
};

const registerUser = async (req, res) => {
    try {

        const { name, password, email } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({ error: 'Please provide all the required fields' });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({ error: 'Email is already registered' });
        }

        const user = await User.create(req.body);
        res.status(200).json(user);


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const deletedUser = await User.deleteOne(
            { name: name, email: email });
        if (deletedUser.deletedCount === 0) {
            res.status(404).json({ message: 'The user was not found.' });
        } else {
            res.status(200).json({ message: 'User deleted successfully.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUserList,
    getUserById,
    loginUser,
    registerUser,
    deleteUser
};