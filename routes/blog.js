const config = require('../utils/config')
const express = require('express')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()
//const logger = require('../utils/logger')

router.post('/', async (req, res) => {
  jwt.verify(req.token, config.jwt_key)
  const { title, url, author, likes } = req.body
  const user = req.user
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: mongoose.Types.ObjectId(user.id),
  })
  const regex = /^(ftp|http|https):\/\/[^ "]+$/
  const testUrl = regex.test(req.body.url)

  if (!title) {
    throw Error('title cannot be blank!')
  } else if (!url) {
    throw Error('url cannot be empty!')
  } else if (!testUrl) {
    throw Error('invalid URL!')
  } else {
    const newBlog = await Blog.create(blog)
    const currentUser = req.currentUser
    currentUser.blogs = currentUser.blogs.concat(newBlog._id)

    await currentUser.save()
    const response = {
      id: newBlog.id,
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      message: `a new blog ${newBlog.title} by ${newBlog.author}`,
    }
    res.status(201).json(response)
  }
})

router.get('/', async (req, res) => {
  jwt.verify(req.token, config.jwt_key)
  const user = req.user
  const blogs = await Blog.find({}, 'title author url likes').populate('user', {
    username: 1,
    name: 1,
  })

  if (blogs && user) {
    res.status(200).json(blogs)
  }
})

router.get('/:id', async (req, res) => {
  jwt.verify(req.token, config.jwt_key)
  const user = req.user
  const id = req.params.id
  const blog = await Blog.findById(id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { remark: 1, commenter:1, commentFor: 1, createdAt:1 })

  if (blog && user) {
    res.status(200).json(blog)
  } else if (!blog && user) {
    throw Error('there were no blog found!')
  }
})

router.delete('/:id', async (req, res) => {
  jwt.verify(req.token, config.jwt_key)
  const blog = await Blog.findById(req.params.id)
  const user = req.user

  if (!blog) {
    throw Error('cannot delete unknown blog!')
  } else if (blog.user.toString() !== user.id) {
    throw Error(
      'only the user who created this blog has the option to delete it!'
    )
  } else if (blog.user.toString() === user.id) {
    await Blog.findByIdAndDelete(req.params.id)

    res
      .status(200)
      .json({ message: `${blog.title} by ${blog.author} deleted!` })
  }
})

router.patch('/:id', async (req, res) => {
  jwt.verify(req.token, config.jwt_key)

  const id = req.params.id

  const blog = await Blog.findById(id)

  if (!blog) {
    throw Error('no blog found!')
  } else if (!id) {
    throw Error('invalid id!')
  }

  if (req.body.title) {
    blog.title = req.body.title
  }
  if (req.body.author) {
    blog.author = req.body.author
  }
  if (req.body.url) {
    blog.url = req.body.url
  }
  if (req.body.likes) {
    blog.likes = req.body.likes
  }

  await blog.save()
  const updatedBlog = await Blog.findOne(
    { _id: req.params.id },
    'title author url likes'
  )
  if (updatedBlog) {
    return res.status(200).json(updatedBlog)
  }
})

module.exports = router
