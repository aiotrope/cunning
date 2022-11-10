import React, { useState } from 'react'
import { createAnecdote } from '../reducers/anecdotes'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { setNotification } from '../reducers/notification'
import { useNavigate } from 'react-router-dom'

export const CreateNew = () => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      if (event) event.preventDefault()
      const resultAction = await dispatch(
        createAnecdote({ content, author, info })
      )
      const originalPromiseResult = unwrapResult(resultAction)
      console.log(originalPromiseResult)
      await dispatch(setNotification(`a new anecdote ${content} created!`))
      navigate('/')
      return originalPromiseResult
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError)
    } finally {
      setContent('')
      setAuthor('')
      setInfo('')
    }
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
