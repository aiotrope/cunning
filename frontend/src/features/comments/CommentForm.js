import React from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import commentsService from '../../services/comments'
import { getBlogSelector } from '../blogs/blogsSlice'

export const CommentForm = (props) => {
  const singleBlog = useSelector(getBlogSelector)
  const blogId = props.id

  const onSubmit = async (formValue) => {
    const { remark } = formValue
    try {
      const comment = await commentsService._add(blogId, { remark: remark })
      console.log(comment)
      return comment
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  const initialValues = {
    remark: '',
  }

  return (
    <div>
      <div>
        {singleBlog.user?.map((blog) => (
          <p key={blog.id}>
            Added by: {blog.name} - {blog.username}
          </p>
        ))}
      </div>
      <div>
        <h4>comments</h4>
        <nav>
          <ul>
            {singleBlog.comments?.map((comment) => (
              <li key={comment.id}>{comment.remark}</li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form spellCheck="false">
              <div className="row mt-1">
                <div className="eight columns">
                  <label htmlFor="entry">Send your comments here</label>
                  <Field
                    name="remark"
                    type="text"
                    placeholder="What can you say about this blog"
                    className="u-full-width"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="columns">
                  <button type="submit" className="button-primary">
                    add comment
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
