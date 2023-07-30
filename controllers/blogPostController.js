const BlogPost = require('../models/BlogPost');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

    const post = new BlogPost({ title, content, author });
    await post.save();

    res.json({ message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create the post' });
  }
};

exports.getData = async(req, res) => {
    res.send("API is working");
}
