import Blog from '../models/blog.model.js';



export const createBlog = async (req, res) => {
  const { title, content, isPublished } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blog = new Blog({
      title,
      content,
      author: req.user._id, // assuming req.user is set by auth middleware
      isPublished,
      publishedAt: isPublished ? new Date() : null
    });

    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.log('Error creating blog:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.log('Error fetching user blogs:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOne({ _id: id, author: req.user._id });
    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.log('Error deleting blog:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, isPublished } = req.body;

  try {
    const blog = await Blog.findOne({ _id: id, author: req.user._id });
    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.isPublished = isPublished ?? blog.isPublished;
    blog.publishedAt = isPublished ? new Date() : null;
    blog.updatedAt = new Date();

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.log('Error updating blog:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};