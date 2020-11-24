const express = require('express');

// express app
const app = express();
require('./db/mongoose')

// access to post router
const postRouter = require("./routers/post")
// listen for requests
const port = process.env.PORT;

// //access to body params
const bodyParser = require('body-parser')

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})

//DB Post model:
const Post = require("./models/post")

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
// express.json() SHOULD ALWAYS BE ABOVE THE ROUTER!
app.use(express.json())
app.use('/api', postRouter)


app.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
    res.render('index', {posts, title: "Home"})
  } catch (e){
    res.status(500).send()
  } 
})

app.get('/posts/:id', async (req, res) => {
  const _id = req.params.id

  try {
      const post = await Post.findById(_id)

      if (!post) {
          return res.status(404).send()
      }

      res.render('body', {post, title: "Body of the post"})
  } catch (e) {
      res.status(500).send()
  }
})

//create post
app.get('/create', (req, res) => {
  res.render('create', {title: "Create Post"})   
})
