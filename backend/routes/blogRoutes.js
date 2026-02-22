const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createBlog, getBlogs } = require('../controllers/blogController');

router.post('/', protect, createBlog);
router.get('/', getBlogs);

module.exports = router;
