import { Router } from "express";
import {
  createReaction,
  createThought,
  deleteReaction,
  deleteThought,
  getAllThoughts,
  getThought,
  updateThought,
} from "../controllers/thoughtController.js";

const router = Router();

router.get("/", getAllThoughts);
router.post("/", createThought);
router.get("/:thoughtId", getThought);
router.put("/:thoughtId", updateThought);
router.delete("/:thoughtId", deleteThought);
///
router.post("/:thoughtId/reactions", createReaction);
router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

export default router;
