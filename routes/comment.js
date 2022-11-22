const config = require('../utils/config')
const express = require('express')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()
//const logger = require('../utils/logger')

router.post('/:id', async (req, res) => {
  jwt.verify(req.token, config.jwt_key)
  const remark = req.body.remark
  const id = req.params.id // blog id params
  const user = req.user
  const currentBlog = await Blog.findById(id)

  const comment = new Comment({
    remark: remark,
    commenter: mongoose.Types.ObjectId(user.id),
    commentFor: mongoose.Types.ObjectId(currentBlog.id),
  })
  const newComment = await Comment.create(comment)

  if (newComment) {
    const blogToChange = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: newComment._id } },
      { new: true, useFindAndModify: false }
    )
    if (blogToChange) {
      res.status(201).json(newComment)
      return blogToChange
    }
  }
})

router.get('/:id', async (req, res) => {
  jwt.verify(req.token, config.jwt_key)
  const id = req.params.id //blog id params
  const user = req.user
  const comments = await Comment.findById(id)
    .populate('comments', { remarks: 1, commenter: 1, commentFor: 1 })

  if (comments && user) {
    res.status(200).json(comments)
  }
})

module.exports = router
