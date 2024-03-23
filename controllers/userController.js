import model from "../models/model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await model.User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
export const getUser = async (req, res) => {
  try {
    const user = await model.User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await model.User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await model.User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: res.json }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await model.User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await model.Thought.deleteMany({ username: deletedUser.username });
    res
      .status(200)
      .json({ message: "User and user data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all friends of a user
export const getAllFriends = async (req, res) => {
  try {
    const user = await model.User.findById(req.params.userId).populate(
      "friends"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a friend to a user
export const createFriend = async (req, res) => {
  try {
    const user = await model.User.findById(req.params.userId);
    const friend = await model.User.findById(req.body.friendId);
    console.log({ user, friend });
    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!friend) {
      return res.status(404).json({ message: "friend not found" });
    }
    user.friends.push(friend);
    await user.save();
    res.status(201).json(user.friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a friend from a user
export const deleteFriend = async (req, res) => {
  try {
    const user = await model.User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.friends.pull(req.params.friendId);
    await user.save();
    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
