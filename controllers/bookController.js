const { Book, Comment, Log } = require("../models");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      bookId: req.params.bookId,
      userId: req.user.userId
    });
    
    await Log.create({
      action_type: "ADD_COMMENT",
      userId: req.user.userId,
      details: { bookId: req.params.bookId, commentId: comment.commentId }
    });
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllBooks, addComment };