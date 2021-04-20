import express from "express";
import fs from "fs-extra";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 } from "cloudinary";
import { getBooks, writeBooks } from "../services/fs.books.services.js";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "strive",
  },
});

const uploader = multer({ storage: cloudinaryStorage });

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const books = await getBooks();
    res.send(books);
  } catch (error) {
    next(error);
  }
});

router.get("/:bookId", async (req, res, next) => {
  try {
    const books = await getBooks();
    const book = books.find((boo) => boo.id === req.params.bookId);
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(400).send("Book id not found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", uploader.single("cover"), async (req, res, next) => {
  try {
    res.send({ cloudinaryURL: req.file.path });
  } catch (error) {
    next(error);
  }
});

router.put("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
