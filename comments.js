// Create web server

// Import modules
const express = require('express');
const router = express.Router();

// Import model
const Comment = require('../models/comment');

// Create route
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        text: req.body.text
    });

    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const removedComment = await Comment.remove({ _id: req.params.id });
        res.json(removedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    text: req.body.text
                }
            }
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;