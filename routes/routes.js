const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize the router
const router = express.Router();

// Setup Multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');  // The folder where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Rename the file to a unique name based on the current time
  }
});

// Initialize the upload middleware with the storage settings
const upload = multer({ storage: storage });

// Sample in-memory posts array (you can replace this with a database)
let posts = [];

// Route to render the home page with posts
router.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

// Post route to handle form submissions (with an optional image upload)
router.post('/posts', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;  // Check if there is an image file
  
  // Add the new post to the posts array
  posts.push({
    title,
    content,
    image,
    createdAt: new Date(),
    updatedAt: null,
  });

  // Redirect to the home page after saving the post
  res.redirect('/');
});

// Edit route (you can expand this based on your app's functionality)
router.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts[postId];

  if (post) {
    res.render('edit', { post, id: postId });
  } else {
    res.status(404).send('Post not found');
  }
});

// Update post route (you can expand this based on your app's functionality)
router.post('/edit/:id', upload.single('image'), (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const post = posts[postId];

  if (post) {
    post.title = title;
    post.content = content;
    post.image = image;
    post.updatedAt = new Date();
    res.redirect('/');
  } else {
    res.status(404).send('Post not found');
  }
});

// Delete post route
router.post('/delete/:id', (req, res) => {
  const postId = req.params.id;
  posts.splice(postId, 1);  // Remove the post from the array
  res.redirect('/');
});

module.exports = router;
