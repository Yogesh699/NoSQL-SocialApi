import model from "../models/model.js";

// Get all thoughts
export const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await model.Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single thought by ID
export const getThought = async (req, res) => {
  try {
    const thought = await model.Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new thought
export const createThought = async (req, res) => {
  try {
    const newThought = await model.Thought.create(req.body);
    const user = await model.User.find({ username: req.body.username });
    await model.User.findOneAndUpdate(
      user.username,
      {
        $push: { thoughts: newThought._id },
      },
      { new: true }
    );
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a thought
export const updateThought = async (req, res) => {
  try {
    const updatedThought = await model.Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(200).json(updatedThought);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a thought

export const deleteThought = async (req, res) => {
  try {
    const deletedThought = await model.Thought.findByIdAndDelete(
      req.params.thoughtId
      // { username: req.body.username } // Assuming authorization is checked
    );
    if (!deletedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    await model.User.findOneAndUpdate(
      { username: deletedThought.username },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    res.status(201).json({ message: "Thought deleted successfully" });
  } catch (error) {
    // Handle specific errors with appropriate responses
    res.status(403).json({ message: error.message }); // Example
  }
};

// Add a reaction to a thoughts
export const createReaction = async (req, res) => {
  try {
    const thought = await model.Thought.findById(req.params.thoughtId);
    const reaction = req.body.reactionBody;

    console.log({ thought, reaction });
    ///
    if (!thought) {
      return res.status(404).json({ message: "thought not found" });
    }

    thought.reactions.push({
      reactionBody: reaction,
      username: thought.username,
    });
    await thought.save();
    res.status(201).json(thought.reactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a reaction to a thoughts
export const deleteReaction = async (req, res) => {
  try {
    const thought = await model.Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    thought.reactions.pull(req.params.reactionId);
    await thought.save();
    res.status(200).json({ message: "reaction removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
