import { Router } from "express";
import {
  createFriend,
  createUser,
  deleteFriend,
  deleteUser,
  getAllFriends,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
///
router.get("/:userId/friends", getAllFriends);
router.post("/:userId/friends/", createFriend);
router.delete("/:userId/friends/:friendsId", deleteFriend);

export default router;
