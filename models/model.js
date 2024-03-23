import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

// Reaction Schema
const reactionSchema = new Schema({
  reactionId: Schema.Types.ObjectId,
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Virtual for friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Virtual for reaction count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const User = model("User", userSchema);
const Thought = model("Thought", thoughtSchema);

export default { User, Thought };
