import express from "express"
import fs from 'fs-extra'
import { fileURLToPath } from "url"
import { dirname, join } from "path"
// import multer from "multer"
// import { CloudinaryStorage } from "multer-storage-cloudinary"
// import { v2 } from "cloudinary"

const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "../data")
const commentsPath = join(dataFolder, "comments.json")

// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary: v2,
//   params: {
//     folder: "strive",
//   },
// })

// const uploader = multer({ storage: cloudinaryStorage })

const router = express.Router()

// GET ALL COMMENTS FROM A BOOK
router.get("/:bookId/comments/", async (req, res, next) => {
    try {
        const comments = await fs.readJSON(commentsPath);
    
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
    const comments = await fs.readJSON(commentsPath);

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

// router.post("/:bookId/comments", async (req, res, next) => {
//   try {
//     res.send({ cloudinaryURL: req.file.path })
//   } catch (error) {
//     next(error)
//   }
// })


router.delete("/:bookId/comments/:id", async (req, res, next) => {
    try {
        const comments = await fs.readJSON(commentsPath)
        const newComment = comments.filter(comment => comment.id !== req.params.id)
        await fs.writeJSON(commentsPath, newComment)
        res.send("Comment Deleted")
    } catch (error) {
        console.log("DELETE COMMENT ERROR")
        console.log(error)
    }
})

export default router
