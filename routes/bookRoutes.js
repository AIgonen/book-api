/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{bookId}/comments:
 *   post:
 *     summary: Add a comment to a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The comment text
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Book not found
 */

const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');
const { Book } = require('../models');
const { getAllBooks, addComment } = require('../controllers/bookController');

router.get('/', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

router.delete('/:id', authenticate, authorizeAdmin, async (req, res) => {
  await Book.destroy({ where: { book_id: req.params.id } });
  res.json({ message: "Book deleted" });
});

router.put('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const [updated] = await Book.update(
      {
        title: req.body.title,
        publication_year: req.body.publication_year,
        category_id: req.body.category_id
      },
      { where: { book_id: req.params.id } }
    );
    if (!updated) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:bookId/comments', authenticate, addComment);

module.exports = router;