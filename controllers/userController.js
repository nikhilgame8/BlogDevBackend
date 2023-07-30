const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.hashPassword();
    await user.save();

    res.json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !await user.verifyPassword(password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.following.includes(userIdToFollow)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    user.following.push(userIdToFollow);
    await user.save();

    res.json({ message: 'Successfully followed the user' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to follow the user' });
  }
};
