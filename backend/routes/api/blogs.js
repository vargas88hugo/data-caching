const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');
const Blog = require('../../models/Blog');

const router = express.Router();

/**
 * @route     POST api/blogs
 * @desc      Post a blog
 * @access    Private
 */
router.post(
  '/',
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    console.log(req.user.id);

    const blog = new Blog({
      title,
      content,
      _user: req.user._id,
    });

    try {
      const blog = await Blog.findOne({ title });

      if (blog) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Blog already exists' }] });
      }

      await blog.save();

      res.json(blog);
    } catch (error) {
      console.error(error.message);

      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route     GET api/blogs/:id
 * @desc      Get blog by id of the current user
 * @access    Private
 */
router.get('/:id', auth, async (req, res) => {
  const blog = await Blog.findOne({
    _user: req.user._id,
    _id: req.params.id,
  });

  try {
    if (!blog) {
      return res.status(400).json({ errors: [{ msg: "Blog doesn't exist" }] });
    }

    res.json(blog);
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

/**
 * @route     GET api/blogs
 * @desc      Get all blogs of the current user
 * @access    Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ _user: req.user._id });

    res.json(blogs);
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
