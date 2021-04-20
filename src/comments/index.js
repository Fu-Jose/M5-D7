import express from "express";
import fs from "fs-extra";
import { v4 as uuid } from "uuid";
import { check, validationResult } from "express-validator";
import {
  getComments,
  writeComments,
} from "../services/fs.comments.services.js";

const router = express.Router();

// GET ALL COMMENTS FROM A BOOK
router.get("/:bookId/comments/", async (req, res, next) => {
  try {
    const comments = await getComments();
    const findComment = comments.filter((com) => com.id === req.params.bookId);

    if (findComment) {
      res.status(200).send(findComment);
    } else {
      res.status(400).send("Comment not found");
    }
  } catch (error) {
    console.log(error);
  }
});

// GET A SPECIFIC COMMENT FOR A BOOK
router.get("/:bookId/comments/:id", async (req, res, next) => {
  try {
    const comments = await getComments();
    const findComment = comments.find((com) => com.commentId === req.params.id);
    if (findComment) {
      res.status(200).send(findComment);
    } else {
      res.status(400).send("Comment not found");
    }
  } catch (error) {
    console.log(error);
  }
});

//POST A COMMENT ON A BOOK
router.post(
  "/:bookId/comments/",
  [
    check("UserName").exists().withMessage("UserName is mandatory"),
    check("Text").exists().withMessage("Text is mandatory"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error();
        err.errorList = errors;
        err.httpStatusCode = 400;
        console.error("POST ERROR 400");
        next(err);
      } else {
        const comments = await fs.readJSON(commentsPath);
        const newComment = { ...req.body, CommentId: uuid(), Date: new Date() };
        comments.push(newComment);
        await writeComments();
        res.send({ CommentId: newComment.CommentId });
      }
    } catch (error) {
      console.log("POST COMMENT ERROR 500");
      error.httpStatusCode = 500;
      next(error);
    }
  }
);

//DELETE A COMMENT
router.delete("/:bookId/comments/:id", async (req, res, next) => {
  try {
    const comments = await fs.readJSON(commentsPath);
    const newComment = comments.filter(
      (comment) => comment.id !== req.params.id
    );
    await fs.writeJSON(commentsPath, newComment);
    res.send("Comment Deleted");
  } catch (error) {
    console.log("DELETE COMMENT ERROR");
    console.log(error);
  }
});

export default router;
