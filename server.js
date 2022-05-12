const express = require('express')
const mongoose = require('mongoose')
const Post = require('./models/post')
const postRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(express.static("public"))

app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ created: 'desc' })
  res.render('posts/index', { posts: posts })
})

app.use('/posts', postRouter)

app.listen(5000)