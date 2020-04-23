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

    try {
      const blog = new Blog({
        title,
        content,
        _user: req.user._id,
      });

      const blogExist = await Blog.findOne({ title });

      if (blogExist) {
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
    const redis = require('redis');
    const client = redis.createClient(process.env.REDIS_URL);
    const util = require('util');
    client.get = util.promisify(client.get);

    // We check if there is the  request data in redis
    const cachedBlogs = await client.get(req.user._id);

    console.log(cachedBlogs);

    if (cachedBlogs) {
      console.log('SERVING FROM CACHE');
      return res.send(JSON.parse(cachedBlogs));
    }

    const blogs = await Blog.find({ _user: req.user._id });

    console.log('SERVING FROM MONGO');
    res.json(blogs);
    client.set(req.user._id, JSON.stringify(blogs));
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
