const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    remark: {
      type: String,
      required: true,
      trim: true,
    },
    commenter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],
    commentFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog',
      },
    ],
  },
  { timestamps: true }
)

CommentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
